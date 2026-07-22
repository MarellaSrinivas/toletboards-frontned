import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Header.css";
import PostPropertyModal from "../PostPropertyModal/PostPropertyModal";
import {
  FaUserCircle,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import logo from "../../assets/images/logo.png";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const navigate = useNavigate();

  // Profile icon click
  const handleProfileClick = () => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  // Post Property button click
  const handlePostProperty = () => {
    const token = localStorage.getItem("token");

    if (token) {
      setShowModal(true);
    } else {
      setShowLoginPopup(true);
    }
  };

  return (

    
    <header className="header">
      <div className="container header-container">

        {/* Logo */}
      <Link to="/" className="logo">
  <img src={logo} alt="Logo" />
</Link>

        {/* Desktop Navigation */}
        <nav className="nav desktop-nav">
          <a href="#">About Us</a>
          <a href="#">Properties</a>
           <a href="#">Dashboard</a>
        </nav>

        {/* Desktop Right */}
        <div className="header-right desktop-right">
      <button
  className="post-btn"
  onClick={handlePostProperty}
>
  Post Property
</button>

         <FaUserCircle
  className="profile-icon"
  onClick={handleProfileClick}
/>
        </div>

        {/* Mobile Hamburger */}
       {/* Mobile Actions */}
<div className="mobile-actions">

<button
  className="mobile-post-btn"
  onClick={handlePostProperty}
>
  Post Property
</button>

<FaUserCircle
  className="profile-icon mobile-profile"
  onClick={handleProfileClick}
/>
  <div
    className="hamburger"
    onClick={() => setMenuOpen(true)}
  >
    <FaBars />
  </div>

</div>

      </div>

      {/* Overlay */}
      <div
        className={`overlay ${menuOpen ? "show" : ""}`}
        onClick={() => setMenuOpen(false)}
      ></div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? "active" : ""}`}>

        <div className="mobile-header">

  <Link
    to="/"
    onClick={() => setMenuOpen(false)}
    className="logo"
  >
    <img src={logo} alt="Logo" />
  </Link>

  <FaTimes
    className="close"
    onClick={() => setMenuOpen(false)}
  />

</div>

        <a href="#">About Us</a>

        <a href="#">Properties</a>


        <a href="#">Dashboard</a>

       <button
  className="post-btn mobile-btn"
  onClick={handlePostProperty}
>
  Post Property
</button>

      </div>

      <PostPropertyModal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
/>


{showLoginPopup && (
  <div className="login-popup-overlay">
    <div className="login-popup">

      <h2>Login Required</h2>

      <p>
        Please login or create an account to post
        your property.
      </p>

      <div className="login-popup-buttons">

      <button
  className="login-btn"
  onClick={() => {
    setShowLoginPopup(false);

    navigate("/login", {
      state: {
        redirectTo: "/",
      },
    });
  }}
>
  Login
</button>

       <button
  className="signup-btn"
  onClick={() => {
    setShowLoginPopup(false);

    navigate("/signup", {
      state: {
        redirectTo: "/",
      },
    });
  }}
>
  Signup
</button>

      </div>

    </div>
  </div>
)}
    </header>
  );
}

export default Header;