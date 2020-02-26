import React, { Component } from "react";
import '../App.css';
import { Form, Label, Input, FormGroup } from "reactstrap";

class Alogin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userID: '',
            password: ''
        }
    }

    handleOnchange = (e) => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleOnSubmit = (e) => {
        e.preventDefault()
        console.log(this.state)

        // perform API call to validate the credentials
        // if validated
        if (this.state.userID === 'Admin@aiht.in' && this.state.password === 'admin') {
             this.props.history.push('/admin-dashboard')
        } else {
            window.confirm('Wrong Credential')
        }
    }

    render() {
        const { userID, password } = this.state
        return (
            <div className="Form">
                <h1 className="font-weight-bold text-center">Admin Login</h1>
                <h2 className="text-center">Welcome</h2>
                <Form onSubmit={this.handleOnSubmit} className="form-control-lg">
                    <FormGroup className="mx-auto">
                        <Label>UserID</Label>
                        <Input type="text" name="userID" onChange={this.handleOnchange} value={userID} placeholder="User ID" />
                    </FormGroup>
                    <FormGroup>
                        <Label>Password</Label>
                        <Input type="password" name="password" onChange={this.handleOnchange} value={password} placeholder="Password" />
                    </FormGroup>

                    <button type="submit" className="btn btn-block btn-outline-primary">Submit</button>
                </Form>
            </div>
        );
    }

}

export default Alogin;