import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="container text-center greater-outdoors">
      <h1>Greater Outdoors</h1>
      <p>
        Greater Outdoors is a website that provides information about the
        National Parks and Mountains in the United States.
      </p>
      <p>
        Click on one of the navigation links above to learn more about the
        National Parks and Mountains in the United States.
      </p>
      <img
        src="/images/nationalpark.webp"
        alt="Trees and mountains"
        className="home-img"
      />
    </div>
  );
};

export default HomePage;