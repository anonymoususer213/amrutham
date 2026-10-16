/**
 * CartPanel.jsx — Amrutham Shopping Cart Slide-In Panel
 *
 * Premium slide-in cart panel matching the Amrutham brand.
 * - Slides in from the right on desktop (400px wide)
 * - Full-screen overlay on mobile
 * - Shows product image, name, pack size, unit price, qty controls, remove
 * - Subtotal + WhatsApp checkout CTA
 * - Empty state with "Continue Shopping" CTA
 */

import React, { useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import './CartPanel.css';

// WhatsApp SVG icon (inline, no extra dependency)
function WhatsAppIcon({ size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

// ─── Single Cart Line Item ────────────────────────────────────────────────────
function CartLineItem({ item }) {
  const { removeFromCart, updateQuantity } = useCart();

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item.productId, item.packIndex, item.quantity - 1);
    } else {
      removeFromCart(item.productId, item.packIndex);
    }
  };

  const handleIncrement = () => {
    updateQuantity(item.productId, item.packIndex, item.quantity + 1);
  };

  return (
    <li className="cart-line-item" aria-label={`${item.name} ${item.packSize}`}>
      {/* Product Image */}
      <div className="cart-item-image-wrap">
        <img
          src={item.image}
          alt={item.imageAlt}
          className="cart-item-image"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>

      {/* Item Info */}
      <div className="cart-item-details">
        <p className="cart-item-name">{item.name}</p>
        <p className="cart-item-pack">{item.packSize} · ₹{item.unitPrice}</p>

        {/* Quantity Controls + Line Total */}
        <div className="cart-item-row">
          <div
            className="cart-qty-stepper"
            role="group"
            aria-label={`Quantity for ${item.name} ${item.packSize}`}
          >
            <button
              type="button"
              className="cart-qty-btn"
              onClick={handleDecrement}
              aria-label={
                item.quantity === 1
                  ? `Remove ${item.name} from cart`
                  : `Decrease quantity of ${item.name}`
              }
            >
              {item.quantity === 1 ? (
                // Trash icon when qty is 1
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                  <path d="M10 11v6M14 11v6" />
                  <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                </svg>
              ) : (
                '−'
              )}
            </button>
            <span className="cart-qty-value" aria-live="polite">
              {item.quantity}
            </span>
            <button
              type="button"
              className="cart-qty-btn"
              onClick={handleIncrement}
              disabled={item.quantity >= 50}
              aria-label={`Increase quantity of ${item.name}`}
            >
              +
            </button>
          </div>

          <span className="cart-item-line-total">₹{item.lineTotal}</span>
        </div>
      </div>

      {/* Remove Button */}
      <button
        type="button"
        className="cart-item-remove-btn"
        onClick={() => removeFromCart(item.productId, item.packIndex)}
        aria-label={`Remove ${item.name} ${item.packSize} from cart`}
        title="Remove item"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </li>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────
function EmptyCartState({ onClose }) {
  return (
    <div className="cart-empty-state" role="status" aria-label="Cart is empty">
      {/* Decorative basket/bag icon */}
      <div className="cart-empty-icon" aria-hidden="true">
        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 01-8 0" />
        </svg>
      </div>
      <h3 className="cart-empty-title">Your cart is empty</h3>
      <p className="cart-empty-subtitle">
        Discover our traditional health mixes and authentic spices.
      </p>
      <button
        type="button"
        className="cart-continue-btn"
        onClick={onClose}
        aria-label="Continue shopping"
      >
        Continue Shopping
      </button>
    </div>
  );
}

// ─── Main CartPanel Component ─────────────────────────────────────────────────
export default function CartPanel() {
  const {
    enrichedCart,
    totalItemCount,
    subtotal,
    isCartOpen,
    closeCart,
    clearCart,
    openWhatsAppCheckout
  } = useCart();

  // Trap focus inside the panel when open
  const panelRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (isCartOpen) {
      // Move focus to close button when panel opens
      setTimeout(() => closeButtonRef.current?.focus(), 50);
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  const isEmpty = enrichedCart.length === 0;

  return (
    <>
      {/* Backdrop Overlay */}
      <div
        className={`cart-backdrop ${isCartOpen ? 'is-visible' : ''}`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Slide-In Panel */}
      <aside
        ref={panelRef}
        className={`cart-panel ${isCartOpen ? 'is-open' : ''}`}
        aria-label="Shopping Cart"
        aria-modal="true"
        role="dialog"
        id="cart-panel"
      >
        {/* ── Panel Header ── */}
        <div className="cart-panel-header">
          <div className="cart-header-left">
            <h2 className="cart-panel-title">Your Cart</h2>
            {totalItemCount > 0 && (
              <span className="cart-panel-count" aria-live="polite">
                {totalItemCount} {totalItemCount === 1 ? 'item' : 'items'}
              </span>
            )}
          </div>
          <div className="cart-header-actions">
            {!isEmpty && (
              <button
                type="button"
                className="cart-clear-btn"
                onClick={clearCart}
                aria-label="Clear all items from cart"
              >
                Clear all
              </button>
            )}
            <button
              ref={closeButtonRef}
              type="button"
              className="cart-close-btn"
              onClick={closeCart}
              aria-label="Close cart"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Subtle divider */}
        <div className="cart-header-divider" aria-hidden="true" />

        {/* ── Scrollable Item List ── */}
        <div className="cart-panel-body">
          {isEmpty ? (
            <EmptyCartState onClose={closeCart} />
          ) : (
            <ul className="cart-items-list" aria-label="Cart items">
              {enrichedCart.map((item) => (
                <CartLineItem key={item.key} item={item} />
              ))}
            </ul>
          )}
        </div>

        {/* ── Panel Footer — Subtotal + Checkout (only when cart has items) ── */}
        {!isEmpty && (
          <div className="cart-panel-footer">
            {/* Delivery notice */}
            <p className="cart-delivery-note">
              Delivery charges &amp; final confirmation via WhatsApp
            </p>

            {/* Subtotal */}
            <div className="cart-subtotal-row">
              <span className="cart-subtotal-label">Subtotal</span>
              <span className="cart-subtotal-value" aria-live="polite">
                ₹{subtotal}
              </span>
            </div>

            {/* WhatsApp Checkout */}
            <button
              type="button"
              className="cart-whatsapp-btn"
              onClick={openWhatsAppCheckout}
              aria-label="Order via WhatsApp"
            >
              <WhatsAppIcon size={20} />
              <span>Order via WhatsApp</span>
            </button>

            {/* Continue Shopping */}
            <button
              type="button"
              className="cart-continue-shopping-link"
              onClick={closeCart}
              aria-label="Continue shopping"
            >
              ← Continue Shopping
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
