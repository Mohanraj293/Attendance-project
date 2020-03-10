import React, { Component } from 'react';
import { Button, Table, Spinner , Row, Col,FormGroup, Input } from 'reactstrap';
import FDash from './FacultyNav';
import Axios from 'axios';
import {MDBBtn} from 'mdbreact'


const initFilterObj = {
    Department: '',
    DOJ: '',
    Section: ''
}
const getDateLabel = (date, format) => {
    let dateObj = new Date(date)
    if (format === 'slash') return dateObj.toLocaleDateString()
    return dateObj.toDateString()
}

class FacultyDashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: false,
            loading: false,
            studentsData: [],
            attendanceData: [],
            present: [],
            absent: [],
            onDuty: [],
            newAttendance: [],
            filterObj: { ...initFilterObj },
            Department:'',
            Section:''
        }
    }
    componentDidMount() {
        this.getAllStudents();
        this.getAllAttendance();
    }

    getAllStudents = () => {
        Axios.get("http://localhost:4000/").then(res => {  // check api calling method,  param is missing
            this.setState({
                studentsData: res.data
            })
        })
    }

    getAllAttendance = () => {
        Axios.get("http://localhost:4000/Attendance/getAttendance").then(res => {
// check api calling method,  param is missing with additionally sate para,
            let attendance = res.data || []
            attendance.sort(function (a, b) {
                return (a.date > b.date) ? -1 : ((a.date < b.date) ? 1 : 0);
            }).reverse()
            attendance = this.uniqueAttendanceRecords(attendance)
            this.setState({
                attendanceData: attendance || []
            }, this.differentiateAttendance)
        })
    }

    uniqueAttendanceRecords = (items) => {
        const s = new Set();
        return items.filter((item) => {
            if (s.has(item.Regno)) {
                return false;
            }
            s.add(item.Regno);
            return true;
        });
    }

    differentiateAttendance = () => {
        const { attendanceData } = this.state
        const present = attendanceData.filter(e => e.isPresent === 'Present').map(e => e.Regno)
        const absent = attendanceData.filter(e => e.isPresent === 'Absent').map(e => e.Regno)
        const onDuty = attendanceData.filter(e => e.isPresent === 'Onduty').map(e => e.Regno)
        this.setState({ present, absent, onDuty })
    }

    submitBulkAttendance = () => {
        const config = {
            url: "http://localhost:4000/Attendance/setAttendance",
            method: 'POST',
            data: this.state.newAttendance
        }
        Axios(config).then(res => {
            this.getAllAttendance();
            alert('Submitted successfully')
        })
    }

    handleRadioOnChange = (evnt, student) => {
        let { newAttendance } = this.state
        const attendance = evnt.target.value
        const date = new Date()

        newAttendance = newAttendance.filter(e => e.Regno != student.Regno)

        let newRecord = {
            Date: date.toISOString(),
            Regno: student.Regno,
            isPresent: attendance,
            Department: student.Department,
            Year: student.DOJ,
            Section: student.Section
        }

        newAttendance.push(newRecord)

        this.setState({ newAttendance })
    }

     // filter operations

     handleFilterReset = () => {
        this.setState({ filterObj: { ...initFilterObj } }, this.getAll)
    }

    handleFilterDepartmentFilterChange = (stud) => {
        const { value } = stud.target

        let { filterObj } = this.state

        filterObj = { ...filterObj, Department: value }

        this.setState({ filterObj }, this.getAll)
    }
    handleFilterYearFilterChange = (stud) => {
        const { value } = stud.target

        let { filterObj } = this.state

        filterObj = { ...filterObj, DOJ: value }

        this.setState({ filterObj }, this.getAll)
    }
    handleFilterSectionFilterChange = (stud) => {
        const { value } = stud.target

        let { filterObj } = this.state

        filterObj = { ...filterObj, Section: value }

        this.setState({ filterObj }, this.getAll)
    }

    render() {

        const { studentsData, loading, present, absent, onDuty, filterObj: { Department, DOJ, Section } } = this.state;
        console.log(this.state)
        const dateObj = new Date();
        return (
            <div>
                <FDash />
                <div>
                    <h1 className="text-center">Welcome To Information Technology</h1>
                    <h3 className="text-center">{dateObj.toLocaleDateString()}</h3>
                </div>
                <Row>
                <Col sm={3} >
                        <FormGroup>
                            <Input type="select" value={Department} onChange={this.handleFilterDepartmentFilterChange} name="departmentFilter" id="departmentFilter">
                                <option value="" >Select Department</option>
                                <option value="CSE" >CSE</option>
                                <option value="IT" >IT</option>
                                <option value="ECE" >ECE</option>
                                <option value="EEE" >EEE</option>
                                <option value="EI" >E&I</option>
                                <option value="MECH" >MECH</option>
                                <option value="ARCHI" >Architechture</option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col sm={3} >
                        <FormGroup>
                            <Input type="select" value={DOJ} onChange={this.handleFilterYearFilterChange} name="yearFilter" id="yearFilter">
                                <option value="" >Select Year</option>
                                <option value="2020-05-08" >1st Year</option>
                                <option value="2019-05-08" >2nd Year</option>
                                <option value="2018-05-08" >3rd Year</option>
                                <option value="2017-05-08" >4th Year</option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col sm={3} >
                        <FormGroup>
                            <Input type="select" value={Section} onChange={this.handleFilterSectionFilterChange} name="sectionFilter" id="sectionFilter">
                                <option value="" >Select Section</option>
                                <option value="A" >A</option>
                                <option value="B" >B</option>
                                <option value="C" >C</option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col>
                        <MDBBtn color="deep-orange" onClick={this.handleFilterReset}>Reset</MDBBtn>
                    </Col>
                </Row>
                <Table hover striped responsive borderless >
                    <thead className="thead-dark">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>RegNo</th>
                            <th>DOJ</th>
                            <th>Department</th>
                            <th>Section</th>
                            <th>Gender</th>
                            <th>Mark Attendance</th>
                            {/* <th>Edit</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {loading && <Spinner color="success" />}
                        {studentsData.length > 0 && !loading ? studentsData.map((stud, i) => <tr key={stud._id}>
                            <td>{i + 1}</td>
                            <td>{stud.Name}</td>
                            <td>{stud.Regno}</td>
                            <td>{getDateLabel(stud.DOJ)}</td>
                            <td>{stud.Department}</td>
                            <td>{stud.Section}</td>
                            <td>{stud.Gender}</td>
                            <td>
                                <label className={`btn ${present.includes(stud.Regno) ? 'btn-dark' : ''}`}>
                                    <input value="Present" onChange={(e) => this.handleRadioOnChange(e, stud)} type="radio" name={stud._id}
                                        defaultChecked={present.includes(stud.Regno)}
                                    /> Present
                            </label>
                                <label className={`btn ${absent.includes(stud.Regno) ? 'btn-dark' : ''}`}>
                                    <input value="Absent" onChange={(e) => this.handleRadioOnChange(e, stud)} type="radio" name={stud._id}
                                        defaultChecked={absent.includes(stud.Regno)}
                                    /> Absent
                            </label>
                                <label className={`btn ${onDuty.includes(stud.Regno) ? 'btn-dark' : ''}`}>
                                    <input value="Onduty" onChange={(e) => this.handleRadioOnChange(e, stud)} type="radio" name={stud._id}
                                        defaultChecked={onDuty.includes(stud.Regno)}
                                    /> Onduty
                            </label>
                            </td>
                            {/* <td>
                                <button className="btn btn-info">Edit</button>
                            </td> */}
                        </tr>) : <td>{!loading && 'No results found'}</td>
                        }

                    </tbody>

                </Table>
                <div className="text-center mt-2">
                    <Button onClick={this.submitBulkAttendance} color="primary" size="lg" outline>Submit</Button>{' '}
                </div>
            </div>
        );
    }
}

export default FacultyDashboard;
