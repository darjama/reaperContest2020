import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import '../../css/headerCarousel.css';

function HeaderCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} style={{maxHeight: '50vh', overflow: 'hidden'}}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="assets/mixingboard.jpg"
          alt="First slide"
        />
        <Carousel.Caption className="carousel-caption-top">
          <h3>MIX</h3>
          <p>Try your hand at mixing well professionally recorded tracks in a variety of genres.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="assets/headphones.jpeg"
          alt="Second slide"
        />

        <Carousel.Caption  className="carousel-caption-top">
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="assets/voting.jpeg"
          alt="Third slide"
        />

        <Carousel.Caption  className="carousel-caption-top">
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default HeaderCarousel