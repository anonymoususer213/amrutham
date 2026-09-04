import React from 'react';
import Header from './components/Header';
import './App.css';

export default function App() {
  return (
    <div className="app-container">
      <Header />
      
      {/* Right Side Backdrop */}
      <div className="backdrop-container" aria-hidden="true">
        <img 
          src="/assets/hero-spices-bg.png" 
          alt="" 
          className="backdrop-image"
        />
      </div>
    </div>
  );
}
