import React, { Component } from 'react';
import { Modal, ModalHeader, ModalFooter, ModalBody, Table, Spinner, } from 'reactstrap';
import Navbar from '../Navbar'
import Axios from 'axios';
import '../../App.css';
import { MDBBtn, MDBIcon,MDBInput,MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";

class AdminDashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            //initial values
            modal: false,
            modal1:false,
            loading: false,
            data:[],
            editData:[],
            _id:"",
            Name:"",
            Regno:"",
            Department:"",
            DOJ:"",
            DOB:"",
            Gender:"",
            Section:"",
            isEdit:false,
            mode:'update',
        }
        this.isCreate = this.isCreate.bind(this)
        this.isCreateClose = this.isCreateClose.bind(this)
        this.infoChange = this.infoChange.bind(this)
        this.infoSubmit = this.infoSubmit.bind(this)
    }
    //modal open
    isCreate(){
        this.setState({ modal:true, mode:'create' });
    }

    isUpdate = (data) =>{
        this.setState({
            modal:true,
            ...data,
            mode:'update'
        })
    }
    //modal close
    isCreateClose(){
        this.setState({ modal:false,
        _id:"",
        Name:"",
        Regno:"",
        Department:"",
        DOJ:"",
        DOB:"",
        Gender:"",
        Section:"", });
    }
    //getting all values form DB
    componentDidMount(){
        this.getAll();
      }
    infoChange = event => {
        const {name,value} = event.target;
  
        this.setState({
            [name] : value
        })
   }
   //Create and update functions
  infoSubmit = event =>{
    if(this.state._id === null){
      let data = {
          Name: this.state.Name,
          Regno: this.state.Regno,
          Department: this.state.Department,
          DOB: this.state.DOB,
          DOJ: this.state.DOJ,
          Gender: this.state.Gender,
          Section: this.state.Section
          
      }
      this.create(data)
      }else{
        let data = {
            _id:this.state._id,
            Name: this.state.Name,
            Regno: this.state.Regno,
            Department: this.state.Department,
            DOB: this.state.DOB,
            DOJ: this.state.DOJ,
            Gender: this.state.Gender,
            Section: this.state.Section
            
        }
        this.create(data)
      }}
      //Create and Update API call
      create = data =>{
          if(!data._id)
          {
                Axios.post("http://localhost:4000/",data).then(res =>{
                this.getAll()
                console.log(res)
          })
        }
          else
            {
              Axios.put("http://localhost:4000/update",data).then(res =>{
                console.log(res)
            })
      }      
    }  
      //GET all Function
      getAll(){
        Axios.get("http://localhost:4000/").then(res => {
          this.setState({
            data:res.data
          })
        })
    }

  
    //delete function
    del = data => {
        var option = window.confirm(`Do You Want To Delete ${data.Name}`)
        if(option){
            Axios.delete(`http://localhost:4000/delete/${data._id}`).then(res =>{
                this.getAll();
            })
        }
    }

    viewButton(){
        if(this.state.mode==='update'){
            return(
            <MDBBtn color="success" onClick={this.infoSubmit}>Update</MDBBtn>)
        }
        else{
            return(
            <MDBBtn color="indigo" onClick={this.infoSubmit}>Create</MDBBtn>)
        }
    }
    modalHead(){
        if(this.state.mode==='update'){
            return(
                <ModalHeader toggle={this.isCreateClose}>Update Students</ModalHeader>
            )
        }
        else{
            return(
                <ModalHeader   toggle={this.isCreateClose}>Creates Students</ModalHeader>
            )
        }
    }

    render() {
        const { modal, loading} = this.state;
        return (
            <div>
                <div>
                    <Navbar /><br/><br/> <br/> <br/>
                </div>
                <h3 className="text-center">Students list<MDBBtn className="btn btn-success"
                onClick={this.isCreate}><MDBIcon icon="plus-circle" /> Create</MDBBtn>
                <MDBDropdown>
                <MDBDropdownToggle caret color="primary">
                   Choose Department
                </MDBDropdownToggle>
                <MDBDropdownMenu basic>
                    <MDBDropdownItem>Information Technology</MDBDropdownItem>
                    <MDBDropdownItem>Computer Science and Engineering</MDBDropdownItem>
                    <MDBDropdownItem>Civil Engineering</MDBDropdownItem>
                    <MDBDropdownItem>Electrical and Communication Engineering</MDBDropdownItem>
                    <MDBDropdownItem>Electrical and Electronics Engineering</MDBDropdownItem>
                    <MDBDropdownItem>Mechanical Engineering</MDBDropdownItem>
                    <MDBDropdownItem divider/>
                    <MDBDropdownItem>Architechture</MDBDropdownItem>
                </MDBDropdownMenu>
            </MDBDropdown></h3>
                <Table hover striped responsive borderless> 
                    <thead className="thead-dark">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Reg.No</th>
                            <th>Department</th>
                            <th>DOB</th>
                            <th>DOJ</th>
                            <th>Section</th>
                            <th>Gender</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading && <Spinner color="success"/>}
                        {this.state.data.length > 0 && !loading ? this.state.data.map((e, i) => <tr key = {e._id}>
                            <td>{i + 1}</td>
                            <td>{e.Name}</td>
                            <td>{e.Regno}</td>
                            <td>{e.Department}</td>
                            <td>{e.DOB}</td>
                            <td>{e.DOJ}</td>
                            <td>{e.Section}</td>
                            <td>{e.Gender}</td>
                            <td><a color="warning" onClick={event =>{this.isUpdate(e)}}><MDBIcon className="icon" data-toggle="tooltip" title="Edit" color="#xE147" icon="edit"/></a></td>
                            <td><a color="danger"  onClick={evevt =>{this.del(e)}}><MDBIcon className="icon1" data-toggle="tooltip" title="Delete" far icon="trash-alt" /></a></td>
                        </tr>) : <tr><td>{!loading && 'No results found'}</td></tr>
                        }
                    </tbody>
                </Table>
                <div>
                    <Modal isOpen={modal}>
                    {this.modalHead()}
                        <ModalBody>
                            <form onSubmit={this.infoSubmit}>
                                <div className="form-group">
                                    <MDBInput label="Name" type="text" className="form-control" placeholder="Name" 
                                    onChange={this.infoChange}
                                    name = "Name"
                                    value ={this.state.Name}/>
                                </div>
                                <div className="form-group">
                                    <MDBInput label="Register"  type="text" className="form-control" placeholder="Regno" 
                                    onChange={this.infoChange}
                                    name = "Regno"
                                    value ={this.state.Regno}/>
                                </div>
                                <div className="form-group">
                                    <MDBInput label="Department"  type="text" className="form-control" placeholder="Department" 
                                    onChange={this.infoChange}
                                    name = "Department"
                                    value ={this.state.Department}/>
                                </div>
                                <div className="form-group">
                                    <MDBInput label="Date OF Birth"  type="text" className="form-control" placeholder="DOB" 
                                    onChange={this.infoChange}
                                    name = "DOB"
                                    value ={this.state.DOB}/>
                                </div>
                                <div className="form-group">
                                    <MDBInput label="Date Of Join"  type="text" className="form-control" placeholder="DOJ"
                                    onChange={this.infoChange}
                                    name = "DOJ"
                                    value ={this.state.DOJ}/>
                                </div>
                                <div className="form-group">
                                    <MDBInput label="Gender"  type="text" className="form-control" placeholder="Gender" 
                                    onChange={this.infoChange}
                                    name = "Gender"
                                    value ={this.state.Gender}/>
                                </div>
                                <div className="form-group">
                                    <MDBInput label="Section"  type="text" className="form-control" placeholder="Section" 
                                    onChange={this.infoChange}
                                    name = "Section"
                                    value ={this.state.Section}/>
                                </div>
                                <ModalFooter>
                                    <MDBBtn color="blue-grey" onClick={this.isCreateClose}>close</MDBBtn>
                                    {this.viewButton()}
                                </ModalFooter>
                            </form>
                        </ModalBody>
                    </Modal>
                </div>
            </div>
        );
    }
}
export default AdminDashboard;