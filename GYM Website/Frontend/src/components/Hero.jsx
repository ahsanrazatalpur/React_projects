import React from 'react';

function Hero() {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-heading">Let's Get Moving</h1>
        <p className="hero-subheading">Your Journey Starts Here</p>
        <h2 className="hero-highlight">Unleash Your Potential</h2>

        <div className="hero-buttons">
          <button 
            className="btn primary" 
            onClick={() => scrollToSection('start')}
          >
            Start New Journey
          </button>

          <button 
            className="btn secondary" 
            onClick={() => scrollToSection('pricing')}
          >
            Discover Your Plan
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
