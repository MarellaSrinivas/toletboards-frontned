import { Link, useNavigate, useLocation} from "react-router-dom";
import { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import api from "../../api/api";
import "./Auth.css";

import banner from "../../assets/images/auth-banner.png";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

const redirectTo =
  location.state?.redirectTo || "/dashboard";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
const handleLogin = async () => {
  try {
    setLoading(true);

    const response = await api.post("/auth/login", {
      email: formData.email,
      password: formData.password,
    });

    console.log("Login Success:", response.data);

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

    // Navigate after successful login
navigate(redirectTo);

  } catch (error) {
    console.error("Login Failed:", error);

    if (error.response) {
      alert(error.response.data.message || "Login failed.");
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
          <h1>Welcome Back.</h1>

          <p>
            Login and manage your properties with ease.
          </p>
        </div>
      </div>

      <div className="right-section">
        <div className="form-box">
          <h1>Login</h1>

          <p>Login to continue.</p>

          <div className="input-box">
            <FaEnvelope />
            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              value={formData.email}
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
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="bottom-text">
            Don't have an account?
<Link
  to="/signup"
  state={{ redirectTo }}
>
  Signup
</Link>          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;