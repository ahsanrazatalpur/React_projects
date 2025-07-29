import React from 'react';

const About = () => {
  return (
    <section className="about-section" id='about'>
      <div className="about-content">
        <div className="about-image">
          <img
            src="Shoes.png"
            alt="Nike Shoes"
          />
        </div>

        <div className="about-text">
          <h2>Who We Are</h2>
          <p>
            <strong>Nike</strong> is not just a store — it's a lifestyle. We're passionate about
            delivering top-quality Nike footwear that blends innovation, style, and unmatched
            performance.
          </p>
          <p>
            Every step you take matters, whether you're hitting the gym, dominating the court, or
            making a fashion statement on the street.
          </p>
          <p>
            Trusted by thousands of athletes and sneaker lovers, we offer 100% authentic products,
            speedy delivery, and world-class service.
          </p>

          <div className="about-tags">
            <span>✔️ Authentic Nike Products</span>
            <span>🚚 Free Worldwide Shipping</span>
            <span>⭐ 4.9/5 Customer Ratings</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
