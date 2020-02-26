import React, { Component } from 'react';
import { Button, Table, Input, FormGroup, Label, Spinner } from 'reactstrap';
import FDash from './FacultyNav';
import Axios from 'axios';

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
            newAttendance: []
        }
    }
    componentDidMount() {
        this.getAllStudents();
        this.getAllAttendance();
    }

    getAllStudents = () => {
        Axios.get("http://localhost:4000/").then(res => {
            this.setState({
                studentsData: res.data
            })
        })
    }

    getAllAttendance = () => {
        Axios.get("http://localhost:4000/Attendance/").then(res => {
            this.setState({
                attendanceData: res.data
            }, this.differentiateAttendance)
        })
    }

    differentiateAttendance = () => {
        const { attendanceData } = this.state
        const present = attendanceData.filter(e => e.isPresent === 'Present')
        const absent = attendanceData.filter(e => e.isPresent === 'Absent')
        const onDuty = attendanceData.filter(e => e.isPresent === 'Onduty')
        this.setState({ present, absent, onDuty })
    }

    submitBulkAttendance = () => {
        const config = {
            url: "http://localhost:4000/Attendance/setAttendance",
            method: 'POST',
            data: this.state.newAttendance
        }
        Axios(config).then(res => {
            alert('Submitted successfully')
        })
    }

    handleRadioOnChange = (evnt, student) => {
        let { newAttendance } = this.state
        const attendance = evnt.target.value
        const date = new Date()
        let newRecord = {
            Date: date.toISOString(),
            Regno: student.Regno,
            isPresent: attendance,
            Department: student.Department,
            Year: student.DOJ,
        }

        newAttendance = [...newAttendance, newRecord]

        this.setState({ newAttendance })

    }

    render() {

        const { studentsData, loading, present, absent, onDuty } = this.state;
        console.log(this.state)
        const dateObj = new Date();
        return (
            <div>
                <FDash />
                <div>
                    <h1 className="text-center">Welcome To Information Technology</h1>
                    <h3 className="text-center">{dateObj.toLocaleDateString()}</h3>
                </div>
                <Table hover striped responsive borderless >
                    <thead className="thead-dark">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>RegNo</th>
                            <th>Department</th>
                            <th>Section</th>
                            <th>Gender</th>
                            <th>Mark Attendance</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading && <Spinner color="success" />}
                        {studentsData.length > 0 && !loading ? studentsData.map((stud, i) => <tr key={stud._id}>
                            <td>{i + 1}</td>
                            <td>{stud.Name}</td>
                            <td>{stud.Regno}</td>
                            <td>{stud.Department}</td>
                            <td>{stud.Section}</td>
                            <td>{stud.Gender}</td>
                            <td>
                                <label class="btn btn-dark Active">
                                    <input value="Present" onChange={(e) => this.handleRadioOnChange(e, stud)} type="radio" name={stud._id}
                                        defaultChecked={present.includes(stud.Regno)}
                                    /> present
                            </label>
                                <label class="btn btn-dark">
                                    <input value="Absent" onChange={(e) => this.handleRadioOnChange(e, stud)} type="radio" name={stud._id}
                                        defaultChecked={absent.includes(stud.Regno)}
                                    /> Absent
                            </label>
                                <label class="btn btn-dark">
                                    <input value="Onduty" onChange={(e) => this.handleRadioOnChange(e, stud)} type="radio" name={stud._id}
                                        defaultChecked={onDuty.includes(stud.Regno)}
                                    /> Onduty
                            </label>
                            </td>
                            <td>
                                <button className="btn btn-info">Edit</button>
                            </td>
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
