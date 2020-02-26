import React, { Component, Fragment } from 'react';
import Calendar from 'react-calendar';
import '../../App.css';
import StatusList from './statusList';
import Navbar from '../Navbar';

class status extends Component {

  constructor(props) {
    super(props)
    this.state = {
      date: new Date(),
    }
  }


  onChange = date => this.setState({ date })
  render() {
    const { date } = this.state
    const dateTimeString = date.toDateString() //+ '  ' + date.toLocaleTimeString()
    return (
      <Fragment>
        <Navbar />
        <div className="calendar">
          <Calendar
            onChange={this.onChange}
            value={this.state.date}
          />
          {dateTimeString}
        </div>
        <StatusList />
      </Fragment>
    );
  }
}
export default status;