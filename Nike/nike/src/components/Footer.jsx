import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Brand */}
        <div className="footer-col">
          <h3>Nike</h3>
          <p>Unleash your power and stay fit with us. Premium gear for every body.</p>
          <p>Team :Ahsan Raza Talpur</p>
          <p>+923113125335</p>
          <p>ahsanrazatalpur01@gmail.com</p>
        </div>

        {/* Products */}
        <div className="footer-col">
          <h4>Products</h4>
          <ul>
            <li><a href="#">Shoes</a></li>
            <li><a href="#">Activewear</a></li>
            <li><a href="#">Accessories</a></li>
            <li><a href="#">Collections</a></li>
          </ul>
        </div>

        {/* Company */}
        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li><a href="#">About</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Press</a></li>
            <li><a href="#">Investors</a></li>
          </ul>
        </div>

        {/* Support */}
        <div className="footer-col">
          <h4>Support</h4>
          <ul>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Returns</a></li>
            <li><a href="#">Track Order</a></li>
            <li><a href="#">Shipping</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="footer-col">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-youtube"></i></a>
            
            
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Nike. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
