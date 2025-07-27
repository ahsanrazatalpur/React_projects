import React from 'react';
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaHome,
  FaDumbbell,
  FaCalculator,
  FaCamera,
  FaPhone,
  FaHeartbeat,
  FaRunning,
  FaAppleAlt,
  FaSpa,
} from 'react-icons/fa';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand Info */}
        <div className="footer-logo">
          <h3>Fitness4U</h3>
          <p>Your partner in strength, health, and confidence.</p>
          <p>Ahsan Raza Talpur</p>
          <p>+923113125335</p>
          <p>ahsanrazatalpur01@gmail.com</p>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <a href="#"><li><FaHome /> Home</li></a>
            <a href="#about"><li><FaDumbbell /> About</li></a>
            <a href="#BMI"><li><FaCalculator /> BMI</li></a>
            <a href="#gallery"><li><FaCamera /> Gallery</li></a>
            <a href="#contact"><li><FaPhone /> Contact</li></a>
          </ul>
        </div>

        {/* Other Services */}
        <div className="footer-links">
          <h4>Other Services</h4>
          <ul>
            <a href="#"><li><FaHeartbeat /> Personal Training</li></a>
            <a href="#"><li><FaRunning /> Cardio Classes</li></a>
            <a href="#"><li><FaAppleAlt /> Nutrition Plans</li></a>
            <a href="#"><li><FaSpa /> Massage Therapy</li></a>
          </ul>
        </div>

        {/* Socials */}
        <div className="footer-socials">
          <h4>Follow Us</h4>
          <div className="footer-social-icons">
            <a href="https://www.facebook.com/profile.php?id=100075418512969" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
            <a href="https://www.instagram.com/mir_ahsan_raza?igsh=eWlzcmRsOWR0NjRy " target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://x.com/ahsanarmaan888?t=wUHmpCaq24tI6LNsTpmnxg&s=09" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Fitness4U. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
