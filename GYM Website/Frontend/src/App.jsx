import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import {BrowserRouter as Router} from "react-router-dom"
import './App.css'; // ✅ This makes styles global
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Workoutsession from './components/Workoutsession';
import Gallery from './components/Gallery';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import BMICalculator from './components/BMICalculator';
import About from './components/About';
import Footer from './components/Footer'


const App = () => {
  return (
    <Router>
        <Navbar/>
        <Hero/>
        <Workoutsession/>
        <Gallery/>
        <Pricing/>
        <Contact/>
        <BMICalculator/>
        <About/>
        <Footer/>   
        <ToastContainer theme='dark' position='top-center'/> 
    </Router>
  )
}

export default App
