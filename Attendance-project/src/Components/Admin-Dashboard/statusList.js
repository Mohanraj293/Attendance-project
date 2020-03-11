import React, { Component } from 'react';
import { Modal, ModalHeader, ModalFooter, ModalBody, Spinner, Row, Col, FormGroup, Input } from 'reactstrap';
import Navbar from '../Navbar'
import Axios from 'axios';
import '../../App.css';
import DatePicker from 'react-datepicker';
import {
    MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCol,
    MDBRow, Container
} from "mdbreact";

const clearNullProp = (obj = {}) => {
    for (const key in obj) {
        if (!obj[key]) {
            delete obj[key]
        }
    }
    return obj
}

const initFilterObj = {
    Department: '',
    DOJ: '',
    Section: ''
}

class StatusList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            //initial values
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
            filterObj: { ...initFilterObj },
            date: new Date(),
        }
    }

    //getting all values form DB
    componentDidMount() {
        this.getAll();
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

    //Student Modal
    studentModal = () => {
        this.setState({
            modal1: !this.state.modal1
        })
    }
    studentModalClose = () => {
        this.setState({
            modal1: false
        })
    }


    render() {
        const {  loading, Section, DOJ, Department } = this.state.filterObj;
        const { date, data } = this.state
        const dateTimeString = date.toDateString() //+ '  ' + date.toLocaleTimeString()
        const isResetRequired = Department || DOJ || Section
        return (
            <div>
                <div style={{ marginBottom: '50px' }} >
                    <Navbar />
                </div>
                <h3 className="text-center"><strong>Attendance Status</strong></h3>
                <Row style={{ marginTop: "30px", paddingLeft:"20px" }}>
                    <Col>
                        <FormGroup style={{ marginTop: "0.6rem" }}>
                            <Input type="select" value={Department} onChange={this.handleFilterDepartmentFilterChange} name="departmentFilter" id="departmentFilter">
                                <option value="" >Select Department</option>
                                <option value="CSE" >CSE</option>
                                <option value="IT" >IT</option>
                                <option value="ECE" >ECE</option>
                                <option value="EEE" >EEE</option>
                                <option value="EI" >EI</option>
                                <option value="MECH" >MECH</option>
                                <option value="ARCHI" >Architechture</option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col >
                        <FormGroup style={{ marginTop: "0.6rem" }}>
                            <Input type="select" value={DOJ} onChange={this.handleFilterYearFilterChange} name="departmentFilter" id="departmentFilter">
                                <option value="" >Select Year</option>
                                <option value="2020">1st Year</option>
                                <option value="2019">2nd Year</option>
                                <option value="2018">3rd Year</option>
                                <option value="2017">4th Year</option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup style={{ marginTop: "0.6rem" }}>
                            <Input type="select" value={Section} onChange={this.handleFilterSectionFilterChange} name="departmentFilter" id="departmentFilter">
                                <option value="" >Select Section</option>
                                <option value="A" >A</option>
                                <option value="B" >B</option>
                                <option value="C" >C</option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col>
                        <div  style={{ marginTop: "0.8rem" }}>
                        <DatePicker 
                           
                            selected={this.state.startDate}
                            onChange={this.handleChange}
                        /></div>
                    </Col>
                    <Col>
                        {isResetRequired && <MDBBtn color="deep-orange" onClick={this.handleFilterReset}>Reset</MDBBtn>}  {/* Hide reset no filter */}
                    </Col>
                </Row>
                <MDBRow className="row" style={{ marginLeft: '10px' }}>
                    {loading && <Spinner color="success" />}
                    {Department && DOJ && Section ?
                        data.length > 0 && !loading ? data.map((e) =>
                            <MDBCol className="col-sm-3 mb-4" key={e._id}>
                                <MDBCard style={{ width: "18rem" }}>
                                    <MDBCardBody >
                                        <MDBCardTitle onClick={this.studentModal}>{e.Name}</MDBCardTitle>
                                        <MDBCardText>Regno : {e.Regno}</MDBCardText>
                                        <MDBCardText>Dept : {e.Department} - {e.Section} Section </MDBCardText>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        ) : <h6>{!loading && 'No results found'}</h6> :
                        <h5 className="mx-auto" style={{ marginTop: "80px" }}><strong>NOTE: </strong>Select all Fields to show Details</h5>  // changesss center this, 
                    }
                </MDBRow>
                <div>
                    <Container>
                        <Modal isOpen={this.state.modal1}>
                            <ModalHeader>Status</ModalHeader>
                            <ModalBody className="calendar">
                                <DatePicker
                                    dayClassName={date =>
                                        { console.log(date); return date.getDate(date) < Math.random() * 31 ? "random" : undefined}
                                      }
                                    onChange={this.onChange}
                                    value={this.state.date}
                                />
                                {dateTimeString}
                            </ModalBody>
                            <ModalFooter>
                                <MDBBtn color="secondary" onClick={this.studentModalClose}>Close</MDBBtn>
                            </ModalFooter>
                        </Modal>
                    </Container>
                </div>
            </div>
        );
    }
}
export default StatusList;