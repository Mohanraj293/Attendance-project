import React,{useState} from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button
} from 'reactstrap';




const FDash = (props) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggle = () => setIsOpen(!isOpen);
  return (
    <div>
      <Navbar color="primary" dark expand="md">
        <NavbarBrand href="/admin-dashboard">AIHT Attendance</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem className="" navbar>
              <NavLink><Button  href="#" className="btn btn-danger">LOGOUT</Button></NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default FDash;
