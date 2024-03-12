import React from 'react';

const NationalParksResult = ({ results }) => {
  return (
    <div id="search-results" className="container">
      {results.length === 0 ? (
        <p>No results can be found</p>
      ) : (
        results.map((park) => (
          <div key={park.LocationName} className="card m-3">
            <div className="card-body">
              <h5 className="card-title">{park.LocationName}</h5>
              <p className="card-text">
                {park.Address}, {park.City}, {park.State} {park.ZipCode}
              </p>
              <p className="card-text">Phone: {park.Phone || 'N/A'}</p>
              <p className="card-text">Fax: {park.Fax}</p>
              <a href={park.Visit} className="card-link" target="_blank" rel="noopener noreferrer">
                Visit Website
              </a>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default NationalParksResult;