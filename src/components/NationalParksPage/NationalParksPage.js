import React, { useState } from 'react';
import NationalParksSearch from './NationalParksSearch';
import NationalParksResult from './NationalParksResult';
import { nationalParksArray, locationsArray, parkTypesArray } from '../../data/nationalParksData';
import './NationalParksPage.css';

const nationalParksData = {
  nationalParksArray,
  locationsArray,
  parkTypesArray
};

const NationalParksPage = () => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (results) => {
    setSearchResults(results);
  };

  return (
    <div className="container mt-3">
      <NationalParksSearch
        onSearch={handleSearch}
        nationalParksData={nationalParksData}
        nationalParksArray={nationalParksData.nationalParksArray}
        locationsArray={nationalParksData.locationsArray}
        parkTypesArray={nationalParksData.parkTypesArray}
      />
      <div className="row">
        <div className="col-md-12">
          <button
            className="btn btn-success"
            type="button"
            onClick={() => setSearchResults([])}
          >
            Refresh Results
          </button>
        </div>
      </div>
      <NationalParksResult results={searchResults} />
    </div>
  );
};

export default NationalParksPage;