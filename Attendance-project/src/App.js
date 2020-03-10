import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

//Components
import login from './Components/FacultyLogin';
import PageNotFound from './Components/PageNotFound';
import AdminDashboard from './Components/Admin-Dashboard/AdminDashboard';
import FacultyDashboard from './Components/Faculty-Dashboard/FacultyDashboard';
import AdminLogin from './Components/AdminLogin';
import status from './Components/Admin-Dashboard/status';
import Report from './Components/Admin-Dashboard/Report'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={login}></Route>
        <Route exact path="/admin-dashboard" component={AdminDashboard}></Route>
        <Route exact path="/faculty-dashboard" component={FacultyDashboard}></Route>
        <Route exact path="/admin-login" component={AdminLogin}></Route>
        <Route path="/status" component={status}></Route>
        <Route path="/report" component={Report}></Route>
        <Route path="*" component={PageNotFound}></Route>
      </Switch>
    </Router >
  );
}

export default App;
