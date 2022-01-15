import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import headphoneJPG from '/src/assets/headphones.jpeg';
import mixerJPG from '/src/assets/mixingboard.jpg';
import votingJPG from '/src/assets/voting.jpeg';
import '/src/css/headerCarousel.css';

function HeaderCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      className='cuprum rem2'
      style={{ maxHeight: '50vh', overflow: 'hidden' }}
    >
      <Carousel.Item>
        <img className='d-block w-100' src={mixerJPG} alt='First slide' />
        <Carousel.Caption className='carousel-caption-top'>
          <h1>MIX</h1>
          <p>
            Try your hand at mixing professionally recorded tracks in a variety
            of genres
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className='d-block w-100' src={headphoneJPG} alt='Second slide' />

        <Carousel.Caption className='carousel-caption-top'>
          <h1>LISTEN</h1>
          <p>Compare the mixes from all the contestants</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className='d-block w-100' src={votingJPG} alt='Third slide' />

        <Carousel.Caption className='carousel-caption-top'>
          <h1>VOTE</h1>
          <p>Vote for the best mixes and learn from their projects</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default HeaderCarousel;
