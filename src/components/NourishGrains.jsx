import React from 'react';
import './NourishGrains.css';

export default function NourishGrains() {
  return (
    <section className="nourish-grains-section" id="nutrition" aria-labelledby="nourish-heading">
      <div className="nourish-grains-container">
        {/* Left Column: Editorial Content (~52%) */}
        <div className="nourish-content-col">
          <div className="nourish-content-inner">
            <h2 id="nourish-heading" className="nourish-heading">
              Nourish every generation with the pure goodness of traditional grains.
            </h2>

            <p className="nourish-lead">
              Amrutham Health Mix brings the ancient wisdom of traditional Indian nutrition straight to your modern kitchen. Crafted from a 100% organic, nutrient-dense blend of millets, pulses, nuts, and seeds, each spoonful delivers a natural boost of protein, dietary fiber, and iron. It is a wholesome, quick-to-prepare meal or snack that supports sustained energy and immunity for the entire family ready in just 3 minutes with zero artificial shortcuts.
            </p>

            <p className="nourish-secondary">
              Ideal as a nutritious breakfast, warm porridge, or healthy mid-day snack for kids
            </p>

            <div className="nourish-actions">
              <a href="#products" className="nourish-cta-btn">
                EXPLORE HEALTH MIX
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Food Photography (~48%) flush to the right edge */}
        <div className="nourish-visual-col">
          <div className="nourish-image-card">
            <img
              src="/assets/health-mix-tradition.jpg"
              alt="Steaming warm bowl of traditional multigrain porridge topped with roasted nuts, seeds, and spices"
              className="nourish-image"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
