/**
 * CartContext.jsx — Amrutham Shopping Cart State Management
 *
 * Provides global cart state via React Context.
 * - Persists to localStorage under 'amrutham_cart_v1'
 * - Derives product details live from PRODUCTS catalogue (no stale hardcoded data)
 * - Exposes addToCart, removeFromCart, updateQuantity, clearCart, openCart, closeCart
 */

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo
} from 'react';
import { PRODUCTS, AMRUTHAM_PHONE_RAW } from '../data/products';

// ─── Configuration ────────────────────────────────────────────────────────────
// Replace with your actual WhatsApp Business number in international format
// (country code + number, no '+', spaces, or punctuation).
// Example: '919445831616' for India +91 94458 31616
const WHATSAPP_BUSINESS_NUMBER = AMRUTHAM_PHONE_RAW;

const STORAGE_KEY = 'amrutham_cart_v1';

// ─── Context ──────────────────────────────────────────────────────────────────
const CartContext = createContext(null);

// ─── localStorage helpers ─────────────────────────────────────────────────────
function loadCartFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Validate each entry: must have productId (string) and packIndex (number) and qty (number)
    return parsed.filter(
      (item) =>
        item &&
        typeof item.productId === 'string' &&
        typeof item.packIndex === 'number' &&
        typeof item.quantity === 'number' &&
        item.quantity > 0
    );
  } catch {
    return [];
  }
}

function saveCartToStorage(items) {
  try {
    // Only persist productId, packIndex, quantity — derive everything else live
    const lightweight = items.map(({ productId, packIndex, quantity }) => ({
      productId,
      packIndex,
      quantity
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lightweight));
  } catch {
    // Silently ignore storage errors (private browsing / quota exceeded)
  }
}

// ─── Provider ─────────────────────────────────────────────────────────────────
export function CartProvider({ children }) {
  // Each cart item: { productId, packIndex, quantity }
  const [cartItems, setCartItems] = useState(() => loadCartFromStorage());
  const [isCartOpen, setIsCartOpen] = useState(false);
  // Per-item "just added" flash feedback  { key: true }
  const [addedKeys, setAddedKeys] = useState({});

  // Persist on every cart change
  useEffect(() => {
    saveCartToStorage(cartItems);
  }, [cartItems]);

  // Close cart on Escape
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') setIsCartOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // ── Derived enriched cart (product details resolved from catalogue) ──
  const enrichedCart = useMemo(() => {
    return cartItems
      .map((item) => {
        const product = PRODUCTS.find((p) => p.id === item.productId);
        if (!product) return null; // Product was removed from catalogue
        const pack = product.packSizes[item.packIndex] ?? product.packSizes[0];
        const packIndex = product.packSizes[item.packIndex] ? item.packIndex : 0;
        return {
          productId: item.productId,
          packIndex,
          quantity: item.quantity,
          name: product.name,
          image: product.images?.[0]?.url ?? '',
          imageAlt: product.images?.[0]?.alt ?? product.name,
          packSize: pack.size,
          packLabel: pack.label,
          unitPrice: pack.price,
          lineTotal: pack.price * item.quantity,
          // Unique key combining product + pack
          key: `${item.productId}__${packIndex}`
        };
      })
      .filter(Boolean);
  }, [cartItems]);

  // Total item count (sum of quantities)
  const totalItemCount = useMemo(
    () => enrichedCart.reduce((sum, item) => sum + item.quantity, 0),
    [enrichedCart]
  );

  // Cart subtotal
  const subtotal = useMemo(
    () => enrichedCart.reduce((sum, item) => sum + item.lineTotal, 0),
    [enrichedCart]
  );

  // ── Actions ──────────────────────────────────────────────────────────────
  const addToCart = useCallback((productId, packIndex = 0) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) return;
    const safePackIndex =
      packIndex >= 0 && packIndex < product.packSizes.length ? packIndex : 0;
    const itemKey = `${productId}__${safePackIndex}`;

    setCartItems((prev) => {
      const existing = prev.findIndex(
        (i) => i.productId === productId && i.packIndex === safePackIndex
      );
      if (existing !== -1) {
        // Increase quantity (cap at 50)
        return prev.map((item, idx) =>
          idx === existing
            ? { ...item, quantity: Math.min(50, item.quantity + 1) }
            : item
        );
      }
      return [...prev, { productId, packIndex: safePackIndex, quantity: 1 }];
    });

    // Flash feedback for this item
    setAddedKeys((prev) => ({ ...prev, [itemKey]: true }));
    setTimeout(() => {
      setAddedKeys((prev) => {
        const next = { ...prev };
        delete next[itemKey];
        return next;
      });
    }, 1800);
  }, []);

  const removeFromCart = useCallback((productId, packIndex) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.productId === productId && item.packIndex === packIndex)
      )
    );
  }, []);

  const updateQuantity = useCallback((productId, packIndex, newQuantity) => {
    const qty = Math.max(1, Math.min(50, newQuantity));
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId && item.packIndex === packIndex
          ? { ...item, quantity: qty }
          : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const toggleCart = useCallback(() => setIsCartOpen((prev) => !prev), []);

  // ── WhatsApp Checkout ─────────────────────────────────────────────────────
  const openWhatsAppCheckout = useCallback(() => {
    if (enrichedCart.length === 0) return;

    const lines = enrichedCart.map(
      (item) =>
        `\u2022 ${item.name} (${item.packSize}) \u00d7 ${item.quantity} = \u20b9${item.lineTotal}`
    );

    const message = [
      'Hello Amrutham! \uD83D\uDE4F',
      '',
      "I'd like to place the following order:",
      '',
      ...lines,
      '',
      `*Order Subtotal: \u20b9${subtotal}*`,
      '',
      'Could you please confirm product availability, applicable delivery charges, and payment options?',
      '',
      'Thank you!'
    ].join('\n');

    const url = `https://wa.me/${WHATSAPP_BUSINESS_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }, [enrichedCart, subtotal]);

  // ── Context Value ─────────────────────────────────────────────────────────
  const value = {
    cartItems,
    enrichedCart,
    totalItemCount,
    subtotal,
    isCartOpen,
    addedKeys,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    openCart,
    closeCart,
    toggleCart,
    openWhatsAppCheckout
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// ─── Hook ──────────────────────────────────────────────────────────────────────
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used inside <CartProvider>');
  }
  return ctx;
}
