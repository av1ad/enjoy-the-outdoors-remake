import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import NationalParkImage from '../../images/nationalpark.webp';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  link: string;
  linkText: string;
}

const FeatureCard: React.FC<FeatureCardProps> = memo(({ 
  icon, 
  title, 
  description, 
  link, 
  linkText 
}) => (
  <div className="col-md-6 col-lg-4 mb-4">
    <div className="card h-100 shadow-sm border-0 feature-card">
      <div className="card-body text-center">
        <div className="feature-icon mb-3">
          <span className="feature-emoji display-4" aria-hidden="true">{icon}</span>
        </div>
        <h3 className="card-title h5">{title}</h3>
        <p className="card-text text-muted">{description}</p>
        <Link to={link} className="btn btn-outline-primary">
          {linkText} →
        </Link>
      </div>
    </div>
  </div>
));

FeatureCard.displayName = 'FeatureCard';

const HomePage: React.FC = memo(() => {
  const features: FeatureCardProps[] = [
    {
      icon: '🌲',
      title: 'National Parks',
      description: 'Discover amazing national parks across the country with detailed search and filtering options.',
      link: '/national-parks',
      linkText: 'Explore Parks'
    },
    {
      icon: '🏔️',
      title: 'Mountain Information',
      description: 'Get detailed information about America\'s most spectacular peaks and hiking trails.',
      link: '/mountains',
      linkText: 'View Mountains'
    }
  ];

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center min-vh-75">
            <div className="col-lg-6">
              <div className="hero-content">
                <h1 className="display-3 fw-bold mb-4">
                  🏔️ Discover the <span className="text-primary">Great Outdoors</span> 🌲
                </h1>
                <p className="lead mb-4">
                  Your comprehensive guide to exploring national parks and mountains 
                  across the United States. Find detailed information, stunning imagery, 
                  and everything you need for your next outdoor adventure.
                </p>
                <div className="hero-cta">
                  <Link to="/national-parks" className="btn btn-primary btn-lg me-3 mb-2">
                    🔍 Find Parks
                  </Link>
                  <Link to="/mountains" className="btn btn-outline-primary btn-lg mb-2">
                    🗻 Explore Mountains
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="hero-image">
                <img
                  src={NationalParkImage}
                  alt="Beautiful mountain landscape with trees and peaks"
                  className="img-fluid rounded-3 shadow-lg"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section py-5 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center mb-5">
              <h2 className="display-5 fw-semibold">What You Can Discover</h2>
              <p className="lead text-muted">
                Explore our comprehensive database of outdoor destinations
              </p>
            </div>
          </div>
          <div className="row justify-content-center">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="stats-section py-5">
        <div className="container">
          <div className="row text-center">
            <div className="col-md-4 mb-4">
              <div className="stat-item">
                <h3 className="display-4 fw-bold text-primary">63</h3>
                <p className="lead">National Parks</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="stat-item">
                <h3 className="display-4 fw-bold text-success">48</h3>
                <p className="lead">Mountain Peaks</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="stat-item">
                <h3 className="display-4 fw-bold text-info">∞</h3>
                <p className="lead">Adventures Await</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

HomePage.displayName = 'HomePage';

export default HomePage;