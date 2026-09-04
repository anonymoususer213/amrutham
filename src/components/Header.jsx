import React from 'react';
import './Header.css';

export default function Header() {
  const navItems = [
    { label: 'PRODUCT', href: '#products' },
    { label: 'ABOUT US', href: '#about' },
    { label: 'CONTACT', href: '#contact' },
  ];

  return (
    <header className="site-header">
      <div className="header-container">
        {/* Logo */}
        <a href="/" className="logo-link" aria-label="Amrutham Home">
          <img 
            src="/assets/amrutham-logo.png" 
            alt="AMRUTHAM" 
            className="logo-img" 
          />
        </a>

        {/* Navigation */}
        <nav className="nav-menu" aria-label="Main Navigation">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="nav-pill-btn"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
