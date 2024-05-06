import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@mui/material';

const items = [
  {
    image: 'msit1.jpg',
  },
  {
    image: 'msit2.jpg',
  },
  {
    image: 'msit3.jpg',
  },
];

const CarouselComponent = () => {
  return (
    <div style={{ height: '300px' }}> {/* Set a fixed height for the carousel container */}
      <Carousel>
        {items.map((item, index) => (
          <Item key={index} item={item} />
        ))}
      </Carousel>
    </div>
  );
};

const Item = ({ item }) => {
  return (
    <Paper style={{ height: '100%' }}> {/* Set the height of each item to 100% */}
      <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </Paper>
  );
};

export default CarouselComponent;
