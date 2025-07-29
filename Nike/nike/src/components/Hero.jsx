import React from 'react';
import { Link } from 'react-router-dom';

function Hero() {
    return (
        <section className="hero-container">
            {/* Left Section */}
            <div className="hero-left">
                <h1>
                    YOUR FEET <br />
                    DESERVE <br />
                    THE BEST
                </h1>
                <p className="subtext">
                    Designed to push boundaries and break limits. <br />
                    Trusted by champions, worn by legends. <br />
                    When you wear Nike — you wear purpose.
                </p>

                <div className="hero-buttons">
                    <a href="#about">
                        <button className="about-btn">About</button>
                    </a>
                    <a href="#collection">
                        <button className="collection-btn">Collection</button>
                    </a>
                </div>

                <p className="available-on">Also available on</p>
                <div className="store-logos">
                    {/* Dark theme Amazon logo (for light background) */}
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
                        alt="Amazon"
                        className="amazon-logo-dark dark-only"
                    />
                    {/* Light theme Amazon logo (for dark background) */}
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
                        alt="Amazon"
                        className="amazon-logo-light light-only"
                    />
                </div>
            </div>

            {/* Right Section */}
            <div className="hero-right">
                <img
                    src="/Shoes.png"
                    alt="Nike Shoe"
                    className="hero-shoe"
                />
            </div>
        </section>
    );
}

export default Hero;
