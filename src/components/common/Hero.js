// @ts-nocheck
import React from 'react';
import { Jumbotron, Container } from 'react-bootstrap';
import Background from '/src/assets/reaper-panel.png';

const Hero = function (props) {
  return (
    <Jumbotron
      fluid
      style={{
        backgroundImage: ` radial-gradient(circle, transparent 40%, black 75%), url(${Background})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        color: 'yellow',
        minHeight: '25vh',
        width: '100vw',
      }}
    >
      <Container>
        <h1 className='cuprum rem4'>{props.name}</h1>
      </Container>
    </Jumbotron>
  );
};

export default Hero;
