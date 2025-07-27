import React from 'react';

function Pricing() {
  return (
    <section className="pricing-section" id='pricing'>
      <h2 className="pricing-heading">ELITE EDGE FITNESS PLAN</h2>

      <div className="pricing-cards">

        {/* Quarterly Package */}
        <div className="card card-diagonal left">
          <div className="card-content">
            <h3 className="card-title">QUARTERLY PACKAGE</h3>
            <p className="card-price">PKR 1800</p>
            <p className="card-sub">FOR 3 MONTHS</p>
            <ul className="features">
              <li>✅ Equipment Access</li>
              <li>✅ All Day Free Training</li>
              <li>✅ Free Restroom</li>
              <li>✅ 24/7 Skilled Support</li>
              <li>✅ AC with Elite Music</li>
            </ul>
            <button className="join-btn">JOIN NOW</button>
          </div>
        </div>

        {/* Standard Package */}
        <div className="card card-full">
          <div className="card-content">
            <h3 className="card-title">STANDARD PACKAGE</h3>
            <p className="card-price">PKR 2500</p>
            <p className="card-sub">FOR 6 MONTHS</p>
            <ul className="features">
              <li>✅ Equipment Access</li>
              <li>✅ Dedicated Trainers</li>
              <li>✅ Nutrition Guidance</li>
              <li>✅ Priority Support</li>
              <li>✅ Weekend Bootcamps</li>
            </ul>
            <button className="join-btn">JOIN NOW</button>
          </div>
        </div>

        {/* Yearly Package */}
        <div className="card card-diagonal right">
          <div className="card-content">
            <h3 className="card-title">YEARLY PACKAGE</h3>
            <p className="card-price">PKR 4000</p>
            <p className="card-sub">FOR 12 MONTHS</p>
            <ul className="features">
              <li>✅ Unlimited Access</li>
              <li>✅ Free Personal Coach</li>
              <li>✅ Health Monitoring</li>
              <li>✅ Online Portal</li>
              <li>✅ VIP Lounge Access</li>
            </ul>
            <button className="join-btn">JOIN NOW</button>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Pricing;
