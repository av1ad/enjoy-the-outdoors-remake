import React from 'react';

const MountainDetail = ({ mountain }) => {
  if (!mountain) {
    return <div id="show-results"></div>;
  }

  return (
    <div id="show-results" className="mt-5">
      <h2 className="mountain-name">{mountain.name}</h2>
      <img
        src={`/images/${mountain.img}`}
        alt={mountain.name}
        className="mountain-img"
      />
      <p className="mountain-elevation">Elevation: {mountain.elevation} ft</p>
      <p className="mountain-desc text-wrap">Description: {mountain.desc}</p>
      <p className="mountain-coords">
        Coordinates: {mountain.coords.lat}, {mountain.coords.lng}
      </p>
    </div>
  );
};

export default MountainDetail;