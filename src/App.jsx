import React from 'react';
import Header from './components/Header';
import SectionDivider from './components/SectionDivider';
import ProductCarousel from './components/ProductCarousel';
import OurStory from './components/OurStory';
import NourishGrains from './components/NourishGrains';
import Footer from './components/Footer';
import './App.css';

const PRODUCTS = [
  {
    id: 'health-mix-powder',
    name: 'HEALTH MIX POWDER',
    image: '/assets/product-health-mix.png',
    alt: 'Amrutham Health Mix Powder'
  },
  {
    id: 'black-urad-dal-powder',
    name: 'BLACK URAD DAL POWDER',
    image: '/assets/product-black-urad.png',
    alt: 'Amrutham Black Urad Dal Powder'
  },
  {
    id: 'traditional-health-mix',
    name: 'TRADITIONAL HEALTH MIX',
    image: '/assets/product-health-mix.png',
    alt: 'Amrutham Traditional Health Mix'
  },
  {
    id: 'pure-urad-flour',
    name: 'PURE BLACK URAD FLOUR',
    image: '/assets/product-black-urad.png',
    alt: 'Amrutham Pure Black Urad Flour'
  },
  {
    id: 'organic-millet-mix',
    name: 'ORGANIC MILLET MIX',
    image: '/assets/product-health-mix.png',
    alt: 'Amrutham Organic Millet Mix'
  }
];

export default function App() {
  return (
    <div className="app-container">
      {/* 1. Full-Screen Hero Section */}
      <section className="section-hero" id="hero">
        <Header />

        <main className="hero-section">
          <div className="hero-container">
            <div className="hero-content">
              <h1 className="hero-headline">
                The taste of<br />
                tradition in<br />
                every spoon.
              </h1>
              <div className="hero-actions">
                <a href="#products" className="hero-cta-btn">
                  OUR PRODUCTS
                </a>
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
          <ProductCarousel products={PRODUCTS} initialIndex={1} />
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
      <NourishGrains />

      {/* 8. Premium Footer */}
      <Footer />
    </div>
  );
}
