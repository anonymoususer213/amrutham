import React from 'react';
import './SectionDivider.css';

export default function SectionDivider() {
  const marqueeItems = [
    'THE TASTE OF TRADITION',
    '100% PURE & NATURAL',
    'MADE FOR EVERY HOME',
    'AUTHENTIC VILLAGE HERITAGE',
    'ZERO PRESERVATIVES',
  ];

  return (
    <div className="section-divider" aria-hidden="true">
      {/* Top Scalloped Wave (Navy fill projecting over backdrop) */}
      <div className="scallop-wave scallop-wave-top">
        <svg viewBox="0 0 1440 24" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path
            d="M0,24 L1440,24 L1440,12 C1410,0 1380,24 1350,12 C1320,0 1290,24 1260,12 C1230,0 1200,24 1170,12 C1140,0 1110,24 1080,12 C1050,0 1020,24 990,12 C960,0 930,24 900,12 C870,0 840,24 810,12 C780,0 750,24 720,12 C690,0 660,24 630,12 C600,0 570,24 540,12 C510,0 480,24 450,12 C420,0 390,24 360,12 C330,0 300,24 270,12 C240,0 210,24 180,12 C150,0 120,24 90,12 C60,0 30,24 0,12 Z"
            fill="#0c1d2e"
          />
        </svg>
      </div>

      {/* Central Thin Cream Line */}
      <div className="divider-center-line"></div>

      {/* Marquee Track */}
      <div className="marquee-wrapper">
        <div className="marquee-track">
          {/* Set 1 */}
          <div className="marquee-group">
            {marqueeItems.map((item, idx) => (
              <span key={`set1-${idx}`} className="marquee-item">
                <span className="marquee-text">{item}</span>
                <span className="marquee-separator">✦</span>
              </span>
            ))}
          </div>

          {/* Set 2 (Identical duplicate for infinite seamless loop) */}
          <div className="marquee-group" aria-hidden="true">
            {marqueeItems.map((item, idx) => (
              <span key={`set2-${idx}`} className="marquee-item">
                <span className="marquee-text">{item}</span>
                <span className="marquee-separator">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Scalloped Wave */}
      <div className="scallop-wave scallop-wave-bottom">
        <svg viewBox="0 0 1440 24" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path
            d="M0,0 L1440,0 L1440,12 C1410,24 1380,0 1350,12 C1320,24 1290,0 1260,12 C1230,24 1200,0 1170,12 C1140,24 1110,0 1080,12 C1050,24 1020,0 990,12 C960,24 930,0 900,12 C870,24 840,0 810,12 C780,24 750,0 720,12 C690,24 660,0 630,12 C600,24 570,0 540,12 C510,24 480,0 450,12 C420,24 390,0 360,12 C330,24 300,0 270,12 C240,24 210,0 180,12 C150,24 120,0 90,12 C60,24 30,0 0,12 Z"
            fill="#0c1d2e"
          />
        </svg>
      </div>
    </div>
  );
}
