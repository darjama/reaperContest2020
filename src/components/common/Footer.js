import React from 'react';
import { Row, Col } from 'react-bootstrap';

var Footer = function (props) {
  return (
    <Row
      style={{
        width: '100%',
        margin: '1rem 1rem 0 0',
        padding: '1rem',
        color: 'white',
        backgroundColor: 'black',
      }}
    >
      <Col className='mr-auto'>Copyright 2020</Col>
      <Col className='ml-auto text-right'>
        <a href='/contact' style={{ color: 'white' }}>
          Contact Us
        </a>
      </Col>
    </Row>
  );
};

export default Footer;
