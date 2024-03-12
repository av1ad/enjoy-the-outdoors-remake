import React from 'react';

const MountainDetail = ({ mountain }) => {
  if (!mountain) {
    return <div id="show-results"></div>;
  }

  // Use require.context to dynamically import images from the folder
  const imageContext = require.context('../../images', false, /\.(png|jpe?g|svg)$/);

  // Find the image that matches the mountain name
  const imageSrc = imageContext(`./${mountain.img}`);

  return (
    <div id="show-results" className="mt-5">
      <h2 className="mountain-name">{mountain.name}</h2>
      <img src={imageSrc} alt={mountain.name} className="mountain-img" />
      <p className="mountain-elevation">Elevation: {mountain.elevation} ft</p>
      <p className="mountain-desc text-wrap">Description: {mountain.desc}</p>
      <p className="mountain-coords">
        Coordinates: {mountain.coords.lat}, {mountain.coords.lng}
      </p>
    </div>
  );
};

export default MountainDetail;