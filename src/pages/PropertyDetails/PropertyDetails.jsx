import {
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";

import { useEffect, useState } from "react";

import "./PropertyDetails.css";

import {
  FaMapMarkerAlt,
  FaBuilding,
  FaLayerGroup,
  FaCalendarAlt,
} from "react-icons/fa";

import PropertySidebar from "../../components/PropertySidebar/PropertySidebar";
import PropertyDescription from "../../components/PropertyDescription/PropertyDescription";
import PropertySpecifications from "../../components/PropertySpecifications/PropertySpecifications";
import PropertyLocation from "../../components/PropertyLocation/PropertyLocation";

import { getPropertyById } from "../../api/propertyApi";

function PropertyDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const location = useLocation();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setShowLoginPopup(true);
    }
  }, []);

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    try {
      const data = await getPropertyById(id);

      console.log("Property Data:", data);

      setProperty(data);
    } catch (error) {
      console.error("Property Error:", error);
      console.error(error?.response?.data);
    } finally {
      setLoading(false);
    }
  };

  // SAFE IMAGE ARRAY
  const images =
    property?.imageUrls?.length > 0
      ? property.imageUrls.map(
          (img) => `http://localhost:8080${img}`
        )
      : property?.coverImage
      ? [`http://localhost:8080${property.coverImage}`]
      : [
          "https://via.placeholder.com/800x500?text=Property",
          "https://via.placeholder.com/800x500?text=Property",
          "https://via.placeholder.com/800x500?text=Property",
        ];

  // AUTO SLIDER
  useEffect(() => {
    if (!images.length) return;

    const interval = setInterval(() => {
      setCurrentImage((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!property) {
    return <h2>Property Not Found</h2>;
  }

  if (showLoginPopup) {
    return (
      <div className="login-popup-overlay">
        <div className="login-popup">
          <h2>Login Required</h2>

          <p>
            Please login or create an account to
            continue and view property details.
          </p>

          <div className="login-popup-buttons">
            <button
              className="login-btn"
              onClick={() =>
                navigate("/login", {
                  state: {
                    redirectTo: location.pathname,
                  },
                })
              }
            >
              Login
            </button>

            <button
              className="signup-btn"
              onClick={() =>
                navigate("/signup", {
                  state: {
                    redirectTo: location.pathname,
                  },
                })
              }
            >
              Signup
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="property-details">
      <div className="container">

        {/* Desktop Gallery */}

        <div className="gallery desktop-gallery">
          <div className="main-image">
            <img
              src={images[0]}
              alt="Property"
            />
          </div>

          <div className="side-images">
            <img
              src={images[1] || images[0]}
              alt="Property"
            />

            <img
              src={images[2] || images[0]}
              alt="Property"
            />
          </div>
        </div>

        {/* Mobile Gallery */}

        <div className="mobile-gallery">
          <img
            src={images[currentImage]}
            alt="Property"
            className="mobile-slide-img"
          />

          <div className="slider-dots">
            {images.map((_, index) => (
              <span
                key={index}
                className={
                  currentImage === index
                    ? "dot active-dot"
                    : "dot"
                }
                onClick={() =>
                  setCurrentImage(index)
                }
              />
            ))}
          </div>
        </div>

        <div className="details-layout">
          <div className="details-left">

            <div className="details-header">
              <div>
                <div className="badges">
                  <span className="premium">
                    Featured
                  </span>

                  <span className="category">
                    {property.propertyCategory}
                  </span>
                </div>

                <h1>
                  {property.propertyName}
                </h1>

                <p>
                  <FaMapMarkerAlt />
                  {property.city},
                  {" "}
                  {property.state}
                </p>
              </div>

              <div className="price">
                ₹
                {Number(
                  property.monthlyRent
                ).toLocaleString("en-IN")}
              </div>
            </div>

            <div className="feature-box">
              <div>
                <FaBuilding />
                {property.propertyType}
              </div>

              <div>
                <FaLayerGroup />
                {property.bhk} BHK
              </div>

              <div>
                <FaBuilding />
                {property.furnishingStatus}
              </div>

              <div>
                 <FaCalendarAlt />  Property Age : 
                {property.propertyAge}
              </div>
            </div>

            <PropertyDescription
              description={
                property.description
              }
            />

            <PropertySpecifications
              property={property}
            />

            <PropertyLocation
              property={property}
            />
          </div>

          <PropertySidebar
            property={property}
          />
        </div>
      </div>
    </section>
  );
}

export default PropertyDetails;