import React, { memo } from 'react';

const Footer: React.FC = memo(() => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer bg-dark text-light py-4 mt-auto">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5>🏔️ Greater Outdoors</h5>
            <p className="mb-0">Discover amazing national parks and mountains across the country.</p>
          </div>
          <div className="col-md-6 text-md-end">
            <div className="footer-links mb-2">
              <a href="mailto:aviadchuraman@gmail.com" className="text-light text-decoration-none">Contact</a>
            </div>
            <small className="text-white">
              © {currentYear} Aviad Churaman. All rights reserved.
            </small>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;