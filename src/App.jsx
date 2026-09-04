import React from 'react';
import Header from './components/Header';
import SectionDivider from './components/SectionDivider';
import './App.css';

const PRODUCTS = [
  {
    id: 'health-mix-1',
    name: 'Health Mix Powder',
    image: '/assets/product-health-mix.png',
    alt: 'Amrutham Health Mix Powder'
  },
  {
    id: 'black-urad-dal-1',
    name: 'Black Urad Dal Powder',
    image: '/assets/product-black-urad.png',
    alt: 'Amrutham Black Urad Dal Powder'
  },
  {
    id: 'health-mix-2',
    name: 'Health Mix Powder',
    image: '/assets/product-health-mix.png',
    alt: 'Amrutham Health Mix Powder'
  },
  {
    id: 'black-urad-dal-2',
    name: 'Black Urad Dal Powder',
    image: '/assets/product-black-urad.png',
    alt: 'Amrutham Black Urad Dal Powder'
  }
];

export default function App() {
  const scrollRef = React.useRef(null);
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const [canScroll, setCanScroll] = React.useState(false);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll > 0) {
        setScrollProgress(scrollLeft / maxScroll);
        setCanScroll(true);
      } else {
        setCanScroll(false);
      }
    }
  };

  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    handleScroll();
    el.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      el.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [PRODUCTS.length]);

  const scrollToPill = (index) => {
    if (scrollRef.current) {
      const { scrollWidth, clientWidth } = scrollRef.current;
      const maxScroll = scrollWidth - clientWidth;
      const totalPills = PRODUCTS.length;
      if (totalPills > 1 && maxScroll > 0) {
        const targetScroll = (index / (totalPills - 1)) * maxScroll;
        scrollRef.current.scrollTo({ left: targetScroll, behavior: 'smooth' });
      }
    }
  };

  // Calculate which pill is currently active based on scroll progress
  const activePillIndex = Math.min(
    PRODUCTS.length - 1,
    Math.round(scrollProgress * (PRODUCTS.length - 1))
  );

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

      {/* 3. Full-Screen Clean Warm White Section */}
      <section className="section-clean-white" id="products">
        <div className="section-container">
          <h2 className="section-title">
            Made for Every Kitchen
          </h2>

          <div className="product-grid-wrapper" ref={scrollRef}>
            <div className="product-grid">
              {PRODUCTS.map((product) => (
                <article key={product.id} className="product-column">
                  <div className="product-image-container">
                    <img
                      src={product.image}
                      alt={product.alt}
                      className="product-image"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="product-name">{product.name}</h3>
                </article>
              ))}
            </div>
          </div>

          {/* Pill-shaped horizontal scroll motion indicator */}
          {canScroll && PRODUCTS.length > 1 && (
            <div className="scroll-indicator-bar" aria-label="Product scroll position">
              {PRODUCTS.map((product, idx) => (
                <button
                  key={`pill-${product.id}-${idx}`}
                  type="button"
                  className={`scroll-pill ${idx === activePillIndex ? 'active' : ''}`}
                  onClick={() => scrollToPill(idx)}
                  aria-label={`Go to product ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
