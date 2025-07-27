import React from 'react';

function About() {
  return (
    <section className="about-section" id='about'>
      <div className="about-container">
        {/* Left: Image Box */}
        <div className="about-image-box">
          <img
            src="../public/01.png" // You can use your own hosted image URL
            alt="Ahsan Raza Talpur"
            className="about-img"
          />
          <div className="image-overlay">
            <h2>Ahsan Raza Talpur</h2>
          </div>
        </div>

        {/* Right: Content */}
        <div className="about-content">
          <h3 className="about-heading">Team</h3>
          <h2 className="about-name">Ahsan Raza Talpur</h2>
          <p className="about-para">
            Fitness4U offers expert-designed workout plans tailored to your goals — whether it's fat loss, muscle gain, or endurance.
Track your health with an integrated BMI calculator and explore our training programs.
Get motivated with real gym transformations in our gallery and choose from affordable membership pricing.
Connect with certified trainers and join a fitness community that pushes you to be your best.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
