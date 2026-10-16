import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import './Header.css';

export default function Header({ onNavigate, currentView = 'home' }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItemCount, toggleCart } = useCart();

  const navItems = [
    { label: 'PRODUCTS', href: '#products', action: 'products' },
    { label: 'ABOUT US', href: '#story', action: 'story' },
    { label: 'CONTACT', href: '/contact', action: 'contact' },
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

  const handleCartClick = () => {
    setIsMobileMenuOpen(false);
    toggleCart();
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
            src="/assets/amrutham-logo-transparent.png" 
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
              className={`nav-pill-btn ${currentView === item.action ? 'is-active' : ''}`}
              aria-current={currentView === item.action ? 'page' : undefined}
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

          {/* Cart Icon Button — Desktop */}
          <button
            type="button"
            className="cart-icon-btn"
            onClick={handleCartClick}
            aria-label={`Open cart${totalItemCount > 0 ? `, ${totalItemCount} items` : ''}`}
            aria-controls="cart-panel"
          >
            <svg
              className="cart-icon-svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {totalItemCount > 0 && (
              <span className="cart-badge" aria-hidden="true">
                {totalItemCount > 99 ? '99+' : totalItemCount}
              </span>
            )}
          </button>
        </nav>

        {/* Mobile Right Controls: Cart Icon + Hamburger */}
        <div className="mobile-header-right">
          {/* Cart Icon Button — Mobile */}
          <button
            type="button"
            className="cart-icon-btn mobile-cart-btn"
            onClick={handleCartClick}
            aria-label={`Open cart${totalItemCount > 0 ? `, ${totalItemCount} items` : ''}`}
            aria-controls="cart-panel"
          >
            <svg
              className="cart-icon-svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {totalItemCount > 0 && (
              <span className="cart-badge" aria-hidden="true">
                {totalItemCount > 99 ? '99+' : totalItemCount}
              </span>
            )}
          </button>

          {/* Hamburger */}
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
              className={`mobile-nav-item ${currentView === item.action ? 'is-active' : ''}`}
              aria-current={currentView === item.action ? 'page' : undefined}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(item);
              }}
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
