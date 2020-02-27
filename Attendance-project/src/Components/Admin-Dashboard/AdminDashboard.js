import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table, Spinner } from 'reactstrap';
import Navbar from '../Navbar'
import Axios from 'axios';

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
        }
        this.isCreate = this.isCreate.bind(this)
        this.isCreateClose = this.isCreateClose.bind(this)
        this.infoChange = this.infoChange.bind(this)
        this.infoSubmit = this.infoSubmit.bind(this)
    }
    //modal open
    isCreate(){
        this.setState({ modal:true });
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

    update = (data) =>{

        this.setState({
            modal:true,
            ...data
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

    render() {
        const { modal, loading} = this.state;
        return (
            <div>
                <Navbar />
                <h3 className="text-center"> <br/>Students list <br/><Button className="btn btn-success"
                onClick={this.isCreate}>Create</Button></h3><br/>
                <Table hover striped responsive borderless> 
                    <thead className="thead-dark">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Reg.No</th>
                            <th>Department</th>
                            <th>DOB</th>
                            <th>DOJ</th>
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
                            <td>{e.Gender}</td>
                            <td><Button className="btn btn-info"
                            onClick={event =>{this.update(e)}}>Edit</Button></td>
                            <td><Button className="btn btn-danger"
                            onClick={evevt =>{this.del(e)}}>Delete</Button></td>
                        </tr>) : <tr><td>{!loading && 'No results found'}</td></tr>
                        }
                    </tbody>
                </Table>
                <div>
                    <Modal isOpen={modal} id="editModal">
                    <ModalHeader>Create Student</ModalHeader>
                        <ModalBody>
                            <form onSubmit={this.infoSubmit}>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" className="form-control" placeholder="Name" 
                                    onChange={this.infoChange}
                                    name = "Name"
                                    value ={this.state.Name}/>
                                </div>
                                <div className="form-group">
                                    <label>Regno</label>
                                    <input type="text" className="form-control" placeholder="Regno" 
                                    onChange={this.infoChange}
                                    name = "Regno"
                                    value ={this.state.Regno}/>
                                </div>
                                <div className="form-group">
                                    <label>Department</label>
                                    <input type="text" className="form-control" placeholder="Department" 
                                    onChange={this.infoChange}
                                    name = "Department"
                                    value ={this.state.Department}/>
                                </div>
                                <div className="form-group">
                                    <label>DOB</label>
                                    <input type="text" className="form-control" placeholder="DOB" 
                                    onChange={this.infoChange}
                                    name = "DOB"
                                    value ={this.state.DOB}/>
                                </div>
                                <div className="form-group">
                                    <label>DOJ</label>
                                    <input type="text" className="form-control" placeholder="DOJ"
                                    onChange={this.infoChange}
                                    name = "DOJ"
                                    value ={this.state.DOJ}/>
                                </div>
                                <div className="form-group">
                                    <label>Gender</label>
                                    <input type="text" className="form-control" placeholder="Gender" 
                                    onChange={this.infoChange}
                                    name = "Gender"
                                    value ={this.state.Gender}/>
                                </div>
                                <div className="form-group">
                                    <label>Section</label>
                                    <input type="text" className="form-control" placeholder="Section" 
                                    onChange={this.infoChange}
                                    name = "Section"
                                    value ={this.state.Section}/>
                                </div>
                                <ModalFooter>
                                    <Button color="secondary" onClick={this.isCreateClose}>close</Button>
                                    <Button type="submit" color="success">Submit</Button>
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