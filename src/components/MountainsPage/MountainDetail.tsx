import React, { memo } from 'react';
import { Mountain } from '../../types';
import mountainsData from '../../data/mountainsData';

interface MountainDetailProps {
  mountain: (Mountain & { image?: string }) | null;
}

const MountainDetail: React.FC<MountainDetailProps> = memo(({ mountain }) => {
  if (!mountain) {
    return (
      <div className="mountain-detail-placeholder text-center py-5">
        <div className="card border-0 bg-light">
          <div className="card-body">
            <h3 className="text-muted">Select a Mountain</h3>
            <p className="text-muted">
              Choose a mountain from the dropdown to view detailed information, 
              photos, and coordinates.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const getDifficultyBadgeClass = (effort: string) => {
    switch (effort.toLowerCase()) {
      case 'easy':
        return 'badge bg-success';
      case 'moderate':
        return 'badge bg-warning text-dark';
      case 'strenuous':
        return 'badge bg-danger';
      default:
        return 'badge bg-secondary';
    }
  };

  const formatCoordinates = (lat: number, lng: number) => {
    return `${lat.toFixed(6)}°N, ${Math.abs(lng).toFixed(6)}°W`;
  };

  const mountainIndex = mountainsData.findIndex(m => m.name === mountain.name);
  const totalMountains = mountainsData.length;
  const elevationRank = mountainsData
    .sort((a, b) => b.elevation - a.elevation)
    .findIndex(m => m.name === mountain.name) + 1;

  return (
    <div className="mountain-detail-enhanced">
      <div className="card mountain-detail-card shadow-lg border-0">
        {/* Mountain Image Section */}
        <div className="mountain-image-wrapper">
          <div className="mountain-image-container">
            <img 
              src={mountain.image || '/images/placeholder.jpg'} 
              alt={`${mountain.name} mountain view`}
              className="mountain-detail-img"
              loading="lazy"
            />
            <div className="image-overlay">
              <div className="mountain-badges">
                <span className={getDifficultyBadgeClass(mountain.effort)}>
                  <i className="bi bi-speedometer me-1"></i>
                  {mountain.effort}
                </span>
                <span className="badge bg-dark bg-opacity-75">
                  <i className="bi bi-hash me-1"></i>
                  #{elevationRank} by elevation
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Mountain Information */}
        <div className="card-body mountain-info-body">
          {/* Header */}
          <div className="mountain-header mb-4">
            <h2 className="mountain-title">{mountain.name}</h2>
            <div className="mountain-subtitle">
              <span className="elevation-highlight">
                {mountain.elevation.toLocaleString()} feet
              </span>
              <span className="ranking-info text-muted">
                • Ranked #{elevationRank} of {totalMountains} peaks
              </span>
            </div>
          </div>

          {/* Key Stats Grid */}
          <div className="mountain-stats-grid mb-4">
            <div className="row g-3">
              <div className="col-md-6">
                <div className="stat-card elevation-stat">
                  <div className="stat-icon">
                    <i className="bi bi-arrow-up"></i>
                  </div>
                  <div className="stat-content">
                    <h4 className="stat-value">{mountain.elevation.toLocaleString()}'</h4>
                    <p className="stat-label">Elevation</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="stat-card difficulty-stat">
                  <div className="stat-icon">
                    <i className="bi bi-speedometer"></i>
                  </div>
                  <div className="stat-content">
                    <h4 className="stat-value">{mountain.effort}</h4>
                    <p className="stat-label">Difficulty</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="stat-card coordinates-stat">
                  <div className="stat-icon">
                    <i className="bi bi-geo-alt"></i>
                  </div>
                  <div className="stat-content">
                    <h4 className="stat-value coordinates-text">
                      {formatCoordinates(mountain.coords.lat, mountain.coords.lng)}
                    </h4>
                    <p className="stat-label">GPS Coordinates</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="stat-card ranking-stat">
                  <div className="stat-icon">
                    <i className="bi bi-trophy"></i>
                  </div>
                  <div className="stat-content">
                    <h4 className="stat-value">#{elevationRank}</h4>
                    <p className="stat-label">Height Ranking</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mountain-description mb-4">
            <h5 className="section-title">
              <i className="bi bi-info-circle me-2"></i>
              About This Mountain
            </h5>
            <p className="description-text">{mountain.desc}</p>
          </div>

          {/* Action Buttons */}
          <div className="mountain-actions">
            <div className="row g-2">
              <div className="col-md-6">
                <button 
                  className="btn btn-primary w-100"
                  onClick={() => {
                    const googleMapsUrl = `https://www.google.com/maps?q=${mountain.coords.lat},${mountain.coords.lng}`;
                    window.open(googleMapsUrl, '_blank', 'noopener,noreferrer');
                  }}
                  aria-label={`View ${mountain.name} on Google Maps`}
                >
                  <i className="bi bi-map me-2"></i>
                  View on Google Maps
                </button>
              </div>
              <div className="col-md-6">
                <button 
                  className="btn btn-outline-primary w-100"
                  onClick={() => {
                    const coords = `${mountain.coords.lat},${mountain.coords.lng}`;
                    navigator.clipboard?.writeText(coords);
                    // Could add a toast notification here
                  }}
                  aria-label={`Copy coordinates for ${mountain.name}`}
                >
                  <i className="bi bi-clipboard me-2"></i>
                  Copy Coordinates
                </button>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="additional-info mt-4">
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Peak Index:</span>
                <span className="info-value">#{mountainIndex + 1} of {totalMountains}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Elevation Rank:</span>
                <span className="info-value">#{elevationRank} highest</span>
              </div>
              <div className="info-item">
                <span className="info-label">Trail Difficulty:</span>
                <span className="info-value">{mountain.effort}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

MountainDetail.displayName = 'MountainDetail';

export default MountainDetail;