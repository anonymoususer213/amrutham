import React from 'react';
import './OurStory.css';

export default function OurStory() {
  return (
    <section className="our-story-section" id="story" aria-labelledby="story-heading">
      <div className="our-story-container">
        {/* Left Column: Food Photography (~40%) */}
        <div className="our-story-visual-col">
          <div className="our-story-image-card">
            <img
              src="/assets/our-story-masala.jpg"
              alt="Freshly ground traditional masala powder in a ceramic bowl surrounded by whole aromatic spices"
              className="our-story-image"
              loading="lazy"
            />
          </div>
        </div>

        {/* Right Column: Editorial Brand Story (~60%) */}
        <div className="our-story-content-col">
          <div className="our-story-content-inner">
            <h2 id="story-heading" className="our-story-heading">
              Tradition in every blend.<br />
              Wellness in every meal.
            </h2>

            <p className="our-story-lead">
              We use traditional techniques to blend our spices and preserve their natural essential oils and uncompromised wellness benefits. We carefully eliminate artificial additives, fillers, and excess salt, giving wellness-conscious cooks a clean, effortless way to infuse authentic traditional flavor into everyday quick meals.
            </p>

            <p className="our-story-tagline">
              Rooted in traditional spice-making, crafted for the way you cook today.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
