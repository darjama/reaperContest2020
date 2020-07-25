import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import '../../css/headerCarousel.css';

function HeaderCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} className="cuprum rem2" style={{maxHeight: '50vh', overflow: 'hidden'}}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="assets/mixingboard.jpg"
          alt="First slide"
        />
        <Carousel.Caption className="carousel-caption-top">
          <h1>MIX</h1>
          <p>Try your hand at mixing professionally recorded tracks in a variety of genres</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="assets/headphones.jpeg"
          alt="Second slide"
        />

        <Carousel.Caption  className="carousel-caption-top">
          <h1>LISTEN</h1>
          <p>Compare the mixes from all the contestants</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="assets/voting.jpeg"
          alt="Third slide"
        />

        <Carousel.Caption  className="carousel-caption-top">
          <h1>VOTE</h1>
          <p>
            Vote for the best mixes and learn from their projects
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default HeaderCarousel