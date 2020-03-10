import React, { Component } from 'react';
import Navbar from '../Navbar';
import { Table } from 'reactstrap';
import DatePicker from "react-datepicker";
import { MDBBtn } from 'mdbreact';

export default class Report extends Component {
constructor(props){
    super(props);
    this.state = {
        startDate: new Date()
    }
}

    chooseDate = date => {
        this.setState({
          startDate: date
        });
      };
    render() {
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
                            </tr>
                        </thead>
                        <tbody>
                            
                        </tbody>
                    </Table>

                    <div style={{textAlign:"center"}}>
                        <MDBBtn gradient="blue" size="lg">DOWNLOAD</MDBBtn>
                    </div>

                </div>
            </div>
        );
    }
}