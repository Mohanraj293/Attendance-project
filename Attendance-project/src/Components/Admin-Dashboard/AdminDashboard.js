import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table, Spinner } from 'reactstrap';
import Navbar from '../Navbar'
import Axios from 'axios';

class AdminDashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: false,
            loading: false,
            data:[],
        }
    }

    toggle = () => {
        this.setState({ modal: false })
    }

    componentDidMount(){
        this.getAll();
      }
      getAll(){
        Axios.get("http://localhost:4000/").then(res => {
          this.setState({
            data:res.data
          })
        })
    }

    render() {
        const { className } = this.props;

        const { modal, loading } = this.state;
        console.log(this.state)
        return (
            <div>
                <Navbar />
                <h3 className="text-center"> <br/>Students list <br/><Button className="btn btn-success">Create</Button></h3><br/>
                <Table hover striped responsive borderless >
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
                            <td><Button className="btn btn-info" onClick={this.toggle}>Edit</Button></td>
                            <td><Button className="btn btn-danger">Delete</Button></td>
                        </tr>) : <td>{!loading && 'No results found'}</td>
                        }

                    </tbody>
                </Table>
                <div>
                    <Modal isOpen={modal} toggle={this.toggle} className={className}>
                        <ModalHeader toggle={this.toggle}>Edit Students</ModalHeader>
                        <ModalBody>
                            <form>
                                <div className="form-group">
                                    <label>Year</label>
                                    <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="Year" />
                                </div>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" className="form-control" placeholder="Name" />
                                </div>
                                <div className="form-group">
                                    <label>Reg.No</label>
                                    <input type="text" className="form-control" placeholder="Reg.No" />
                                </div>
                                <div className="form-group">
                                    <label>Dept</label>
                                    <input type="text" className="form-control" placeholder="Dept" />
                                </div>
                                <div className="form-group">
                                    <label>Gender</label>
                                    <input type="text" className="form-control" placeholder="Gender" />
                                </div>
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="success">update</Button>{' '}
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        );
    }
}
export default AdminDashboard;