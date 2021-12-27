import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem, NavDropdown } from 'react-bootstrap';
import '../css/navBar.css';
var NavBar = function () {
  const [expanded, setExpanded] = React.useState(false);
  const location = useLocation();
  React.useEffect(() => {
    window.gtag('config', 'G-7JCK4EJFYD', {
      page_location: document.location.href,
      page_path: location.pathname,
    });
  }, [location.pathname]);

  return (
    <Navbar
      bg='dark'
      variant='dark'
      expand='lg'
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
      className='stickyheader cuprum rem2'
    >
      <Navbar.Brand href='/' className='cabin rem4'>
        {' '}
        reaMIXed
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='ml-auto' onSelect={() => setExpanded(false)}>
          <LinkContainer className='ml-auto' to='/'>
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer className='ml-auto' to='/getstarted'>
            <Nav.Link>Get Started</Nav.Link>
          </LinkContainer>
          <LinkContainer className='ml-auto' to='/submit'>
            <Nav.Link>Submit Your Mix</Nav.Link>
          </LinkContainer>
          <LinkContainer className='ml-auto' to='/vote'>
            <Nav.Link>Vote</Nav.Link>
          </LinkContainer>
          <LinkContainer className='ml-auto' to='/results'>
            <Nav.Link>Results</Nav.Link>
          </LinkContainer>
          <LinkContainer className='ml-auto' to='/archive'>
            <Nav.Link>Archive</Nav.Link>
          </LinkContainer>
          {/* <NavDropdown title="Archive" id="basic-nav-dropdown">

              <NavDropdown.Item className="cuprum" href="/Archive">Past Raw Files</NavDropdown.Item>
              <NavDropdown.Item className="cuprum" href="/Archive#action/3.3">Past Mixes</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item className="cuprum" href="/Archive#action/3.1">Hall of Fame</NavDropdown.Item>
            </NavDropdown> */}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
