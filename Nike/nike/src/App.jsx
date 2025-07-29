import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Collection from './components/Collection';
import Gallery from './components/Gallery';
import Cart from './components/Cart';
import About from './components/About';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

const App = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Collection />
      <Gallery />
      <Cart />
      <About />
      <Footer />
      <ScrollToTop/>
    </>
  );
};

export default App;
