import React, { Component } from 'react';
import { Modal, ModalHeader, ModalFooter, ModalBody, Table, Spinner, Row, Col, FormGroup, Input } from 'reactstrap';
import Navbar from '../Navbar'
import Axios from 'axios';
import '../../App.css';
import { MDBBtn, MDBIcon, MDBInput } from "mdbreact";


const clearNullProp = (obj = {}) => {
    for (const key in obj) {
        if (!obj[key]) {
            delete obj[key]
        }
    }
    return obj
}

const getDateLabel = (date, format) => {
    let dateObj = new Date(date)
    if (format === 'slash') return dateObj.toLocaleDateString()
    return dateObj.toDateString()
}

const initFilterObj = {
    Department: '',
    DOJ: '',
    Section: ''
}

class AdminDashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            //initial values
            modal: false,
            modal1: false,
            loading: false,
            data: [],
            editData: [],
            _id: "",
            Name: "",
            Regno: "",
            Department: "",
            DOJ: "",
            DOB: "",
            Gender: "",
            Section: "",
            isEdit: false,
            mode: 'update',
            filterObj: { ...initFilterObj }
        }
        this.isCreateClose = this.isCreateClose.bind(this)
        this.infoChange = this.infoChange.bind(this)
        this.infoSubmit = this.infoSubmit.bind(this)
        this.isCreate = this.isCreate.bind(this)
    }

    isCreate() {
        this.setState({ modal: true, mode: 'create' });
    }
    //modal update
    isUpdate = (data) => {
        this.setState({
            modal: true,
            ...data,
            mode: 'update'
        })
    }
    //modal close
    isCreateClose() {
        this.setState({
            modal: false,
            _id: "",
            Name: "",
            Regno: "",
            Department: "",
            DOJ: "",
            DOB: "",
            Gender: "",
            Section: "",
        });
    }
    //getting all values form DB
    componentDidMount() {
        this.getAll();
    }
    infoChange = event => {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        })
    }
    //Create and update functions
    infoSubmit = event => {
        if (this.state._id === null) {
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
        } else {
            let data = {
                _id: this.state._id,
                Name: this.state.Name,
                Regno: this.state.Regno,
                Department: this.state.Department,
                DOB: this.state.DOB,
                DOJ: this.state.DOJ,
                Gender: this.state.Gender,
                Section: this.state.Section

            }
            this.create(data)
        }
        this.isCreateClose()
    }

    //Create and Update API call
    create = data => {
        if (!data._id) {
            Axios.post("http://localhost:4000/", data).then(res => {
                this.getAll()
            })
        }
        else {
            Axios.put("http://localhost:4000/update", data).then(res => {
                this.getAll()
            })
        }
    }
    //GET all Function
    getAll() {
        let { filterObj } = this.state
        //   clear null properties
        filterObj = clearNullProp(filterObj)
        Axios.get("http://localhost:4000/", { params: filterObj }).then(res => {
            this.setState({
                data: res.data
            })
        })
    }


    //delete function
    del = data => {
        var option = window.confirm(`Do You Want To Delete ${data.Name}`)
        if (option) {
            Axios.delete(`http://localhost:4000/delete/${data._id}`).then(res => {
                this.getAll();
            })
        }
    }

    viewButton() {
        if (this.state.mode === 'update') {
            return (
                <MDBBtn color="success" onClick={this.infoSubmit}>Update</MDBBtn>)
        }
        else {
            return (
                <MDBBtn color="indigo" onClick={this.infoSubmit}>Create</MDBBtn>)
        }
    }
    modalHead() {
        if (this.state.mode === 'update') {
            return (
                <ModalHeader toggle={this.isCreateClose}>Update Students</ModalHeader>
            )
        }
        else {
            return (
                <ModalHeader toggle={this.isCreateClose}>Creates Students</ModalHeader>
            )
        }
    }

    // filter operations

    handleFilterReset = () => {
        this.setState({ filterObj: { ...initFilterObj } }, this.getAll)
    }

    handleFilterDepartmentFilterChange = (e) => {
        const { value } = e.target

        let { filterObj } = this.state

        filterObj = { ...filterObj, Department: value }

        this.setState({ filterObj }, this.getAll)
    }
    handleFilterYearFilterChange = (e) => {
        const { value } = e.target

        let { filterObj } = this.state

        filterObj = { ...filterObj, DOJ: value }

        this.setState({ filterObj }, this.getAll)
    }
    handleFilterSectionFilterChange = (e) => {
        const { value } = e.target

        let { filterObj } = this.state

        filterObj = { ...filterObj, Section: value }

        this.setState({ filterObj }, this.getAll)
    }


    render() {
        const { modal, loading, filterObj: { Department, DOJ, Section } } = this.state;
        const isResetRequired = Department|| DOJ|| Section
        return (
            <div>
                <div style={{ marginBottom: '90px' }} >
                    <Navbar />
                </div>

                <h3 className="text-center" style={{fontWeight:'bold', marginBottom:"30px"}} >Students list</h3>
                <Row>
                    <Col>
                        <MDBBtn color="cyan" onClick={this.isCreate}><MDBIcon icon="plus-circle"/>  Create</MDBBtn>
                    </Col>
                    <Col  >
                        <FormGroup>  {/* col form group margin-top: 0.5rem;  changesss */}
                            <Input type="select" value={Department} onChange={this.handleFilterDepartmentFilterChange} name="departmentFilter" id="departmentFilter">
                                <option value="" >Select Department</option>
                                <option value="CSE" >CSE</option>
                                <option value="IT" >IT</option>
                                <option value="ECE" >ECE</option>
                                <option value="EEE" >EEE</option>
                                <option value="E&I" >E&I</option>
                                <option value="MECH" >MECH</option>
                                <option value="ARCHI" >Architechture</option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col  >
                        <FormGroup>
                            <Input type="select" value={DOJ} onChange={this.handleFilterYearFilterChange} name="departmentFilter" id="departmentFilter">
                                <option value="" >Select Year</option>
                                <option value="2020-05-08" >1st Year</option>
                                <option value="2019-05-08" >2nd Year</option>
                                <option value="2018-05-08" >3rd Year</option>
                                <option value="2017-05-08" >4th Year</option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col  >
                        <FormGroup>
                            <Input type="select" value={Section} onChange={this.handleFilterSectionFilterChange} name="departmentFilter" id="departmentFilter">
                                <option value="" >Select Section</option>
                                <option value="A" >A</option>
                                <option value="B" >B</option>
                                <option value="C" >C</option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col>
                        {isResetRequired && <MDBBtn color="deep-orange" onClick={this.handleFilterReset}>Reset</MDBBtn>}
                    </Col>
                </Row>

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
                        {loading && <Spinner color="success" />}
                        {this.state.data.length > 0 && !loading ? this.state.data.map((e, i) => <tr key={e._id}>
                            <td>{i + 1}</td>
                            <td>{e.Name}</td>
                            <td>{e.Regno}</td>
                            <td>{e.Department}</td>
                            <td>{getDateLabel(e.DOB, 'slash')}</td>
                            <td>{getDateLabel(e.DOJ)}</td>
                            <td>{e.Section}</td>
                            <td>{e.Gender}</td>
                            <td><a color="warning" href="# " onClick={event => { this.isUpdate(e) }}><MDBIcon className="icon" data-toggle="tooltip" title="Edit" color="#xE147" icon="edit" /></a></td>
                            <td><a color="danger" href="# " onClick={evevt => { this.del(e) }}><MDBIcon className="icon1" data-toggle="tooltip" title="Delete" far icon="trash-alt" /></a></td>
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
                                        name="Name"
                                        value={this.state.Name} />
                                </div>
                                <div className="form-group">
                                    <MDBInput label="Register" type="text" className="form-control" placeholder="Regno"
                                        onChange={this.infoChange}
                                        name="Regno"
                                        value={this.state.Regno} />
                                </div>
                                <div className="form-group">
                                    <MDBInput label="Department" type="text" className="form-control" placeholder="Department"
                                        onChange={this.infoChange}
                                        name="Department"
                                        value={this.state.Department} />
                                </div>
                                <div className="form-group">
                                    <MDBInput label="Date OF Birth" type="text" className="form-control" placeholder="DOB"
                                        onChange={this.infoChange}
                                        name="DOB"
                                        value={this.state.DOB} />
                                </div>
                                <div className="form-group">
                                    <MDBInput label="Date Of Join" type="text" className="form-control" placeholder="DOJ"
                                        onChange={this.infoChange}
                                        name="DOJ"
                                        value={this.state.DOJ} />
                                </div>
                                <div className="form-group">
                                    <MDBInput label="Gender" type="text" className="form-control" placeholder="Gender"
                                        onChange={this.infoChange}
                                        name="Gender"
                                        value={this.state.Gender} />
                                </div>
                                <div className="form-group">
                                    <MDBInput label="Section" type="text" className="form-control" placeholder="Section"
                                        onChange={this.infoChange}
                                        name="Section"
                                        value={this.state.Section} />
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