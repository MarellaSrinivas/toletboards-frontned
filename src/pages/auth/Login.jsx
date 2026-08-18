import { Link, useNavigate, useLocation} from "react-router-dom";
import { useState,useEffect  } from "react";
import { FaEnvelope, FaLock, FaPhone } from "react-icons/fa";
import api from "../../api/api";
import "./Auth.css";


import banner from "../../assets/images/auth-banner.png";
 
function Login() {
  const navigate = useNavigate();
  const location = useLocation();

const redirectTo =
  location.state?.redirectTo || "/";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [googleCredential, setGoogleCredential] = useState(null);
const [showPhoneForm, setShowPhoneForm] = useState(false);
const [phone, setPhone] = useState("");
const [phoneError, setPhoneError] = useState("");
const [googleUser, setGoogleUser] = useState(null);


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

    const {
      accessToken,
      refreshToken,
      userId,
      role,
    } = response.data;

    // Store authentication data
    localStorage.setItem("token", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("userId", userId);
    localStorage.setItem("role", role);

    // Navigate according to role
    if (role === "ROLE_ADMIN") {
      navigate("/");
    } else {
      navigate(redirectTo || "/");
    }

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


 
const handleGoogleSuccess = async (response) => {
  try {
    setLoading(true);

    const result = await api.post("/auth/google", {
      credential: response.credential,
    });

    console.log("Google response:", result.data);

    // ============================================
    // NEW USER - PHONE REQUIRED
    // ============================================

    if (result.data.phoneRequired === true) {
      setGoogleCredential(response.credential);

      setGoogleUser({
        fullName: result.data.fullName,
        email: result.data.email,
      });

      setPhone("");

      setShowPhoneForm(true);

      return;
    }


    // ============================================
    // EXISTING USER
    // ============================================

    const authResponse = result.data.authResponse;

    if (!authResponse) {
      throw new Error("Authentication response missing");
    }

    const {
      accessToken,
      refreshToken,
      userId,
      role,
      fullName,
      email,
    } = authResponse;


    localStorage.setItem(
      "token",
      accessToken
    );

    localStorage.setItem(
      "refreshToken",
      refreshToken
    );

    localStorage.setItem(
      "userId",
      userId
    );

    localStorage.setItem(
      "role",
      role
    );

    localStorage.setItem(
      "fullName",
      fullName
    );

    localStorage.setItem(
      "email",
      email
    );


    if (role === "ROLE_ADMIN") {

      navigate("/");

    } else {

      navigate(
        redirectTo || "/"
      );
    }


  } catch (error) {

    console.error(
      "Google login failed:",
      error.response?.data || error
    );

    alert(
      error.response?.data?.message ||
      "Google login failed"
    );

  } finally {

    setLoading(false);

  }
};

const handleCompleteGoogleRegistration = async () => {

  if (!phone) {
    setPhoneError("Phone number is required.");
    return;
  }

  if (phone.length !== 10) {
    setPhoneError(
      "Please enter a valid 10-digit phone number."
    );
    return;
  }

  setPhoneError("");

  try {

    setLoading(true);

    const response = await api.post(
      "/auth/google/complete",
      {
        credential: googleCredential,
        phone: phone,
      }
    );

    const data = response.data;

    const authResponse =
      data.authResponse || data;

    const {
      accessToken,
      refreshToken,
      userId,
      role,
      fullName,
      email,
    } = authResponse;


    localStorage.setItem(
      "token",
      accessToken
    );

    localStorage.setItem(
      "refreshToken",
      refreshToken
    );

    localStorage.setItem(
      "userId",
      userId
    );

    localStorage.setItem(
      "role",
      role
    );

    localStorage.setItem(
      "fullName",
      fullName
    );

    localStorage.setItem(
      "email",
      email
    );


    if (role === "ROLE_ADMIN") {

      navigate("/");

    } else {

      navigate(
        redirectTo || "/"
      );

    }

  } catch (error) {

    console.error(
      "Google registration failed:",
      error.response?.data || error
    );

    setPhoneError(
      error.response?.data?.message ||
      "Unable to create account"
    );

  } finally {

    setLoading(false);

  }
};
useEffect(() => {
  if (!window.google) {
    console.error("Google Identity Services not loaded");
    return;
  }

  const googleButton = document.getElementById("google-login-button");

  if (!googleButton) {
    return;
  }

  window.google.accounts.id.initialize({
    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,

    callback: handleGoogleSuccess,
  });

  window.google.accounts.id.renderButton(
    googleButton,
    {
      theme: "outline",
      size: "large",
      width: 350,
      text: "signin_with",
      shape: "rectangular",
    }
  );
}, []);



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

        {showPhoneForm ? (

  <div className="google-phone-form">

    <h2>Complete Your Registration</h2>

    <p>
      We need your phone number to create your ToLet Boards account.
    </p>

   <div className="input-box">
  <FaPhone />

  <input
    type="tel"
    placeholder="Enter 10-digit phone number"
    value={phone}
    maxLength={10}
    onChange={(e) => {
      const value = e.target.value.replace(/\D/g, "");

      setPhone(value);

      if (value.length === 10) {
        setPhoneError("");
      }
    }}
  />
</div>

{phoneError && (
  <p className="phone-error">
    {phoneError}
  </p>
)}
    <button
      className="auth-btn"
      onClick={handleCompleteGoogleRegistration}
      disabled={loading || phone.length !== 10}
    >
      {loading
        ? "Creating Account..."
        : "Continue"}
    </button>

  </div>

) : (
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



<div className="auth-divider">
  <span>OR</span>
</div>

<div
  id="google-login-button"
  className="google-login-button"
></div>

<p className="bottom-text">
  Don't have an account?

  <Link
    to="/signup"
    state={{ redirectTo }}
  >
    Signup
  </Link>
</p>
        </div>
        )}

      </div>
      
    </div>

    
  );
}

export default Login;