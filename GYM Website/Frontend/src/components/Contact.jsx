import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify'; // ✅ Import toast
import 'react-toastify/dist/ReactToastify.css';           // ✅ Toast styles

function Contact() {
  const form = useRef();
  const [loading, setLoading] = useState(false); // ✅ For loader if needed

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    emailjs.sendForm(
      'gmail_service',
      'template_cyj2fs2',
      form.current,
      'J8I5pIbNWjSLM8D-f'
    )
    .then((result) => {
      toast.success("✅ Message sent successfully!");
      form.current.reset();
    })
    .catch((error) => {
      toast.error("❌ Something went wrong. Check console.");
      console.error(error);
    })
    .finally(() => {
      setLoading(false); // End loading
    });
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        
        {/* Left */}
        <div className="contact-image">
          <div className="overlay-text">
            <h2>Let’s Connect</h2>
            <p>Have questions? We’re here to help you reach your fitness goals!</p>
          </div>
        </div>

        {/* Right */}
        <form ref={form} onSubmit={sendEmail} className="contact-form">
          <h2>CONTACT US</h2>

          <input type="text" name="user_name" placeholder="Your Name" required />
          <input type="email" name="user_email" placeholder="Your Email" required />
          <textarea name="message" rows="5" placeholder="Your Message" required></textarea>

          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>

      {/* ✅ Toast Container goes at the bottom of return */}
      <ToastContainer position="top-center" />
    </section>
  );
}

export default Contact;
