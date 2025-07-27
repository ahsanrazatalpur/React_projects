import React, { useState } from 'react';

function BMI() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('');
  const [bmi, setBmi] = useState('');
  const [message, setMessage] = useState('');

  const calculateBMI = (e) => {
    e.preventDefault();
    if (height && weight) {
      const h = height / 100;
      const bmiValue = (weight / (h * h)).toFixed(2);
      setBmi(bmiValue);

      if (bmiValue < 18.5) setMessage('Underweight');
      else if (bmiValue < 25) setMessage('Normal weight');
      else if (bmiValue < 30) setMessage('Overweight');
      else setMessage('Obese');
    } else {
      setBmi('');
      setMessage('Please enter all fields');
    }
  };

  return (
    <section className="bmi-section" id='BMI'>
      <div className="bmi-container">

        {/* Left: Form */}
        <div className="bmi-form">
          <h2 className="bmi-title">BMI CALCULATOR</h2>
          <form onSubmit={calculateBMI}>
            <input
              type="number"
              placeholder="Height (cm)"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Weight (kg)"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
            />
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            <div className="btn-center">
              <button type="submit" className="bmi-btn">Calculate</button>
            </div>
          </form>

          {bmi && (
            <div className="bmi-result">
              <p>Your BMI is <strong>{bmi}</strong></p>
              <p>Status: <strong>{message}</strong></p>
            </div>
          )}
        </div>

        {/* Right: Image */}
        <div className="bmi-image-box">
          {/* <div className="bmi-image-overlay">
            <h3>Track Your Fitness</h3>
            <p>Know your body better!</p>
          </div> */}
          <img src="../public/02.png" alt="BMI" className="bmi-image" />
        </div>

      </div>
    </section>
  );
}

export default BMI;
