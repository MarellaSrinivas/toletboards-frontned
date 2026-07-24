import React from "react";
import "./AboutUs.css";
import buildingImg from "../../assets/images/auth-banner.png";
import heroImg from "../../assets/images/hero-bg.png";
 
const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section
        className="about-hero"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="about-hero__overlay">
          <div className="about-hero__content">
            <h1 className="about-hero__title">
              Revolutionizing Rentals in Hyderabad
            </h1>
 
            <p className="about-hero__description">
              Tri-Leaf Rentals is Hyderabad's premier B2B real estate
              advisory, engineered to simplify property management and
              corporate leasing through transparency and technology.
            </p>
 
            {/* <div className="about-hero__buttons">
              <button className="btn btn--primary">Get Started</button>
              <button className="btn btn--secondary">Our Listings</button>
            </div> */}
          </div>
        </div>
      </section>
 
      {/* Company Story */}
      <section className="company-story">
        <div className="company-story__container">
          <div className="company-story__image-wrapper">
            <img
              src={buildingImg}
              alt="Corporate Building"
              className="company-story__image"
            />
 
            <div className="company-story__badge">
              <h3>7+</h3>
              <p>Years of Expertise</p>
            </div>
          </div>
 
          <div className="company-story__content">
            <span className="company-story__label">THE TRI-LEAF STORY</span>
 
            <h2 className="company-story__title">
              Bridging the Gap in Corporate Real Estate
            </h2>
 
            <p className="company-story__text">
              Born in the heart of HITEC City, Tri-Leaf Boards emerged from
              a simple realization: Hyderabad's real estate market was
              fragmented. Tenants struggled to find verified spaces, and
              property owners lacked a professional B2B channel to reach
              decision-makers.
            </p>
 
            <p className="company-story__text">
              We built a data-driven platform that connects businesses with
              premium office spaces through a transparent and efficient
              process.
            </p>
 
            <div className="company-story__stats">
              <div className="stat-card">
                <h4>Verified Deals</h4>
                <p>Premium listings across modern office spaces</p>
              </div>
 
              <div className="stat-card">
                <h4>Commercial Focus</h4>
                <p>Tailored solutions for growing businesses</p>
              </div>
 
              <div className="stat-card">
                <h4>Market Insight</h4>
                <p>Data-backed recommendations and advisory</p>
              </div>
            </div>
          </div>
        </div>
      </section>
 
      {/* What We Do */}
      <section className="services-section">
        <div className="section-heading">
          <h2>What We Do</h2>
          <p>Providing infrastructure for professional real estate transactions.</p>
        </div>
 
        <div className="services-grid">
          <div className="service-card">
            <div className="service-card__icon">🏢</div>
            <h3>Verified Listings</h3>
            <p>
              Every listing is verified through legal and operational checks
              before being published on our platform.
            </p>
           </div>
 
          <div className="service-card">
            <div className="service-card__icon">🤝</div>
            <h3>Corporate Advisory</h3>
            <p>
              We support businesses in selecting strategic office locations
              and negotiating favorable lease terms.
            </p>
           </div>
 
          <div className="service-card">
            <div className="service-card__icon">📊</div>
            <h3>Market Intelligence</h3>
            <p>
              Real-time market insights help clients make informed leasing
              and investment decisions.
            </p>
           </div>
        </div>
      </section>
 
      {/* Core Values */}
      <section className="core-values-section">
        <div className="section-heading">
          <h2>Core Values That Drive Us</h2>
          <p>Our foundation is built on corporate trust and institutional excellence.</p>
        </div>
 
        <div className="values-grid">
          <div className="value-card">
            <div className="value-card__icon">🛡️</div>
            <h3>Trust</h3>
            <p>
              We prioritize long-term relationships through verified listings
              and transparent operations.
            </p>
          </div>
 
          <div className="value-card">
            <div className="value-card__icon">👁️</div>
            <h3>Transparency</h3>
            <p>
              Clear pricing, accurate information, and honest communication
              define our service.
            </p>
          </div>
 
          <div className="value-card">
            <div className="value-card__icon">⚡</div>
            <h3>Efficiency</h3>
            <p>
              Technology-driven workflows accelerate decision-making and
              reduce transaction time.
            </p>
          </div>
        </div>
      </section>
 
      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-section__content">
          <h2>Ready to Find Your Next Space?</h2>
          <p>
            Join thousands of owners and tenants already using Tri-Leaf
            Boards to navigate Hyderabad's real estate market.
          </p>
 
          <div className="cta-section__buttons">
           <a href="/contactus" > <button className="btn btn--primary">Contact Our Experts</button> </a>
          <a href="/properties"> <button className="btn btn--secondary">Browse Listings</button> </a> 
          </div>
        </div>
      </section>
    </div>
  );
};
 
export default About;