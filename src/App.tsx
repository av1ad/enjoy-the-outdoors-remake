import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import LoadingSpinner from './components/shared/LoadingSpinner';
import ErrorBoundary from './components/shared/ErrorBoundary';

// Lazy load components for better performance
const HomePage = lazy(() => import('./components/HomePage/HomePage'));
const NationalParksPage = lazy(() => import('./components/NationalParksPage/NationalParksPage'));
const MountainsPage = lazy(() => import('./components/MountainsPage/MountainsPage'));

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Router>
        <div className="app">
          <Navigation />
          <main className="main-content">
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/national-parks" element={<NationalParksPage />} />
                <Route path="/mountains" element={<MountainsPage />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </Router>
    </ErrorBoundary>
  );
};

export default App;