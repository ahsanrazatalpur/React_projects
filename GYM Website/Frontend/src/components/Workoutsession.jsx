import React from 'react';


function WorkoutPage() {
  return (
    <section className="workout-page" id='session'>
      {/* Left Column */}
      <div className="left-section">
        <h2 className="section-title">TOP WORKOUT SESSION</h2>
        <p className="section-text">Push harder than yesterday.</p>
        <p className="section-text">Your body can stand almost anything. It’s your mind you have to convince.</p>

        <div className="hover-image">
          <img src="../public/07.png" alt="Workout" />
          {/* <div className="overlay-text">Train Like a Beast</div> */}
        </div>
      </div>

      {/* Right Column */}
      <div className="right-section">
        <h2 className="section-title">FEATURED BOOTCAMPS</h2>
        <p className="section-text">Unleash your strength.</p>
        <p className="section-text">Every rep brings results.</p>

        <div className="bootcamp-grid">
          <div className="bootcamp-card">
            <h3>No Pain, No Gain</h3>
            <p className='inspire-para'>Strength doesn’t come from what you can do. It comes from overcoming the things you once thought you couldn’t.</p>
          </div>
          <div className="bootcamp-card">
            <h3>Sweat. Smile. Repeat.</h3>
            <p className='inspire-para'>Success starts with self-discipline. It starts with you.</p>
          </div>
          <div className="bootcamp-card">
            <h3>Train Insane</h3>
            <p className='inspire-para'>Make your body the sexiest outfit you own.</p>
          </div>
          <div className="bootcamp-card">
            <h3>Burn to Earn</h3>
            <p className='inspire-para'>Be stronger than your excuses. Start now.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WorkoutPage;
