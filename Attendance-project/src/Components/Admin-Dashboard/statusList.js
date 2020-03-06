import React, { Component } from 'react';
import { Modal, ModalHeader, ModalFooter, ModalBody, Table, Spinner, Row, Col, FormGroup, Label, Input } from 'reactstrap';
import Navbar from '../Navbar'
import Axios from 'axios';
import '../../App.css';
import Calendar from 'react-calendar';
import {
    MDBIcon, MDBBtn, MDBInput, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol,
    MDBRow, Container
} from "mdbreact";
import DatePicker from "react-datepicker";

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
        const { loading } = this.state;
        const { date } = this.state
        const dateTimeString = date.toDateString() //+ '  ' + date.toLocaleTimeString()
        return (
            <div>
                <div style={{ marginBottom: '50px' }} >
                    <Navbar />
                </div>
                <h3 className="text-center"><strong>Attendance Status</strong></h3>
                <Row>
                    <Col sm={3} >
                        <FormGroup>
                            <Input type="select" onChange={this.handleFilterDepartmentFilterChange} name="departmentFilter" id="departmentFilter">
                                <option value="" >Select Department</option>
                                <option value="CSE" >CSE</option>
                                <option value="IT" >IT</option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col sm={3} >
                        <FormGroup>
                            <Input type="select" onChange={this.handleFilterYearFilterChange} name="departmentFilter" id="departmentFilter">
                                <option value="" >Select Year</option>
                                <option value="2018-05-05T00:00:00.000+00:00" >1st Year</option>
                                <option value="2017-05-05T00:00:00.000+00:00" >2nd Year</option>
                                <option value="2016-05-05T00:00:00.000+00:00" >3rd Year</option>
                                <option value="2015-05-05T00:00:00.000+00:00" >4th Year</option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col sm={3} >
                        <FormGroup>
                            <Input type="select" onChange={this.handleFilterSectionFilterChange} name="departmentFilter" id="departmentFilter">
                                <option value="" >Select Section</option>
                                <option value="A" >A</option>
                                <option value="B" >B</option>
                                <option value="C" >C</option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col sm={3}>
                        <MDBBtn color="deep-orange" onClick={this.handleFilterReset}>Reset</MDBBtn>
                    </Col>
                </Row>
                <MDBRow className="row" style={{ marginLeft: '10px' }}>
                    {loading && <Spinner color="success" />}
                    {
                        this.state.data.length > 0 && !loading ? this.state.data.map((e, i) =>
                            <MDBCol className="col-sm-3 mb-4">
                                <MDBCard style={{ width: "17rem" }}>
                                    <MDBCardBody>
                                        <MDBCardTitle onClick={this.studentModal}>{e.Name}</MDBCardTitle>
                                        <MDBCardText>Regno: {e.Regno}</MDBCardText>
                                        <MDBCardText>Dept: {e.Department}</MDBCardText>
                                        <MDBCardText>Gender: {e.Gender}</MDBCardText>
                                        <MDBCardText>Section: {e.Section}</MDBCardText>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        ) : <a>{!loading && 'No results found'}</a>
                    }
                </MDBRow>
                <div>
                    <Container>
                        <Modal isOpen={this.state.modal1}>
                            <ModalHeader>Status</ModalHeader>
                            <div className="calendar">
                                <Calendar
                                    onChange={this.onChange}
                                    value={this.state.date}
                                />
                                {dateTimeString}
                            </div>
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