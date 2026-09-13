import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import SectionDivider from './components/SectionDivider';
import ProductCarousel from './components/ProductCarousel';
import ProductDetail from './components/ProductDetail';
import OurStory from './components/OurStory';
import NourishGrains from './components/NourishGrains';
import Footer from './components/Footer';
import { PRODUCTS } from './data/products';
import './App.css';

const CAROUSEL_PRODUCTS = [
  {
    id: 'sambar-podi',
    name: 'SAMBAR PODI',
    image: '/assets/hero-spices.jpg',
    alt: 'Amrutham Traditional Sambar Podi'
  },
  {
    id: 'traditional-health-mix',
    name: 'TRADITIONAL HEALTH MIX',
    image: '/assets/product-health-mix.png',
    alt: 'Amrutham Traditional Health Mix Sathu Maavu'
  },
  {
    id: 'black-urad-dal-powder',
    name: 'BLACK URAD DAL POWDER',
    image: '/assets/product-black-urad.png',
    alt: 'Amrutham Black Urad Dal Kanji Powder'
  },
  {
    id: 'rasam-powder',
    name: 'AROMATIC RASAM POWDER',
    image: '/assets/our-story-masala.jpg',
    alt: 'Amrutham Aromatic Rasam Podi'
  },
  {
    id: 'idli-milagai-podi',
    name: 'IDLI MILAGAI PODI',
    image: '/assets/hero-spices.jpg',
    alt: 'Amrutham Crunchy Idli Gunpowder'
  }
];

export default function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'product-detail'
  const [selectedProductId, setSelectedProductId] = useState('sambar-podi');

  // Handle URL hash routing (e.g. #product/sambar-podi or #products-page)
  const handleHashChange = useCallback(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#product/')) {
      const pId = hash.replace('#product/', '').trim();
      if (pId) {
        setSelectedProductId(pId);
        setCurrentView('product-detail');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
    }
    if (hash === '#products-page' || hash === '#all-products') {
      setCurrentView('product-detail');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    // Otherwise on regular anchor or home
    if (currentView === 'product-detail' && (hash === '' || hash === '#hero' || hash === '#home')) {
      setCurrentView('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentView]);

  useEffect(() => {
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, [handleHashChange]);

  // Scroll smoothly to target section on homepage
  const scrollToSection = (sectionId) => {
    if (currentView === 'product-detail') {
      setCurrentView('home');
      window.location.hash = `#${sectionId}`;
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 60);
    } else {
      window.location.hash = `#${sectionId}`;
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Navigate to Dedicated Product Detail Page
  const openProductPage = (productId = 'sambar-podi') => {
    setSelectedProductId(productId);
    setCurrentView('product-detail');
    window.location.hash = `#product/${productId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Return to pristine Homepage
  const openHomePage = () => {
    setCurrentView('home');
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* ══════════════════════════════════════════════════════════════════
     VIEW 2: DEDICATED PRODUCT DETAIL PAGE (Opened as a separate page)
     ══════════════════════════════════════════════════════════════════ */
  if (currentView === 'product-detail') {
    return (
      <div className="app-container">
        <ProductDetail 
          productId={selectedProductId}
          onSelectProduct={(pId) => {
            setSelectedProductId(pId);
            window.location.hash = `#product/${pId}`;
          }}
          onBackToHome={openHomePage}
        />
        <Footer />
      </div>
    );
  }

  /* ══════════════════════════════════════════════════════════════════
     VIEW 1: PRISTINE ORIGINAL HOMEPAGE (Completely undisturbed design)
     ══════════════════════════════════════════════════════════════════ */
  return (
    <div className="app-container">
      {/* 1. Full-Screen Hero Section */}
      <section className="section-hero" id="hero">
        <Header onNavigate={(dest) => {
          if (dest === 'home') {
            openHomePage();
          } else if (dest === 'products') {
            scrollToSection('products');
          } else if (dest === 'story') {
            scrollToSection('story');
          } else if (dest === 'contact') {
            scrollToSection('contact');
          }
        }} />

        <main className="hero-section">
          <div className="hero-container">
            <div className="hero-content">
              <h1 className="hero-headline">
                The taste of<br />
                tradition in<br />
                every spoon.
              </h1>
              <div className="hero-actions">
                <button 
                  type="button" 
                  onClick={() => scrollToSection('products')}
                  className="hero-cta-btn"
                >
                  OUR PRODUCTS
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* Right Side Backdrop */}
        <div className="backdrop-container" aria-hidden="true">
          <img
            src="/assets/hero-spices-bg.png"
            alt=""
            className="backdrop-image"
          />
        </div>
      </section>

      {/* 2. Decorative Dark Navy Marquee Divider */}
      <SectionDivider />

      {/* 3. Full-Screen Clean Warm White Section (Product Carousel Showcase) */}
      <section className="section-clean-white" id="products">
        <div className="section-container">
          <h2 className="section-title">
            Made for Every Kitchen
          </h2>

          {/* Premium Reference Carousel Interaction */}
          <ProductCarousel 
            products={CAROUSEL_PRODUCTS} 
            initialIndex={0} 
            onSelectProduct={(id) => openProductPage(id)}
          />
        </div>
      </section>

      {/* 4. Full-Width Organic Wavy Transition Divider */}
      <div className="wave-transition-divider" aria-hidden="true">
        <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path
            d="M0,0 L1440,0 L1440,20 C1410,38 1380,2 1350,20 C1320,38 1290,2 1260,20 C1230,38 1200,2 1170,20 C1140,38 1110,2 1080,20 C1050,38 1020,2 1020,20 C960,38 930,2 900,20 C870,38 840,2 810,20 C780,38 750,2 720,20 C690,38 660,2 630,20 C600,38 570,2 540,20 C510,38 480,2 450,20 C420,38 390,2 360,20 C330,38 300,2 270,20 C240,38 210,2 180,20 C150,38 120,2 90,20 C60,38 30,2 0,20 Z"
            fill="#FEF7E9"
          />
        </svg>
      </div>

      {/* 5. Full-Screen Our Story / Brand Philosophy Section */}
      <OurStory />

      {/* 6. Full-Width Organic Wavy Transition Divider */}
      <div className="wave-transition-divider-bottom" aria-hidden="true">
        <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path
            d="M0,0 L1440,0 L1440,20 C1410,38 1380,2 1350,20 C1320,38 1290,2 1260,20 C1230,38 1200,2 1170,20 C1140,38 1110,2 1080,20 C1050,38 1020,2 1020,20 C960,38 930,2 900,20 C870,38 840,2 810,20 C780,38 750,2 720,20 C690,38 660,2 630,20 C600,38 570,2 540,20 C510,38 480,2 450,20 C420,38 390,2 360,20 C330,38 300,2 270,20 C240,38 210,2 180,20 C150,38 120,2 90,20 C60,38 30,2 0,20 Z"
            fill="#F4E7D9"
          />
        </svg>
      </div>

      {/* 7. Full-Screen Traditional Grains Nutrition Section */}
      <NourishGrains onSelectHealthMix={() => openProductPage('traditional-health-mix')} />

      {/* 8. Premium Footer with Botanical Wave */}
      <Footer />
    </div>
  );
}
