import React, { useState, useEffect, useRef, useMemo } from 'react';
import { PRODUCTS, AMRUTHAM_PHONE_RAW } from '../data/products';
import './ProductDetail.css';

export default function ProductDetail({ 
  productId = 'traditional-health-mix', 
  onSelectProduct,
  onBackToHome
}) {
  // Find current product or fallback to first
  const currentProductIndex = useMemo(() => {
    const idx = PRODUCTS.findIndex((p) => p.id === productId);
    return idx !== -1 ? idx : 0;
  }, [productId]);

  const product = PRODUCTS[currentProductIndex];

  // Gallery state
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isImageFading, setIsImageFading] = useState(false);

  // Pack size selection state
  const [selectedPackIndex, setSelectedPackIndex] = useState(0);

  // Quantity selection state
  const [quantity, setQuantity] = useState(1);

  // Accordion state: single active card at a time (defaults to 'ingredients')
  const [activeInfoCard, setActiveInfoCard] = useState('ingredients');

  // "You Might Also Enjoy!" Carousel State
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const relatedProducts = useMemo(() => {
    return PRODUCTS.filter((p) => p.id !== product.id);
  }, [product.id]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640) {
        setVisibleCount(1);
      } else if (window.innerWidth <= 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, relatedProducts.length - visibleCount);

  // Clamp carousel index when maxIndex changes
  useEffect(() => {
    setCarouselIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  const handlePrevSlide = () => {
    setCarouselIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNextSlide = () => {
    setCarouselIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        handleNextSlide();
      } else {
        handlePrevSlide();
      }
    }
  };

  // Parse ingredient chips from string
  const ingredientChips = useMemo(() => {
    const raw = product?.accordions?.find(a => a.id === 'ingredients')?.content || '';
    return raw
      .split(/,\s*|\band\s+/)
      .map(item => item.trim().replace(/\.$/, ''))
      .filter(Boolean);
  }, [product?.accordions]);

  // Nutrition rows
  const nutritionRows = useMemo(() => {
    return product?.accordions?.find(a => a.id === 'nutritional-info')?.table || [];
  }, [product?.accordions]);

  // Reset pack & image state when product changes
  useEffect(() => {
    setSelectedImageIndex(0);
    setSelectedPackIndex(0);
    setQuantity(1);
    setIsImageFading(true);
    const timer = setTimeout(() => setIsImageFading(false), 240);
    return () => clearTimeout(timer);
  }, [product.id]);

  const selectedPack = product.packSizes[selectedPackIndex] || product.packSizes[0];
  const unitPrice = selectedPack.price;
  const totalPrice = unitPrice * quantity;

  // Image switching with subtle fade
  const handleSelectImage = (idx) => {
    if (idx === selectedImageIndex) return;
    setIsImageFading(true);
    setTimeout(() => {
      setSelectedImageIndex(idx);
      setIsImageFading(false);
    }, 150);
  };

  const handlePrevImage = () => {
    const total = product.images.length;
    const nextIdx = selectedImageIndex > 0 ? selectedImageIndex - 1 : total - 1;
    handleSelectImage(nextIdx);
  };

  const handleNextImage = () => {
    const total = product.images.length;
    const nextIdx = selectedImageIndex < total - 1 ? selectedImageIndex + 1 : 0;
    handleSelectImage(nextIdx);
  };

  // Quantity Handlers
  const handleDecrement = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleIncrement = () => {
    if (quantity < 50) setQuantity((prev) => prev + 1);
  };

  // Dynamic WhatsApp Order Message
  const whatsappOrderMessage = useMemo(() => {
    const msg = `Hi Amrutham, I would like to order: ${product.name} - ${selectedPack.size} - Quantity: ${quantity} (Total: ₹${totalPrice}).`;
    return `https://wa.me/${AMRUTHAM_PHONE_RAW}?text=${encodeURIComponent(msg)}`;
  }, [product.name, selectedPack.size, quantity, totalPrice]);

  return (
    <div className="product-page-root">
      {/* ── Top Header Navigation Bar ── */}
      <header className="product-page-header">
        <div className="product-page-header-container">
          <button 
            type="button" 
            className="back-to-home-btn"
            onClick={onBackToHome}
            aria-label="Return to Amrutham Home"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>BACK TO HOME</span>
          </button>

          <a href="#" onClick={(e) => { e.preventDefault(); onBackToHome?.(); }} className="product-page-logo-link">
            <img 
              src="/assets/amrutham-logo-transparent.png" 
              alt="Amrutham Masala Logo" 
              className="product-page-logo" 
            />
          </a>

          <a 
            href={`https://wa.me/${AMRUTHAM_PHONE_RAW}?text=${encodeURIComponent(`Hi Amrutham, I want to inquire about ${product.name}.`)}`}
            target="_blank" 
            rel="noopener noreferrer"
            className="product-page-help-link"
            aria-label="WhatsApp Support"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span>+91 94458 31616</span>
          </a>
        </div>
      </header>

      {/* ── Main Product Detail Stage ── */}
      <main className="product-detail-section" id="product-detail" aria-label="Product Details">
        <div className="product-detail-wrapper">
          <div className="product-detail-grid">
            
            {/* ══════════════════════════════════════════
                LEFT SIDE — Product Gallery & Visual Showcase
                ══════════════════════════════════════════ */}
            <div className="product-gallery-col">
              <div className="gallery-card">
                
                {/* Left/Right Gallery Switcher Arrows */}
                {product.images.length > 1 && (
                  <>
                    <button 
                      type="button" 
                      className="gallery-nav-arrow arrow-left" 
                      onClick={handlePrevImage}
                      aria-label="Previous image"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6" />
                      </svg>
                    </button>
                    <button 
                      type="button" 
                      className="gallery-nav-arrow arrow-right" 
                      onClick={handleNextImage}
                      aria-label="Next image"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </button>
                  </>
                )}

                {/* Main Product Image Container */}
                <div className="gallery-main-viewport">
                  <img 
                    key={`${product.id}-${selectedImageIndex}`}
                    src={product.images[selectedImageIndex]?.url || product.images[0]?.url} 
                    alt={product.images[selectedImageIndex]?.alt || product.name}
                    className={`gallery-main-image ${isImageFading ? 'is-fading' : ''}`}
                    loading="eager" 
                  />
                </div>

                {/* Gallery Thumbnails */}
                {product.images.length > 1 && (
                  <div className="gallery-thumbnails-bar" role="tablist" aria-label="Product image thumbnails">
                    {product.images.map((img, idx) => {
                      const isActive = idx === selectedImageIndex;
                      return (
                        <button
                          key={`thumb-${product.id}-${idx}`}
                          type="button"
                          role="tab"
                          aria-selected={isActive}
                          className={`gallery-thumb-btn ${isActive ? 'is-active' : ''}`}
                          onClick={() => handleSelectImage(idx)}
                          aria-label={`View photo ${idx + 1} of ${product.name}`}
                        >
                          <img src={img.url} alt="" className="thumb-img" loading="lazy" />
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Pagination Pill Dots */}
                {product.images.length > 1 && (
                  <div className="gallery-pagination-dots" aria-hidden="true">
                    {product.images.map((_, idx) => (
                      <span
                        key={`dot-${idx}`}
                        className={`gallery-dot ${idx === selectedImageIndex ? 'is-active' : ''}`}
                        onClick={() => handleSelectImage(idx)}
                      />
                    ))}
                  </div>
                )}

              </div>
            </div>

            {/* ══════════════════════════════════════════
                RIGHT SIDE — Product Information & Actions
                ══════════════════════════════════════════ */}
            <div className="product-info-col">
              
              {/* Header Area: Category, Title, Tamil Subtitle, Selected Weight & Top Badges */}
              <div className="product-header-block">
                <div className="product-title-group">
                  <span className="product-category-label">
                    {product.category}
                  </span>

                  <h1 className="product-main-name">
                    {product.name}
                  </h1>

                  {product.tamilName && (
                    <p className="product-tamil-subtitle">
                      {product.tamilName}
                    </p>
                  )}

                  <div className="product-weight-tag">
                    <span className="weight-dot" aria-hidden="true" />
                    <span>Selected Weight: <strong>{selectedPack.size}</strong></span>
                  </div>
                </div>

                {/* Top Reference Badges */}
                <div className="product-top-badges">
                  {product.topBadges.map((badge, idx) => (
                    <div key={`badge-${idx}`} className="top-badge-card">
                      <span className="top-badge-prefix">{badge.title}</span>
                      <span className="top-badge-highlight">{badge.subtitle}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Description */}
              <p className="product-description-text">
                {product.shortDescription}
              </p>

              {/* Prominent Price Display */}
              <div className="product-price-section">
                <div className="price-tag-wrap">
                  <span className="currency-symbol">₹</span>
                  <span className="price-amount">{unitPrice}</span>
                  <span className="price-pack-size">/ {selectedPack.size}</span>
                </div>

                {quantity > 1 && (
                  <div className="total-price-pill">
                    Total: <strong>₹{totalPrice}</strong> ({quantity} packs)
                  </div>
                )}
              </div>

              {/* Pack Size Selector */}
              <div className="pack-size-selector-block">
                <label className="selector-label" id="pack-size-label">
                  Select Pack Size:
                </label>
                <div 
                  className="pack-size-pills-row" 
                  role="radiogroup" 
                  aria-labelledby="pack-size-label"
                >
                  {product.packSizes.map((pack, idx) => {
                    const isSelected = idx === selectedPackIndex;
                    return (
                      <button
                        key={pack.size}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        className={`pack-size-pill ${isSelected ? 'is-selected' : ''}`}
                        onClick={() => setSelectedPackIndex(idx)}
                      >
                        <span className="pack-size-weight">{pack.size}</span>
                        <span className="pack-size-price">₹{pack.price}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity Stepper & WhatsApp Ordering Actions */}
              <div className="order-actions-container">
                <div className="quantity-and-order-row">
                  {/* Quantity Stepper */}
                  <div className="quantity-stepper-wrap" aria-label="Select quantity">
                    <span className="quantity-label">QTY</span>
                    <button
                      type="button"
                      className="qty-btn qty-minus"
                      onClick={handleDecrement}
                      disabled={quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="qty-value" aria-live="polite">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      className="qty-btn qty-plus"
                      onClick={handleIncrement}
                      disabled={quantity >= 50}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  {/* Primary CTA: ORDER ON WHATSAPP */}
                  <a
                    href={whatsappOrderMessage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="whatsapp-order-cta-btn"
                    aria-label={`Order ${product.name} on WhatsApp`}
                  >
                    <svg className="whatsapp-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" fill="currentColor"/>
                    </svg>
                    <span className="btn-text">ORDER ON WHATSAPP</span>
                  </a>
                </div>
              </div>

              {/* Circular / Rounded Product Benefit Badges (Reference Style) */}
              <div className="product-benefits-grid" aria-label="Product Benefits">
                {product.benefits.map((b) => (
                  <div key={b.id} className="benefit-badge-card">
                    <div className="benefit-icon-circle" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div className="benefit-text-wrap">
                      <h4 className="benefit-title">{b.title}</h4>
                      <p className="benefit-subtitle">{b.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Minimal Editorial Interactive Section (2 Horizontal Rows) */}
              <div className="editorial-spec-section" aria-label="Product Specifications">

                {/* Row 1: INGREDIENTS */}
                <div className={`editorial-row ${activeInfoCard === 'ingredients' ? 'is-open' : ''}`}>
                  <button
                    type="button"
                    className="editorial-row-header"
                    onClick={() => setActiveInfoCard((prev) => (prev === 'ingredients' ? null : 'ingredients'))}
                    aria-expanded={activeInfoCard === 'ingredients'}
                    aria-controls="editorial-content-ingredients"
                  >
                    <span className="editorial-row-title">INGREDIENTS</span>
                    <span className="editorial-chevron-wrap" aria-hidden="true">
                      <svg
                        className={`editorial-chevron ${activeInfoCard === 'ingredients' ? 'is-rotated' : ''}`}
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                  </button>

                  <div 
                    id="editorial-content-ingredients" 
                    className="editorial-row-content"
                  >
                    <div className="editorial-row-inner">
                      <div className="editorial-ingredients-flow">
                        {ingredientChips.map((ing, i) => (
                          <React.Fragment key={i}>
                            <span className="editorial-ing-item">{ing}</span>
                            {i < ingredientChips.length - 1 && (
                              <span className="editorial-ing-separator" aria-hidden="true">•</span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                      <div className="editorial-footnote">
                        100% Native Spices • Artisan Stone Ground • Zero Preservatives or Additives
                      </div>
                    </div>
                  </div>

                  <div className="editorial-row-divider" aria-hidden="true" />
                </div>

                {/* Row 2: NUTRITIONAL INFORMATION */}
                <div className={`editorial-row ${activeInfoCard === 'nutritional-info' ? 'is-open' : ''}`}>
                  <button
                    type="button"
                    className="editorial-row-header"
                    onClick={() => setActiveInfoCard((prev) => (prev === 'nutritional-info' ? null : 'nutritional-info'))}
                    aria-expanded={activeInfoCard === 'nutritional-info'}
                    aria-controls="editorial-content-nutrition"
                  >
                    <span className="editorial-row-title">NUTRITIONAL INFORMATION</span>
                    <span className="editorial-chevron-wrap" aria-hidden="true">
                      <svg
                        className={`editorial-chevron ${activeInfoCard === 'nutritional-info' ? 'is-rotated' : ''}`}
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                  </button>

                  <div 
                    id="editorial-content-nutrition" 
                    className="editorial-row-content"
                  >
                    <div className="editorial-row-inner">
                      <div className="editorial-nutrition-table-wrap">
                        <table className="editorial-nutrition-table">
                          <tbody>
                            {nutritionRows.map((row, rIdx) => (
                              <tr key={rIdx}>
                                <td className="editorial-nutri-label">{row.label}</td>
                                <td className="editorial-nutri-val">{row.value}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <p className="editorial-footnote">
                        *Nutritional values measured per 100g standard recipe preparation.
                      </p>
                    </div>
                  </div>

                  <div className="editorial-row-divider" aria-hidden="true" />
                </div>

              </div>

            </div>
          </div>

          {/* ── "You Might Also Enjoy!" Horizontal Carousel Section ── */}
          <section className="you-might-enjoy-section" aria-labelledby="enjoy-heading">
            <h2 id="enjoy-heading" className="you-might-enjoy-heading">
              You Might Also Enjoy!
            </h2>

            <div className="enjoy-carousel-container">
              {/* Left Circular Nav Arrow */}
              <button
                type="button"
                className="enjoy-arrow enjoy-arrow-prev"
                onClick={handlePrevSlide}
                disabled={carouselIndex <= 0}
                aria-label="Previous products"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              {/* Viewport & Track */}
              <div 
                className="enjoy-carousel-viewport"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <div 
                  className="enjoy-carousel-track"
                  style={{ '--current-index': carouselIndex }}
                >
                  {relatedProducts.map((item) => (
                    <div key={item.id} className="enjoy-carousel-slide">
                      <div 
                        className="enjoy-card"
                        onClick={() => onSelectProduct && onSelectProduct(item.id)}
                        role="button"
                        tabIndex={0}
                        aria-label={`View ${item.name}`}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            onSelectProduct && onSelectProduct(item.id);
                          }
                        }}
                      >
                        <div className="enjoy-img-wrap">
                          <img 
                            src={item.images[0]?.url} 
                            alt={item.name} 
                            className="enjoy-img" 
                            loading="lazy" 
                          />
                        </div>
                        <div className="enjoy-details">
                          <span className="enjoy-category">{item.category}</span>
                          <h3 className="enjoy-title">{item.name}</h3>
                          <div className="enjoy-footer">
                            <span className="enjoy-price">From ₹{item.packSizes[0]?.price}</span>
                            <span className="enjoy-view-btn">VIEW PRODUCT →</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Circular Nav Arrow */}
              <button
                type="button"
                className="enjoy-arrow enjoy-arrow-next"
                onClick={handleNextSlide}
                disabled={carouselIndex >= maxIndex}
                aria-label="Next products"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
