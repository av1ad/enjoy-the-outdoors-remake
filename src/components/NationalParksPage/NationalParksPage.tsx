import React, { useState, useMemo, useCallback } from 'react';
import NationalParksSearch from './NationalParksSearch';
import NationalParksResult from './NationalParksResult';
import LoadingSpinner from '../shared/LoadingSpinner';
import { nationalParksArray, locationsArray, parkTypesArray } from '../../data/nationalParksData';
import { NationalPark, SearchFilters } from '../../types';
import './NationalParksPage.css';

const NationalParksPage: React.FC = () => {
  const [searchResults, setSearchResults] = useState<NationalPark[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentFilters, setCurrentFilters] = useState<SearchFilters>({});
  const [hasSearched, setHasSearched] = useState(false);

  // Memoized search function with better performance
  const searchParks = useCallback((filters: SearchFilters) => {
    setIsLoading(true);
    setCurrentFilters(filters);
    
    // Simulate async search for better UX
    setTimeout(() => {
      let results = nationalParksArray;

      // Filter by location (state)
      if (filters.location && filters.location !== 'all') {
        results = results.filter(park => 
          park.State.toLowerCase() === filters.location!.toLowerCase()
        );
      }

      // Filter by park type with improved matching
      if (filters.parkType && filters.parkType !== 'all') {
        results = results.filter(park => {
          const parkName = park.LocationName.toLowerCase();
          const searchType = filters.parkType!.toLowerCase();
          
          // More precise matching for park types
          switch (searchType) {
            case 'national park':
              return parkName.includes('national park') && !parkName.includes('preserve');
            case 'national monument':
              return parkName.includes('national monument');
            case 'recreation area':
              return parkName.includes('recreation area') || parkName.includes('recreational area');
            case 'historic':
              return parkName.includes('historic') || parkName.includes('history');
            case 'memorial':
              return parkName.includes('memorial');
            case 'preserve':
              return parkName.includes('preserve');
            case 'battlefield':
              return parkName.includes('battlefield');
            case 'scenic trail':
              return parkName.includes('scenic trail') || parkName.includes('trail');
            case 'seashore':
              return parkName.includes('seashore');
            case 'river':
              return parkName.includes('river');
            case 'parkway':
              return parkName.includes('parkway');
            case 'island':
              return parkName.includes('island');
            default:
              return parkName.includes(searchType);
          }
        });
      }

      // Sort results by name for consistency
      results.sort((a, b) => a.LocationName.localeCompare(b.LocationName));

      setSearchResults(results);
      setHasSearched(true);
      setIsLoading(false);
    }, 300); // Small delay to show loading state
  }, []);

  const handleClearResults = useCallback(() => {
    setSearchResults([]);
    setCurrentFilters({});
    setHasSearched(false);
  }, []);

  // Memoized search metadata
  const searchMetadata = useMemo(() => {
    if (!hasSearched) return null;

    const total = nationalParksArray.length;
    const filtered = searchResults.length;
    const percentage = total > 0 ? Math.round((filtered / total) * 100) : 0;

    return {
      total,
      filtered,
      percentage,
      hasActiveFilters: Object.values(currentFilters).some(value => value && value !== 'all')
    };
  }, [searchResults.length, currentFilters, hasSearched]);

  return (
    <div className="national-parks-page">
      <div className="container mt-4">
        {/* Page Header */}
        <div className="row mb-4">
          <div className="col-12 text-center">
            <h1 className="display-4 mb-3">National Parks Explorer</h1>
            <p className="lead text-muted">
              Discover {nationalParksArray.length} national parks and historic sites across the United States
            </p>
          </div>
        </div>

        {/* Search Interface */}
        <div className="row mb-4">
          <div className="col-lg-8 mx-auto">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <NationalParksSearch
                  locations={locationsArray}
                  parkTypes={parkTypesArray}
                  onSearch={searchParks}
                  currentFilters={currentFilters}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Search Metadata */}
        {searchMetadata && (
          <div className="row mb-3">
            <div className="col-12">
              <div className="d-flex justify-content-between align-items-center">
                <div className="search-info">
                  <span className="text-muted">
                    Showing <strong>{searchMetadata.filtered}</strong> of{' '}
                    <strong>{searchMetadata.total}</strong> parks
                    {searchMetadata.hasActiveFilters && (
                      <span className="ms-2 badge bg-secondary">
                        {searchMetadata.percentage}% match
                      </span>
                    )}
                  </span>
                </div>
                
                {hasSearched && (
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={handleClearResults}
                    disabled={isLoading}
                  >
                    <i className="bi bi-arrow-counterclockwise me-1"></i>
                    Clear Results
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="row">
            <div className="col-12">
              <LoadingSpinner text="Searching parks..." />
            </div>
          </div>
        )}

        {/* Search Results */}
        {!isLoading && hasSearched && (
          <div className="row">
            <div className="col-12">
              {searchResults.length > 0 ? (
                <NationalParksResult parks={searchResults} />
              ) : (
                <div className="text-center py-5">
                  <div className="alert alert-info">
                    <h4>No parks found</h4>
                    <p className="mb-0">
                      Try adjusting your search criteria or clear the filters to see all parks.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Initial State */}
        {!hasSearched && !isLoading && (
          <div className="row">
            <div className="col-12 text-center py-5">
              <i className="bi bi-search display-1 text-muted mb-3"></i>
              <h3 className="text-muted">Ready to explore?</h3>
              <p className="text-muted">
                Use the search filters above to find national parks by location or type.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NationalParksPage;