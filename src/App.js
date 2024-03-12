import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage/HomePage';
import NationalParksPage from './components/NationalParksPage/NationalParksPage';
import MountainsPage from './components/MountainsPage/MountainsPage';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <Navigation />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/national-parks" element={<NationalParksPage />} />
          <Route path="/mountains" element={<MountainsPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;