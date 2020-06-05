import React from 'react';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';

var NavBar = function() {
  return (
    <Navbar bg="light" expand="lg">
  <Navbar.Brand href="#home">Reaper Contest</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#link">Get Started</Nav.Link>
      <Nav.Link href="#link">Submit Your Work</Nav.Link>
      <Nav.Link href="#link">Vote</Nav.Link>
      <NavDropdown title="Archive" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Hall of Fame</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Past Raw Files</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Past Mixes</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  </Navbar.Collapse>
</Navbar>
  )
}


export default NavBar;