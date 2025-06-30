import React, { memo } from 'react';
import { NationalPark } from '../../types';

interface NationalParksResultProps {
  parks: NationalPark[];
}

const ParkCard: React.FC<{ park: NationalPark }> = memo(({ park }) => (
  <div className="col-lg-6 col-xl-4 mb-4">
    <div className="card h-100 shadow-sm border-0 park-card">
      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-primary">{park.LocationName}</h5>
        
        <div className="park-details mb-3">
          <p className="card-text mb-2">
            <i className="bi bi-geo-alt text-muted me-2"></i>
            {park.City}, {park.State} {park.ZipCode}
          </p>
          
          <p className="card-text mb-2">
            <i className="bi bi-house text-muted me-2"></i>
            {park.Address === 0 ? 'Address not available' : park.Address}
          </p>
          
          {park.Phone && park.Phone !== 0 && (
            <p className="card-text mb-2">
              <i className="bi bi-telephone text-muted me-2"></i>
              <a href={`tel:${park.Phone}`} className="text-decoration-none">
                {park.Phone}
              </a>
            </p>
          )}
        </div>

        <div className="park-coordinates mb-3">
          <small className="text-muted">
            <i className="bi bi-compass text-muted me-1"></i>
            {park.Latitude.toFixed(4)}°N, {Math.abs(park.Longitude).toFixed(4)}°W
          </small>
        </div>

        <div className="mt-auto">
          <div className="d-flex gap-2">
            {park.Visit && (
              <a 
                href={park.Visit} 
                className="btn btn-primary btn-sm flex-fill"
                target="_blank" 
                rel="noopener noreferrer"
                aria-label={`Visit ${park.LocationName} website`}
              >
                <i className="bi bi-globe me-1"></i>
                Visit Website
              </a>
            )}
            
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => {
                const mapsUrl = `https://www.google.com/maps?q=${park.Latitude},${park.Longitude}`;
                window.open(mapsUrl, '_blank', 'noopener,noreferrer');
              }}
              title="View on Google Maps"
              aria-label={`View ${park.LocationName} on Google Maps`}
            >
              <i className="bi bi-map"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
));

ParkCard.displayName = 'ParkCard';

const NationalParksResult: React.FC<NationalParksResultProps> = memo(({ parks }) => {
  if (parks.length === 0) {
    return (
      <div className="text-center py-5">
        <i className="bi bi-search display-1 text-muted mb-3"></i>
        <h3 className="text-muted">No parks found</h3>
        <p className="text-muted">Try adjusting your search criteria.</p>
      </div>
    );
  }

  return (
    <div className="national-parks-results">
      <div className="row">
        {parks.map((park) => (
          <ParkCard key={park.LocationID} park={park} />
        ))}
      </div>
      
      <div className="row mt-4">
        <div className="col-12 text-center">
          <small className="text-muted">
            Showing {parks.length} park{parks.length !== 1 ? 's' : ''}
          </small>
        </div>
      </div>
    </div>
  );
});

NationalParksResult.displayName = 'NationalParksResult';

export default NationalParksResult;