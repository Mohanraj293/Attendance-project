import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { MDBBtn } from 'mdbreact';




const ADash = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <div>
      <Navbar fixed="top" color="primary" dark expand="md">
        <NavbarBrand href="/admin-dashboard">AIHT Attendance</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink href="/admin-dashboard">List</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/status">Status</NavLink>
            </NavItem>
            <NavLink href="#">Report</NavLink>
          </Nav>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <MDBBtn href="#" color="orange">LOGOUT</MDBBtn>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default ADash;
