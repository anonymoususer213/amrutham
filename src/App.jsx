import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Header from './components/Header';
import SectionDivider from './components/SectionDivider';
import ProductCarousel from './components/ProductCarousel';
import ProductDetail from './components/ProductDetail';
import OurStory from './components/OurStory';
import NourishGrains from './components/NourishGrains';
import Footer from './components/Footer';
import ContactPage from './components/ContactPage';
import CartPanel from './components/CartPanel';
import { CartProvider } from './context/CartContext';
import { PRODUCTS } from './data/products';
import './App.css';

const CAROUSEL_PRODUCTS = [
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
  }
];

function AppInner() {
  const [currentView, setCurrentView] = useState(() => {
    // Initial view based on pathname or hash
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname;
      const hash = window.location.hash;
      if (pathname === '/contact' || pathname.startsWith('/contact') || hash === '#contact') {
        return 'contact';
      }
      if (hash.startsWith('#product/') || hash === '#products-page' || hash === '#all-products') {
        return 'product-detail';
      }
    }
    return 'home';
  });

  const [selectedProductId, setSelectedProductId] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash.startsWith('#product/')) {
        const rawId = hash.replace('#product/', '').trim();
        const found = PRODUCTS.find(p => p.id === rawId);
        if (found) return found.id;
      }
    }
    return 'traditional-health-mix';
  });

  // Known product IDs for validation (allowlist)
  const validProductIds = useMemo(() => PRODUCTS.map(p => p.id), []);

  // Handle URL pathname and hash routing
  const handleLocationChange = useCallback(() => {
    const pathname = window.location.pathname;
    const hash = window.location.hash;

    // 1. Dedicated Contact page route (/contact or #contact)
    if (pathname === '/contact' || pathname.startsWith('/contact') || hash === '#contact') {
      setCurrentView('contact');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // 2. Dedicated Product Detail route (#product/:id)
    if (hash.startsWith('#product/')) {
      const rawId = hash.replace('#product/', '').trim();
      const pId = validProductIds.includes(rawId) ? rawId : validProductIds[0];
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

    // 3. Homepage view
    setCurrentView('home');
    if (hash && hash !== '#hero' && hash !== '#home') {
      const sectionId = hash.replace('#', '');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [validProductIds]);

  useEffect(() => {
    handleLocationChange();
    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, [handleLocationChange]);

  // Navigate to Dedicated Contact Page (/contact)
  const openContactPage = useCallback(() => {
    setCurrentView('contact');
    if (window.location.pathname !== '/contact') {
      window.history.pushState(null, '', '/contact');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Return to pristine Homepage (/)
  const openHomePage = useCallback(() => {
    setCurrentView('home');
    if (window.location.pathname !== '/' || window.location.hash !== '') {
      window.history.pushState(null, '', '/');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Scroll smoothly to target section on homepage
  const scrollToSection = useCallback((sectionId) => {
    if (currentView !== 'home') {
      setCurrentView('home');
      window.history.pushState(null, '', `/#${sectionId}`);
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 80);
    } else {
      window.location.hash = `#${sectionId}`;
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [currentView]);

  // Navigate to Dedicated Product Detail Page
  const openProductPage = useCallback((productId = 'traditional-health-mix') => {
    const safeId = validProductIds.includes(productId) ? productId : validProductIds[0];
    setSelectedProductId(safeId);
    setCurrentView('product-detail');
    if (window.location.pathname !== '/') {
      window.history.pushState(null, '', `/#product/${safeId}`);
    } else {
      window.location.hash = `#product/${safeId}`;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [validProductIds]);

  // Universal Navigation Dispatcher
  const handleNavigate = useCallback((dest) => {
    if (dest === 'home') {
      openHomePage();
    } else if (dest === 'contact') {
      openContactPage();
    } else if (dest === 'products') {
      scrollToSection('products');
    } else if (dest === 'story') {
      scrollToSection('story');
    }
  }, [openHomePage, openContactPage, scrollToSection]);

  /* ══════════════════════════════════════════════════════════════════
     VIEW 3: DEDICATED CONTACT PAGE (/contact)
     ══════════════════════════════════════════════════════════════════ */
  if (currentView === 'contact') {
    return (
      <>
        <div className="app-container contact-view-container">
          <Header 
            currentView="contact"
            onNavigate={handleNavigate}
          />
          <main id="main-content">
            <ContactPage />
          </main>
          <Footer onNavigate={handleNavigate} />
        </div>
        <CartPanel />
      </>
    );
  }

  /* ══════════════════════════════════════════════════════════════════
     VIEW 2: DEDICATED PRODUCT DETAIL PAGE (#product/:id)
     ══════════════════════════════════════════════════════════════════ */
  if (currentView === 'product-detail') {
    return (
      <>
        <div className="app-container">
          <ProductDetail 
            productId={selectedProductId}
            onSelectProduct={(pId) => {
              const safeId = validProductIds.includes(pId) ? pId : validProductIds[0];
              setSelectedProductId(safeId);
              window.location.hash = `#product/${safeId}`;
            }}
            onBackToHome={openHomePage}
          />
          <Footer onNavigate={handleNavigate} />
        </div>
        <CartPanel />
      </>
    );
  }

  /* ══════════════════════════════════════════════════════════════════
     VIEW 1: PRISTINE ORIGINAL HOMEPAGE
     ══════════════════════════════════════════════════════════════════ */
  return (
    <>
      <div className="app-container">
        {/* 1. Full-Screen Hero Section */}
        <section className="section-hero" id="hero">
          <Header 
            currentView="home"
            onNavigate={handleNavigate}
          />

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
              d="M0,0 L1440,0 L1440,20 C1410,38 1380,2 1350,20 C1320,38 1290,2 1260,20 C1230,38 1200,2 1170,20 C1050,38 1020,2 1020,20 C960,38 930,2 900,20 C870,38 840,2 810,20 C780,38 750,2 720,20 C690,38 660,2 630,20 C600,38 570,2 540,20 C510,38 480,2 450,20 C420,38 390,2 360,20 C330,38 300,2 270,20 C240,38 210,2 180,20 C150,38 120,2 90,20 C60,38 30,2 0,20 Z"
              fill="#F4E7D9"
            />
          </svg>
        </div>

        {/* 7. Full-Screen Traditional Grains Nutrition Section */}
        <NourishGrains onSelectHealthMix={() => openProductPage('traditional-health-mix')} />

        {/* 8. Premium Footer with Botanical Wave */}
        <Footer onNavigate={handleNavigate} />
      </div>

      {/* Global Cart Panel (overlays all views) */}
      <CartPanel />
    </>
  );
}

/* ── Root export: wraps AppInner with the CartProvider ── */
export default function App() {
  return (
    <CartProvider>
      <AppInner />
    </CartProvider>
  );
}
