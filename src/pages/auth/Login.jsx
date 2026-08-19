import { Link, useNavigate, useLocation} from "react-router-dom";
import { useState,useEffect  } from "react";
import {
  FaEnvelope,
  FaLock,
  FaPhone,
  FaEye,
  FaEyeSlash
} from "react-icons/fa";
import api from "../../api/api";
import "./Auth.css";


import banner from "../../assets/images/auth-banner.png";
 
function Login() {
  const navigate = useNavigate();
  const location = useLocation();

const redirectTo =
  location.state?.redirectTo || "/";

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [googleCredential, setGoogleCredential] = useState(null);
const [showPhoneForm, setShowPhoneForm] = useState(false);
const [phone, setPhone] = useState("");
const [phoneError, setPhoneError] = useState("");
const [googleUser, setGoogleUser] = useState(null);
const [errors, setErrors] = useState({
  identifier: "",
  password: "",
});
const [loginError, setLoginError] = useState("");

const [showPassword, setShowPassword] = useState(false);

 const handleChange = (e) => {
  const { name, value } = e.target;

  let newValue = value;

  if (name === "identifier") {

    if (/^\d/.test(value)) {
      newValue = value.replace(/\D/g, "");
    }

    newValue = newValue.slice(0, 32);
  }

  if (name === "password") {
    newValue = value.slice(0, 16);
  }

  setFormData((prev) => ({
    ...prev,
    [name]: newValue,
  }));

  // Clear field validation error
  setErrors((prev) => ({
    ...prev,
    [name]: "",
  }));

  // Clear backend login error
  setLoginError("");
};

const validateForm = () => {
  const newErrors = {
    identifier: "",
    password: "",
  };

  const identifier = formData.identifier.trim();
  const password = formData.password;

  // Identifier validation
  if (!identifier) {
    newErrors.identifier = "Email or phone number is required.";
  } else if (identifier.length < 5) {
    newErrors.identifier =
      "Email or phone number must be at least 5 characters.";
  } else if (identifier.length > 32) {
    newErrors.identifier =
      "Email or phone number cannot exceed 32 characters.";
  } else if (/^\d+$/.test(identifier)) {
    // Phone validation
    if (identifier.length !== 10) {
      newErrors.identifier =
        "Phone number must be exactly 10 digits.";
    }
  } else {
    // Email validation
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(identifier)) {
      newErrors.identifier =
        "Please enter a valid email or 10-digit phone number.";
    }
  }

  // Password validation
  if (!password) {
    newErrors.password = "Password is required.";
  } else if (password.length < 5) {
    newErrors.password =
      "Password must be at least 5 characters.";
  } else if (password.length > 16) {
    newErrors.password =
      "Password cannot exceed 16 characters.";
  }

  setErrors(newErrors);

  return !newErrors.identifier && !newErrors.password;
};

const handleLogin = async () => {

  if (!validateForm()) {
    return;
  }

  try {
    setLoading(true);

    const response = await api.post("/auth/login", {
      identifier: formData.identifier.trim(),
      password: formData.password,
    });

    const {
      accessToken,
      refreshToken,
      userId,
      role,
    } = response.data;

    localStorage.setItem("token", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("userId", userId);
    localStorage.setItem("role", role);

    if (role === "ROLE_ADMIN") {
      navigate("/");
    } else {
      navigate(redirectTo || "/");
    }

  } catch (error) {

  console.error(
    "Login Failed:",
    error.response?.data || error
  );

  if (error.response) {

    setLoginError(
      error.response.data?.message ||
      "Login failed. Please try again."
    );

  } else {

    setLoginError(
      "Unable to connect to the server. Please try again."
    );

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
  {formData.identifier.match(/^\d/) ? (
    <FaPhone />
  ) : (
    <FaEnvelope />
  )}

  <input
    type="text"
    name="identifier"
    placeholder="Email or phone number"
    value={formData.identifier}
    maxLength={32}
    onChange={handleChange}
  />
</div>

<div className="input-box password-box">

  <FaLock />

  <input
    type={showPassword ? "text" : "password"}
    name="password"
    placeholder="Password"
    value={formData.password}
    maxLength={16}
    onChange={handleChange}
  />

  <button
    type="button"
    className="password-eye"
    onClick={() =>
      setShowPassword((prev) => !prev)
    }
  >
    {showPassword ? <FaEyeSlash /> : <FaEye />}
  </button>

</div>

{/* Field validation errors */}

{(errors.identifier || errors.password) && (
  <p className="input-error">

    {errors.identifier && (
      <>
        {errors.identifier}
        {errors.password && <br />}
      </>
    )}

    {errors.password && errors.password}

  </p>
)}

{/* Backend login error */}

{loginError && (
  <p className="input-error backend-error">
    {loginError}
  </p>
)}

         <button
  className="auth-btn"
  onClick={handleLogin}
  
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