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
              <a href="#" className="text-light text-decoration-none me-3">Privacy Policy</a>
              <a href="#" className="text-light text-decoration-none me-3">Terms of Service</a>
              <a href="#" className="text-light text-decoration-none">Contact</a>
            </div>
            <small className="text-muted">
              © {currentYear} Greater Outdoors. All rights reserved.
            </small>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;