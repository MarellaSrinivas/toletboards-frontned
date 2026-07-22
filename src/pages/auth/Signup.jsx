import "./Auth.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
} from "react-icons/fa";

import banner from "../../assets/images/auth-banner.png";
import api from "../../api/api";

function Signup() {
  const navigate = useNavigate();
  const location = useLocation();

const redirectTo =
  location.state?.redirectTo || "/dashboard";

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
const handleSignup = async () => {
  try {
    setLoading(true);

    const response = await api.post("/auth/register", {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      role: "ROLE_USER",
    });

    console.log("Signup Success:", response.data);

    alert("Account created successfully!");

    
    // Store tokens
    if (response.data.accessToken) {
      localStorage.setItem(
        "token",
        response.data.accessToken
      );
    }

    if (response.data.refreshToken) {
      localStorage.setItem(
        "refreshToken",
        response.data.refreshToken
      );
    }

    if (response.data.userId) {
      localStorage.setItem(
        "userId",
        response.data.userId
      );
    }

    // Preserve redirect path
  navigate(redirectTo);


  } catch (error) {
    console.error("Signup Failed:", error);

    if (error.response) {
      alert(error.response.data.message || "Signup failed.");
    } else {
      alert("Something went wrong!");
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="auth-page">
      <div className="left-section">
        <img src={banner} alt="" />

        <div className="overlay-content">
          <h1>
            Join the marketplace for premium properties.
          </h1>

          <p>
            Connect with property owners and tenants.
          </p>
        </div>
      </div>

      <div className="right-section">
        <div className="form-box">
          <h1>Create Account</h1>

          <p>Start your property journey today.</p>

          <div className="input-box">
            <FaUser />
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>

          <div className="input-box">
            <FaEnvelope />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="input-box">
            <FaPhone />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="input-box">
            <FaLock />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button
            className="auth-btn"
            onClick={handleSignup}
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          <p className="bottom-text">
            Already have an account?
<Link
  to="/login"
  state={{ redirectTo }}
>
  Login
</Link>          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;