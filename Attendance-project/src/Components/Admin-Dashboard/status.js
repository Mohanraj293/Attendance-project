import React, { Component, Fragment } from 'react';
import '../../App.css';
import StatusList from './statusList';
import Navbar from '../Navbar';

class status extends Component {
  render() {
    // const { date } = this.state
    // const dateTimeString = date.toDateString() //+ '  ' + date.toLocaleTimeString()
    return (
      <Fragment>
        <Navbar /><br/><br/>
        <StatusList />
      </Fragment>
    );
  }
}
export default status;