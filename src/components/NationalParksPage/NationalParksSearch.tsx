import React, { useState, useCallback } from 'react';
import { SearchFilters } from '../../types';

interface NationalParksSearchProps {
  locations: string[];
  parkTypes: string[];
  onSearch: (filters: SearchFilters) => void;
  currentFilters: SearchFilters;
  isLoading: boolean;
}

const NationalParksSearch: React.FC<NationalParksSearchProps> = ({
  locations,
  parkTypes,
  onSearch,
  currentFilters,
  isLoading
}) => {
  const [searchType, setSearchType] = useState<'location' | 'parkType' | 'nothing'>('nothing');
  const [location, setLocation] = useState<string>('all');
  const [parkType, setParkType] = useState<string>('all');

  const handleSearch = useCallback(() => {
    const filters: SearchFilters = {};
    
    if (searchType === 'location' && location !== 'all') {
      filters.location = location;
    }
    
    if (searchType === 'parkType' && parkType !== 'all') {
      filters.parkType = parkType;
    }
    
    onSearch(filters);
  }, [searchType, location, parkType, onSearch]);

  const handleReset = useCallback(() => {
    setSearchType('nothing');
    setLocation('all');
    setParkType('all');
    onSearch({});
  }, [onSearch]);

  return (
    <div className="national-parks-search">
      <div className="row g-3 align-items-end">
        <div className="col-md-4">
          <label htmlFor="search-type" className="form-label fw-semibold">
            Search By:
          </label>
          <select
            className="form-select"
            id="search-type"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value as 'location' | 'parkType' | 'nothing')}
            disabled={isLoading}
          >
            <option value="nothing">Choose search type...</option>
            <option value="location">Location (State)</option>
            <option value="parkType">Park Type</option>
          </select>
        </div>

        <div className="col-md-4">
          <label htmlFor="search-term" className="form-label fw-semibold">
            {searchType === 'location' ? 'State:' : 
             searchType === 'parkType' ? 'Park Type:' : 'Search Term:'}
          </label>
          
          {searchType === 'location' && (
            <select
              className="form-select"
              id="search-term"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              disabled={isLoading}
            >
              <option value="all">All States</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          )}

          {searchType === 'parkType' && (
            <select
              className="form-select"
              id="search-term"
              value={parkType}
              onChange={(e) => setParkType(e.target.value)}
              disabled={isLoading}
            >
              <option value="all">All Park Types</option>
              {parkTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          )}

          {searchType === 'nothing' && (
            <select className="form-select" disabled>
              <option>Select search type first</option>
            </select>
          )}
        </div>

        <div className="col-md-4">
          <div className="d-flex gap-2">
            <button
              className="btn btn-primary flex-fill"
              type="button"
              onClick={handleSearch}
              disabled={isLoading || searchType === 'nothing'}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Searching...
                </>
              ) : (
                <>
                  <i className="bi bi-search me-2"></i>
                  Search
                </>
              )}
            </button>
            
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={handleReset}
              disabled={isLoading}
              title="Reset all filters"
            >
              <i className="bi bi-arrow-counterclockwise"></i>
            </button>
          </div>
        </div>
      </div>

      {searchType !== 'nothing' && (
        <div className="row mt-3">
          <div className="col-12">
            <small className="text-muted">
              <i className="bi bi-info-circle me-1"></i>
              {searchType === 'location' 
                ? `Filter parks by state or territory`
                : `Filter parks by their type or designation`}
            </small>
          </div>
        </div>
      )}
    </div>
  );
};

export default NationalParksSearch;