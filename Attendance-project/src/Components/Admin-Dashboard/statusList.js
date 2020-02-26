import React from 'react';
import { Table, Input, FormGroup,Label, Button } from 'reactstrap';

function StatList(){
    return(
        <div>
        <div className="table-responsive">
            <Table className="table">
           
            <thead className="thead-dark">
                        <tr>
                            <th>#</th>
                            <th>Year</th>
                            <th>Name</th>
                            <th>Reg.N0</th>
                            <th>Dept</th>
                            <th>Gender</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>01</td>
                        <td>ABCD</td>
                        <td>123456</td>
                        <td>IT</td>
                        <td>Male</td>
                        <td>
                        <FormGroup check inline>
                            <Label check>
                            <Input type="radio" name="radio1" disabled />{' '}
                            Present
                            </Label>
                        </FormGroup>
                        <FormGroup check inline>
                            <Label check>
                            <Input type="radio" name="radio1" disabled />{' '}
                            Absent
                            </Label>
                        </FormGroup>
                        <FormGroup check disabled inline>
                            <Label check>
                            <Input type="radio" name="radio1" checked />{' '}
                            Onduty
                            </Label>
                        </FormGroup>           
                        </td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>01</td>
                        <td>ABCD</td>
                        <td>123456</td>
                        <td>IT</td>
                        <td>Male</td>
                        <td>
                        <FormGroup check inline>
                            <Label check>
                            <Input type="radio" name="radio1" disabled />{' '}
                            Present
                            </Label>
                        </FormGroup>
                        <FormGroup check inline>
                            <Label check>
                            <Input type="radio" name="radio1" disabled />{' '}
                            Absent
                            </Label>
                        </FormGroup>
                        <FormGroup check disabled inline>
                            <Label check>
                            <Input type="radio" name="radio1" checked disabled />{' '}
                            Onduty
                            </Label>
                        </FormGroup>    
                        </td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>01</td>
                        <td>ABCD</td>
                        <td>123456</td>
                        <td>IT</td>
                        <td>Male</td>
                        <td>
                        <FormGroup check inline>
                            <Label check>
                            <Input type="radio" name="radio1" disabled />{' '}
                            Present
                            </Label>
                        </FormGroup>
                        <FormGroup check inline>
                            <Label check>
                            <Input type="radio" name="radio1" disabled />{' '}
                            Absent
                            </Label>
                        </FormGroup>
                        <FormGroup check disabled inline>
                            <Label check>
                            <Input type="radio" name="radio1" checked disabled />{' '}
                            Onduty
                            </Label>
                        </FormGroup>      
                        </td>
                    </tr>
                </tbody>
                </Table>
            </div>
            <div className="text-center mt-2">
            <Button color="primary" size="lg" outline>Download CSV</Button>{' '}
            </div>
        </div>
    );
}

export default StatList;