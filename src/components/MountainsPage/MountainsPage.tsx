import React, { useState, useEffect, useMemo, useCallback } from 'react';
import MountainSelect from './MountainSelect';
import MountainDetail from './MountainDetail';
import LoadingSpinner from '../shared/LoadingSpinner';
import mountainsData from '../../data/mountainsData';
import { Mountain } from '../../types';
import { preloadImages } from '../../utils/imageLoader';
import './MountainsPage.css';

const MountainsPage: React.FC = () => {
  const [selectedMountain, setSelectedMountain] = useState<Mountain | null>(null);
  const [imageMap, setImageMap] = useState<Record<string, string>>({});
  const [isLoadingImages, setIsLoadingImages] = useState(false);

  // Extract all unique image names for preloading
  const imageNames = useMemo(() => {
    return Array.from(new Set(mountainsData.map(mountain => mountain.img)));
  }, []);

  // Get highest mountain for stats
  const highestMountain = useMemo(() => {
    return mountainsData.reduce((highest, current) => 
      current.elevation > highest.elevation ? current : highest
    );
  }, []);

  // Preload images on component mount
  useEffect(() => {
    const loadImages = async () => {
      setIsLoadingImages(true);
      try {
        const loadedImages = await preloadImages(imageNames);
        setImageMap(loadedImages);
      } catch (error) {
        console.error('Failed to preload images:', error);
      } finally {
        setIsLoadingImages(false);
      }
    };

    loadImages();
  }, [imageNames]);

  const handleMountainSelect = useCallback((mountain: Mountain) => {
    const mountainWithImage = {
      ...mountain,
      image: imageMap[mountain.img] || '/images/placeholder.jpg'
    };
    setSelectedMountain(mountainWithImage);
  }, [imageMap]);

  if (isLoadingImages) {
    return <LoadingSpinner text="Loading mountain data..." />;
  }

  return (
    <div className="mountains-page">
      {/* Hero Section */}
      <section className="mountains-hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <div className="row align-items-center min-vh-50">
            <div className="col-lg-8 mx-auto text-center hero-content">
              <h1 className="display-3 fw-bold mb-4">
                America's <span className="text-outdoor-primary">Majestic Peaks</span>
              </h1>
              <p className="lead mb-4">
                Explore {mountainsData.length} spectacular mountains across the United States. 
                From the towering heights of Mt. Washington to hidden alpine gems, 
                discover detailed trail information, elevation data, and stunning photography.
              </p>
              <div className="hero-stats">
                <div className="row text-center">
                  <div className="col-md-4 mb-3">
                    <div className="stat-card">
                      <h3 className="display-5 fw-bold text-outdoor-primary">{mountainsData.length}</h3>
                      <p className="mb-0">Mountain Peaks</p>
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <div className="stat-card">
                      <h3 className="display-5 fw-bold text-outdoor-primary">{highestMountain.elevation.toLocaleString()}'</h3>
                      <p className="mb-0">Highest Peak</p>
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <div className="stat-card">
                      <h3 className="display-5 fw-bold text-outdoor-primary">48</h3>
                      <p className="mb-0">4000+ Footers</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mountains-content py-5">
        <div className="container">
          <div className="row">
            {/* Mountain Selection Sidebar */}
            <div className="col-lg-4 mb-4">
              <div className="selection-panel">
                <div className="card mountain-selector-card shadow-lg border-0">
                  <div className="card-header bg-outdoor-gradient">
                    <h3 className="card-title mb-0 text-white">
                      <i className="bi bi-mountain me-2"></i>
                      Select a Mountain
                    </h3>
                  </div>
                  <div className="card-body">
                    <MountainSelect 
                      mountainsData={mountainsData} 
                      onMountainSelect={handleMountainSelect}
                      selectedMountain={selectedMountain}
                    />
                    
                    {selectedMountain && (
                      <div className="selected-mountain-preview mt-4">
                        <div className="preview-header">
                          <h5 className="text-outdoor-primary mb-2">{selectedMountain.name}</h5>
                          <div className="preview-stats">
                            <span className="badge bg-secondary me-2">
                              <i className="bi bi-arrow-up me-1"></i>
                              {selectedMountain.elevation.toLocaleString()}'
                            </span>
                            <span className={`badge ${
                              selectedMountain.effort === 'Strenuous' ? 'bg-danger' : 
                              selectedMountain.effort === 'Moderate' ? 'bg-warning' : 'bg-success'
                            }`}>
                              {selectedMountain.effort}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="quick-stats mt-4">
                  <h5 className="text-white mb-3">Mountain Quick Facts</h5>
                  <div className="stat-list">
                    <div className="stat-item-small">
                      <span className="stat-label">Total Mountains:</span>
                      <span className="stat-value">{mountainsData.length}</span>
                    </div>
                    <div className="stat-item-small">
                      <span className="stat-label">Highest Peak:</span>
                      <span className="stat-value">{highestMountain.name}</span>
                    </div>
                    <div className="stat-item-small">
                      <span className="stat-label">Elevation Range:</span>
                      <span className="stat-value">
                        {Math.min(...mountainsData.map(m => m.elevation)).toLocaleString()}' - {highestMountain.elevation.toLocaleString()}'
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mountain Detail Main Area */}
            <div className="col-lg-8">
              {selectedMountain ? (
                <div className="mountain-detail-wrapper">
                  <MountainDetail mountain={selectedMountain} />
                </div>
              ) : (
                <div className="no-selection-state">
                  <div className="card border-0 bg-transparent">
                    <div className="card-body text-center py-5">
                      <div className="no-selection-icon mb-4">
                        <i className="bi bi-mountain display-1 text-muted"></i>
                      </div>
                      <h3 className="text-white mb-3">Choose Your Adventure</h3>
                      <p className="text-muted lead mb-4">
                        Select a mountain from the panel on the left to view detailed information, 
                        including elevation data, difficulty rating, coordinates, and stunning photography.
                      </p>
                      <div className="feature-highlights">
                        <div className="row">
                          <div className="col-md-6 mb-3">
                            <div className="feature-item">
                              <i className="bi bi-camera text-outdoor-primary fs-3 mb-2"></i>
                              <h6 className="text-white">High-Quality Photos</h6>
                              <small className="text-muted">Professional mountain photography</small>
                            </div>
                          </div>
                          <div className="col-md-6 mb-3">
                            <div className="feature-item">
                              <i className="bi bi-geo-alt text-outdoor-primary fs-3 mb-2"></i>
                              <h6 className="text-white">GPS Coordinates</h6>
                              <small className="text-muted">Precise location data</small>
                            </div>
                          </div>
                          <div className="col-md-6 mb-3">
                            <div className="feature-item">
                              <i className="bi bi-graph-up text-outdoor-primary fs-3 mb-2"></i>
                              <h6 className="text-white">Elevation Data</h6>
                              <small className="text-muted">Accurate height measurements</small>
                            </div>
                          </div>
                          <div className="col-md-6 mb-3">
                            <div className="feature-item">
                              <i className="bi bi-speedometer text-outdoor-primary fs-3 mb-2"></i>
                              <h6 className="text-white">Difficulty Ratings</h6>
                              <small className="text-muted">Trail difficulty assessments</small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MountainsPage;