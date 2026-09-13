import React, { useState, useEffect } from 'react';
import './Header.css';

export default function Header({ onNavigate }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'PRODUCTS', href: '#products', action: 'products' },
    { label: 'ABOUT US', href: '#story', action: 'story' },
    { label: 'CONTACT', href: '#contact', action: 'contact' },
  ];

  // Close mobile menu on resize or Esc key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    const handleResize = () => {
      if (window.innerWidth > 768) setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleLinkClick = (item) => {
    setIsMobileMenuOpen(false);
    if (onNavigate && item.action) {
      onNavigate(item.action);
    }
  };

  return (
    <header className="site-header">
      <div className="header-container">
        {/* Logo */}
        <a 
          href="/" 
          className="logo-link" 
          aria-label="Amrutham Home"
          onClick={(e) => {
            if (onNavigate) {
              e.preventDefault();
              onNavigate('home');
            }
          }}
        >
          <img 
            src="/assets/amrutham-logo.png" 
            alt="AMRUTHAM" 
            className="logo-img" 
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="nav-menu desktop-only" aria-label="Main Navigation">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="nav-pill-btn"
              onClick={(e) => {
                if (onNavigate && item.action) {
                  e.preventDefault();
                  onNavigate(item.action);
                }
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          className={`mobile-menu-toggle ${isMobileMenuOpen ? 'is-open' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-label={isMobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
        >
          <span className="hamburger-line line-1"></span>
          <span className="hamburger-line line-2"></span>
          <span className="hamburger-line line-3"></span>
        </button>
      </div>

      {/* Mobile Menu Overlay / Drawer */}
      <div 
        className={`mobile-nav-drawer ${isMobileMenuOpen ? 'is-active' : ''}`}
        aria-hidden={!isMobileMenuOpen}
      >
        <nav className="mobile-nav-links" aria-label="Mobile Navigation">
          {navItems.map((item) => (
            <a
              key={`mob-${item.label}`}
              href={item.href}
              className="mobile-nav-item"
              onClick={() => handleLinkClick(item)}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#products"
            className="mobile-nav-cta"
            onClick={() => handleLinkClick({ action: 'products' })}
          >
            EXPLORE PRODUCTS
          </a>
        </nav>
      </div>
    </header>
  );
}
