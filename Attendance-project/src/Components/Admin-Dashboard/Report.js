import React, { Component } from 'react';
import Navbar from '../Navbar';
import { Table, Spinner } from 'reactstrap';
import DatePicker from "react-datepicker";
import { MDBBtn } from 'mdbreact';
import Axios from 'axios'

export default class Report extends Component {
constructor(props){
    super(props);
    this.state = {
        startDate: new Date(),
        loading:false,
        studentsData:[],
        attendanceData: [],
            present: [],
            absent: [],
            onDuty: [],

    }
}

componentDidMount() {
    this.getAllStudents();
    
}

getAllStudents = () => {
    Axios.get("http://localhost:4000/", ).then(res => { 
        this.setState({
            studentsData: res.data
        })
        console.log(this.state.studentsData)
    })
}


    chooseDate = date => {
        this.setState({
          startDate: date
        });
      };
    render() {
        const { studentsData, loading, present, absent, onDuty } = this.state;

        return (
            <div>
                <div style={{ marginBottom: '80px' }} >
                    <Navbar />
                </div>
                <div style={{ textAlign: "center"}}>
                <h1 style={{fontWeight: "bold" }}>Over All Report</h1>
                <DatePicker
                    selected={this.state.startDate}
                    onChange={this.chooseDate}
                />
                </div>
                <div style={{marginTop:"40px"}}>
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
                            {loading && <Spinner color="dark"></Spinner>}
                            {studentsData.length > 0 && !loading ? studentsData.map((stud) => <tr key={stud._id}>
                                <td>{stud.Name.length}</td>
                                <td>{stud.Section.length}</td>
                                <td>{stud.Gender.length}</td>
                                <td></td>
                                
                            </tr>) : <td>{!loading && 'No results found'}</td>
                            }
                        </tbody>
                    </Table>

                    <div style={{textAlign:"center"}}>
                        <MDBBtn gradient="blue" size="lg">DOWNLOAD REPORT</MDBBtn>
                    </div>

                </div>
            </div>
        );
    }
}