import React, { useState, useRef, useCallback, useEffect } from 'react';
import './ProductCarousel.css';

export default function ProductCarousel({ 
  products = [], 
  initialIndex = 1,
  onSelectProduct
}) {
  const [activeIndex, setActiveIndex] = useState(
    Math.min(Math.max(0, initialIndex), Math.max(0, products.length - 1))
  );

  // Synchronize initialIndex if products change
  useEffect(() => {
    if (activeIndex >= products.length && products.length > 0) {
      setActiveIndex(Math.floor(products.length / 2));
    }
  }, [products.length, activeIndex]);

  // Touch / Swipe state for Mobile
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const goToSlide = useCallback((index) => {
    if (index >= 0 && index < products.length) {
      setActiveIndex(index);
    }
  }, [products.length]);

  const handleProductCardClick = (product, idx) => {
    goToSlide(idx);
    if (onSelectProduct && product.id) {
      onSelectProduct(product.id);
      const detailEl = document.getElementById('product-detail');
      if (detailEl) {
        detailEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : products.length - 1));
  }, [products.length]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev < products.length - 1 ? prev + 1 : 0));
  }, [products.length]);

  // Keyboard navigation (WCAG accessibility)
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    }
  };

  // Touch gestures for mobile drag/swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 45;
    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) {
        handleNext(); // Swiped Left -> Move to Next
      } else {
        handlePrev(); // Swiped Right -> Move to Prev
      }
    }
  };

  if (!products || products.length === 0) return null;

  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div
      className="premium-carousel-wrapper"
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Made for Every Kitchen Product Showcase"
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {/* 3-Visible Item Stage with Center Focus */}
      <div className="carousel-stage">
        <div
          className="carousel-track"
          style={{
            '--active-index': activeIndex,
          }}
        >
          {products.map((product, idx) => {
            const isActive = idx === activeIndex;
            const isCardHovered = idx === hoveredIndex;

            return (
              <div
                key={product.id || `carousel-prod-${idx}`}
                className={`carousel-item ${isActive ? 'is-active' : 'is-inactive'} ${isCardHovered ? 'is-hovered' : ''}`}
                onMouseEnter={() => {
                  goToSlide(idx);
                  setHoveredIndex(idx);
                }}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handleProductCardClick(product, idx)}
                role="group"
                aria-roledescription="slide"
                aria-label={`${idx + 1} of ${products.length}: ${product.name}`}
                aria-current={isActive ? 'true' : 'false'}
              >
                {/* 2. Rounded Beige Background Panel (Appears on Hover, disappears when cursor leaves) */}
                <div className="card-panel-backdrop" aria-hidden="true">
                  {/* Subtle traditional wheat botanical motif watermark */}
                  <div className="backdrop-wheat-icon">
                    <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M50 10 C50 10 58 22 50 34 C42 22 50 10 50 10Z M38 26 C38 26 48 34 44 48 C34 44 26 34 38 26Z M62 26 C62 26 74 34 66 48 C56 44 62 26 62 26Z M34 48 C34 48 46 54 40 70 C28 66 22 56 34 48Z M66 48 C66 48 78 56 72 70 C60 66 66 48 66 48Z M36 74 C36 74 46 80 42 96 C30 92 26 82 36 74Z M64 74 C64 74 74 82 70 96 C58 92 64 74 64 74Z M49 32 L49 115"
                        stroke="rgba(215, 195, 175, 0.45)"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>

                {/* 3. Floating Product Visual */}
                <div className="product-visual-wrapper">
                  <img
                    src={product.image}
                    alt={product.alt || product.name}
                    className="product-floating-image"
                    loading="lazy"
                    draggable="false"
                  />
                </div>

                {/* Product Name (Centered, wraps up to two lines) */}
                <div className="product-title-box">
                  <h3 className="carousel-product-title">{product.name}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Small Carousel Pagination Indicators */}
      <div className="carousel-pagination" role="tablist" aria-label="Select product slide">
        {products.map((product, idx) => (
          <button
            key={`dot-${product.id || idx}`}
            type="button"
            role="tab"
            aria-selected={idx === activeIndex}
            className={`carousel-dot ${idx === activeIndex ? 'is-active' : ''}`}
            onClick={() => goToSlide(idx)}
            aria-label={`Go to ${product.name}`}
          />
        ))}
      </div>
    </div>
  );
}
