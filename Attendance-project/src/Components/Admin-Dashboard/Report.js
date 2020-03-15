import React, { Component } from 'react';
import Navbar from '../Navbar';
import { Table, Spinner } from 'reactstrap';
import DatePicker from "react-datepicker";
import { MDBBtn } from 'mdbreact';
import Axios from 'axios'

const clearNullProp = (obj = {}) => {
    for (const key in obj) {
        if (!obj[key]) {
            delete obj[key]
        }
    }
    return obj
}

const initFilterObj = {
    date: new Date(),
}

export default class Report extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
            loading: false,
            studentsData: [],
            attendanceData: [],
            present: [],
            absent: [],
            onDuty: [],
            date: new Date()

        }
    }

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
            }, this.getAllAttendance)
        })
    }
    // filter operations

    getAllAttendance = () => {

        let { filterObj } = this.state
        filterObj = clearNullProp(filterObj)

        Axios.get("http://localhost:4000/Attendance/getAttendance", { params: filterObj }).then(res => {
            // check api calling method,  param is missing with additionally date para,
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

        console.log(present.length,
            absent.length,
            onDuty.length)

        this.setState({ present, absent, onDuty })
    }


    chooseDate = date => {
           this.setState({date : date}, this.getAll)
    }
    render() {
        const { studentsData, loading, present, absent, onDuty } = this.state;

        return (
            <div>
                <div style={{ marginBottom: '80px' }} >
                    <Navbar />
                </div>
                <div style={{ textAlign: "center" }}>
                    <h1 style={{ fontWeight: "bold" }}>Over All Report</h1>
                    <DatePicker
                        selected={this.state.date}
                        onChange={this.chooseDate}
                    />
                </div>
                <div style={{ marginTop: "40px" }}>
                    <Table responsive borderless hover striped>
                        <thead className="thead-dark">
                            <tr>
                                <th>Departments</th>
                                <th>No.of Students</th>
                                <th>Boys</th>
                                <th>Girls</th>
                                <th>Present</th>
                                <th>Absent</th>
                                <th>OnDuty</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading && <Spinner />}
                            {

                            }
                        </tbody>
                    </Table>

                    <div style={{ textAlign: "center" }}>
                        <MDBBtn gradient="blue" size="lg">DOWNLOAD REPORT</MDBBtn>
                    </div>

                </div>
            </div>
        );
    }
}