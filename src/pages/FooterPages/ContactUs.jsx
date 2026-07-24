import React from "react";
import "./ContactUs.css";
import heroImg from "../../assets/images/hero-bg.png";

const ContactUs = () => {
  return (
    <div className="contact-page">

      {/* Hero Section */}
      <section
        className="contact-hero"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="contact-hero-overlay">
          <div className="contact-hero-content">
            <h1>Get In Touch With Us</h1>

            <p>
              Have questions about a property, need support, or want to
              list your property? Our team is here to help.
            </p>
          </div>
        </div>
      </section>

     <section className="contact-section">
  <div className="contact-container">

    {/* Left Side */}
    <div className="contact-info">

      <span className="contact-label">CONTACT INFORMATION</span>

      <h2>Let's Talk About Your Property Needs</h2>

      <p>
        Whether you're looking for a rental property,
        need assistance with listings, or have any
        questions, we're here to help.
      </p>

      <div className="info-card">
        <div className="info-icon">📞</div>
        <div>
          <h4>Phone Number</h4>
          <p>+91 75696 85696</p>
        </div>
      </div>

      <div className="info-card">
        <div className="info-icon">📧</div>
        <div>
          <h4>Email Address</h4>
          <p>info@toletboards.com</p>
        </div>
      </div>

      <div className="info-card">
        <div className="info-icon">📍</div>
        <div>
          <h4>Office Address</h4>
          <p>Hyderabad, Telangana, India</p>
        </div>
      </div>

    </div>

    {/* Right Side */}
    <div className="contact-form-box">

      <h3>Send Us A Message</h3>

      <form className="contact-form">

        <div className="form-group">
          <input
            type="text"
            placeholder="Your Name"
          />
        </div>

        <div className="form-group">
          <input
            type="email"
            placeholder="Your Email"
          />
        </div>

        <div className="form-group">
          <input
            type="tel"
            placeholder="Phone Number"
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Subject"
          />
        </div>

        <div className="form-group">
          <textarea
            rows="6"
            placeholder="Your Message"
          ></textarea>
        </div>

        <button
          type="submit"
          className="submit-btn"
        >
          Send Message
        </button>

      </form>

    </div>

  </div>
</section>

    

     
    </div>
  );
};

export default ContactUs;