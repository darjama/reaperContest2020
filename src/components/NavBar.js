import React from 'react';
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import {Navbar, Nav, NavItem, NavDropdown} from 'react-bootstrap';
import "../css/navBar.css";
var NavBar = function() {
  return (
    <Navbar bg="dark" variant="dark"expand="lg" className="stickyheader">
      <Navbar.Brand href="#home">reaMIXed</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer to='/'>
          <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to='/getstarted'>
          <Nav.Link>Get Started</Nav.Link>
          </LinkContainer>
          <LinkContainer to='/submit'>
          <Nav.Link>Submit Your Mix</Nav.Link>
          </LinkContainer>
          <LinkContainer to='/vote'>
          <Nav.Link>Vote</Nav.Link>
          </LinkContainer>
          <NavDropdown title="Archive" id="basic-nav-dropdown">

            <NavDropdown.Item href="#action/3.2">Past Raw Files</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Past Mixes</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.1">Hall of Fame</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}


export default NavBar;