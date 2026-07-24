import "./Hero.css";
import heroBg from "../../assets/images/hero-bg.png";
import {
  FaMapMarkerAlt,
  FaBolt,
  FaCheckCircle,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Hero() {
  const navigate = useNavigate();

  const [city, setCity] = useState("");

  const [propertyType, setPropertyType] =
    useState("Residential");

  const [priceRange, setPriceRange] =
    useState("");

  const handleSearch = () => {
    navigate(
      `/properties?city=${city}&type=${propertyType}&price=${priceRange}`
    );
  };

  return (
    <section
      className="hero"
      style={{
        backgroundImage: `url(${heroBg})`,
      }}
    >
      <div className="hero-overlay"></div>

      <div className="container hero-content">
        <div className="hero-left">
          <h1>
            Connecting Institutional
            <br />
            <span>
              Tenants & Owners
            </span>
            <br />
            Across India
          </h1>

          <p>
            A specialized real estate ecosystem
            designed for rapid deployment of
            residential and commercial boards.
          </p>

          <div className="hero-features">
            <div>
              <FaCheckCircle />
              <span>
                Verified Listings Only
              </span>
            </div>

            <div>
              <FaBolt />
              <span>
                Fast Listing Turnaround
              </span>
            </div>
          </div>
        </div>

        <div className="search-card">
          <h2>
            Find Your Next Home
          </h2>

          <div className="form-group">
            <label>Location</label>

            <div className="input-icon">
              <FaMapMarkerAlt />

              <input
                type="text"
                placeholder="Hyderabad"
                value={city}
                onChange={(e) =>
                  setCity(e.target.value)
                }
              />
            </div>
          </div>

          <div className="search-row">
            <div className="form-group">
              <label>
                Property Type
              </label>

              <select
                value={propertyType}
                onChange={(e) =>
                  setPropertyType(
                    e.target.value
                  )
                }
              >
                <option>
                  Residential
                </option>

                <option>
                  Commercial
                </option>

                 
              </select>
            </div>

            <div className="form-group">
              <label>
                Price Range
              </label>

              <select
                value={priceRange}
                onChange={(e) =>
                  setPriceRange(
                    e.target.value
                  )
                }
              >
                <option value="">
                  Any
                </option>

                <option value="10000">
                  Below 10k
                </option>

                <option value="20000">
                  above 10k
                </option>

      
              </select>
            </div>
          </div>

          <button
            onClick={handleSearch}
          >
            Search Properties
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;