import React from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav } from 'react-bootstrap';
import { getPhase } from './Home/homePhase.js';
import '../css/navBar.css';

const LINKS = [
  ['/', 'Home'],
  ['/getstarted', 'Get Started'],
  ['/vote', 'Vote'],
  ['/results', 'Results'],
  ['/archive', 'Archive'],
  ['/submit', 'Submit Your Mix'],
  ['/contact', 'ContactS'],
];

var NavBar = function ({ details, now }) {
  const [expanded, setExpanded] = React.useState(false);
  const location = useLocation();
  React.useEffect(() => {
    window.gtag('config', 'G-7JCK4EJFYD', {
      page_location: document.location.href,
      page_path: location.pathname,
    });
  }, [location.pathname]);

  // `now` only changes when DateWatcher sees the date or contest phase change.
  // Nothing is highlighted while details load or when there is no contest.
  const phase = getPhase(details, new Date(now));
  const highlighted = phase && phase.nav;

  return (
    <Navbar
      variant='dark'
      expand='lg'
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
      className='site-nav'
    >
      <Navbar.Brand href='/'>
        reaMIXed
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='ml-auto' onSelect={() => setExpanded(false)}>
          {LINKS.map(([to, label]) => (
            <LinkContainer key={to} to={to} exact={to === '/'}>
              <Nav.Link className={to === highlighted ? 'nav-cta' : ''}>
                {label}
              </Nav.Link>
            </LinkContainer>
          ))}
          <Nav.Link
            className='nav-donate'
            href='https://www.paypal.com/donate/?hosted_button_id=JHVM2LWFUYCBY'
            target='_blank'
            rel='noopener noreferrer'
          >
            Donate
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

const mapStateToProps = (state) => {
  return {
    details: state.contestDetailReducer,
    now: state.nowReducer,
  };
};

export default connect(mapStateToProps)(NavBar);
