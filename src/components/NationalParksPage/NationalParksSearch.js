import React, { useState, useEffect } from 'react';
import { parkTypesArray } from '../../data/nationalParksData';

const NationalParksSearch = ({ onSearch, nationalParksData }) => {
  const [searchType, setSearchType] = useState('nothing');
  const [searchTerm, setSearchTerm] = useState('');
  const [locations, setLocations] = useState([]);
  const [parkTypes, setParkTypes] = useState([]);

  useEffect(() => {
    const locationsSet = new Set();

    nationalParksData.nationalParksArray.forEach((park) => {
      locationsSet.add(park.State);
    });

    setLocations(Array.from(locationsSet));
    setParkTypes(parkTypesArray); // Set parkTypes from the imported array
  }, [nationalParksData.nationalParksArray]);

  const searchByLocation = (location) => {
    return nationalParksData.nationalParksArray.filter((park) => park.State === location);
  };

  const searchByParkType = (parkType) => {
    return nationalParksData.nationalParksArray.filter((park) =>
      park.LocationName.includes(parkType)
    );
  };

  const handleSearch = () => {
    let results = [];
    if (searchType === 'location') {
      results = searchByLocation(searchTerm);
    } else if (searchType === 'park-type') {
      results = searchByParkType(searchTerm);
    }
    onSearch(results);
  };

  return (
    <div className="row text-center">
      <div className="col-md-6">
        <form>
          <div className="input-group mb-3">
            <select
              className="form-select"
              id="search-type"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
            >
              <option value="nothing">Select an option</option>
              <option value="location">Search by location</option>
              <option value="park-type">Search by park type</option>
            </select>
            <select
              className="form-select"
              id="search-term"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            >
              <option value="">Select a search term</option>
              {searchType === 'location' &&
                locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              {searchType === 'park-type' &&
                parkTypes.map((parkType) => (
                  <option key={parkType} value={parkType}>
                    {parkType}
                  </option>
                ))}
            </select>
            <button
              className="btn btn-success"
              type="button"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NationalParksSearch;