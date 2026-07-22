import "./Hero.css";
import heroBg from "../../assets/images/hero-bg.png";
import {
  FaMapMarkerAlt,
  FaBolt,
  FaCheckCircle
} from "react-icons/fa";

function Hero() {
  return (
    <section
      className="hero"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="hero-overlay"></div>

      <div className="container hero-content">

        {/* Left Content */}
        <div className="hero-left">

          {/* <span className="premium-badge">
            PREMIUM B2B PLATFORM
          </span> */}

          <h1>
            Connecting Institutional
            <br />
            <span>Tenants & Owners</span>
            <br />
            Across Hyderabad
          </h1>

          <p>
            A specialized real estate ecosystem designed for rapid
            deployment of residential and commercial boards.
            Streamlining property management for SR Realty
            Properties in India.
          </p>

          <div className="hero-features">

            <div>
              <FaCheckCircle />
              <span>Verified Listings Only</span>
            </div>

            <div>
              <FaBolt />
              <span>Fast Listing Turnaround</span>
            </div>

          </div>

        </div>

        {/* Right Search Card */}

        <div className="search-card">

          <h2>Find Your Next Investment</h2>

          <div className="form-group">

            <label>Location</label>

            <div className="input-icon">

              <FaMapMarkerAlt />

              <input
                type="text"
                placeholder="City, Zip Or Area"
              />

            </div>

          </div>

          <div className="search-row">

            <div className="form-group">

              <label>Property Type</label>

              <select>

                <option>Commercial</option>

                <option>Residential</option>

                <option>Industrial</option>

              </select>

            </div>

            <div className="form-group">

              <label>Price Range</label>

              <select>

                <option>₹50,000 - ₹1,50,000</option>

                <option>₹1,50,000 - ₹3,00,000</option>

                <option>₹3,00,000+</option>

              </select>

            </div>

          </div>

          <button>
            Search Properties
          </button>

        </div>

      </div>
    </section>
  );
}

export default Hero;