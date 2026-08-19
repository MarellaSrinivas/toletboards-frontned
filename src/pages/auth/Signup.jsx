import "./Auth.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaEye,
  FaEyeSlash
} from "react-icons/fa";

import banner from "../../assets/images/auth-banner.png";
import api from "../../api/api";

function Signup() {
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo =
    location.state?.redirectTo || "/";

  const [loading, setLoading] = useState(false);

  // ==========================================
  // NORMAL SIGNUP
  // ==========================================

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });

  // ==========================================
  // GOOGLE SIGNUP
  // ==========================================

  const [googleCredential, setGoogleCredential] =
    useState(null);

  const [showPhoneForm, setShowPhoneForm] =
    useState(false);

  const [phone, setPhone] = useState("");

  const [phoneError, setPhoneError] =
    useState("");

  const [googleUser, setGoogleUser] =
    useState(null);

const [errors, setErrors] = useState({
  fullName: "",
  email: "",
  phone: "",
  password: "",
});

const [showPassword, setShowPassword] = useState(false);

  // ==========================================
  // NORMAL INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {
  const { name } = e.target;
  let value = e.target.value;

  // ==========================================
  // FULL NAME
  // ==========================================
  if (name === "fullName") {
    // Allow only letters and spaces
    value = value.replace(/[^a-zA-Z\s]/g, "");

    // Maximum 50 characters
    value = value.slice(0, 50);
  }

  // ==========================================
  // EMAIL
  // ==========================================
  if (name === "email") {
    // Remove spaces
    value = value.replace(/\s/g, "");

    // Maximum 100 characters
    value = value.slice(0, 100);
  }

  // ==========================================
  // PHONE
  // ==========================================
  if (name === "phone") {
    // Only numbers
    value = value.replace(/\D/g, "");

    // Exactly maximum 10 digits
    value = value.slice(0, 10);
  }

  // ==========================================
  // PASSWORD
  // ==========================================
  if (name === "password") {
    // Maximum 50 characters
    value = value.slice(0, 50);
  }

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));

  // Clear error while user is correcting
  setErrors((prev) => ({
    ...prev,
    [name]: "",
  }));
};


const validateSignupForm = () => {
  const newErrors = {};

  const fullName = formData.fullName.trim();
  const email = formData.email.trim();
  const phone = formData.phone.trim();
  const password = formData.password;

  // ==========================================
  // FULL NAME
  // ==========================================

  if (!fullName) {
    newErrors.fullName = "Full name is required.";
  } else if (fullName.length < 2) {
    newErrors.fullName = "Name must be at least 2 characters.";
  } else if (fullName.length > 50) {
    newErrors.fullName = "Name cannot exceed 50 characters.";
  } else if (!/^[A-Za-z]+(?:\s[A-Za-z]+)*$/.test(fullName)) {
    newErrors.fullName =
      "Name can contain only letters and spaces.";
  }

  // ==========================================
  // EMAIL
  // ==========================================

  if (!email) {
    newErrors.email = "Email address is required.";
  } else if (email.length < 5) {
    newErrors.email = "Email must be at least 5 characters.";
  } else if (email.length > 100) {
    newErrors.email = "Email cannot exceed 100 characters.";
  } else if (
    !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)
  ) {
    newErrors.email = "Please enter a valid email address.";
  }

  // ==========================================
  // INDIAN PHONE NUMBER
  // ==========================================

  if (!phone) {
    newErrors.phone = "Phone number is required.";
  } else if (!/^[6-9]\d{9}$/.test(phone)) {
    newErrors.phone =
      "Enter a valid Indian 10-digit mobile number.";
  }

  // ==========================================
  // PASSWORD
  // ==========================================

  if (!password) {
    newErrors.password = "Password is required.";
  } else if (password.length < 8) {
    newErrors.password =
      "Password must be at least 8 characters.";
  } else if (password.length > 50) {
    newErrors.password =
      "Password cannot exceed 50 characters.";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};


  // ==========================================
  // NORMAL SIGNUP
  // ==========================================

  const handleSignup = async () => {

      if (!validateSignupForm()) {
    return;
  }

    try {

      setLoading(true);

      const response = await api.post(
        "/auth/register",
        {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          role: "ROLE_USER",
        }
      );

      console.log(
        "Signup Success:",
        response.data
      );

      // alert(
      //   "Account created successfully!"
      // );


      // ========================================
      // STORE AUTH DATA
      // ========================================

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

      if (response.data.role) {

        localStorage.setItem(
          "role",
          response.data.role
        );

      }

      if (response.data.fullName) {

        localStorage.setItem(
          "fullName",
          response.data.fullName
        );

      }

      if (response.data.email) {

        localStorage.setItem(
          "email",
          response.data.email
        );

      }


      navigate(
        redirectTo || "/"
      );


    }  catch (error) {

  console.error(
    "Signup Failed:",
    error.response?.data || error
  );

  const message =
    error.response?.data?.message ||
    "Signup failed. Please try again.";

  if (message.toLowerCase().includes("phone")) {
    setErrors((prev) => ({
      ...prev,
      phone: message,
    }));
  } else if (message.toLowerCase().includes("email")) {
    setErrors((prev) => ({
      ...prev,
      email: message,
    }));
  } else {
    setErrors((prev) => ({
      ...prev,
      fullName: message,
    }));
  }

} finally {

  setLoading(false);

}
  };


  // ==========================================
  // GOOGLE LOGIN / SIGNUP
  // ==========================================

  const handleGoogleSuccess = async (
    response
  ) => {

    try {

      setLoading(true);

      const result =
        await api.post(
          "/auth/google",
          {
            credential:
              response.credential,
          }
        );


      console.log(
        "Google response:",
        result.data
      );


      // ========================================
      // NEW GOOGLE USER
      // ========================================

      if (
        result.data.phoneRequired === true
      ) {

        setGoogleCredential(
          response.credential
        );

        setGoogleUser({
          fullName:
            result.data.fullName,

          email:
            result.data.email,
        });

        setPhone("");

        setPhoneError("");

        setShowPhoneForm(true);

        return;
      }


      // ========================================
      // EXISTING GOOGLE USER
      // ========================================

      const authResponse =
        result.data.authResponse;


      if (!authResponse) {

        throw new Error(
          "Authentication response missing"
        );

      }


      saveAuthentication(
        authResponse
      );


    } catch (error) {

      console.error(
        "Google signup failed:",
        error.response?.data ||
        error
      );

      alert(
        error.response?.data?.message ||
        "Google signup failed"
      );

    } finally {

      setLoading(false);

    }
  };


  // ==========================================
  // COMPLETE GOOGLE REGISTRATION
  // ==========================================

  const handleCompleteGoogleRegistration =
    async () => {

      if (!phone) {

        setPhoneError(
          "Phone number is required."
        );

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


        const response =
          await api.post(
            "/auth/google/complete",
            {
              credential:
                googleCredential,

              phone: phone,
            }
          );


        console.log(
          "Google registration:",
          response.data
        );


        const authResponse =
          response.data.authResponse ||
          response.data;


        if (!authResponse?.accessToken) {

          throw new Error(
            "Authentication response missing"
          );

        }


        saveAuthentication(
          authResponse
        );


      } catch (error) {

        console.error(
          "Google registration failed:",
          error.response?.data ||
          error
        );

        setPhoneError(
          error.response?.data?.message ||
          "Unable to create account"
        );

      } finally {

        setLoading(false);

      }

    };


  // ==========================================
  // SAVE AUTHENTICATION
  // ==========================================

  const saveAuthentication = (
    authResponse
  ) => {

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


    // ========================================
    // REDIRECT
    // ========================================

    if (role === "ROLE_ADMIN") {

      navigate("/");

    } else {

      navigate(
        redirectTo || "/"
      );

    }

  };


  // ==========================================
  // GOOGLE BUTTON
  // ==========================================

  useEffect(() => {

    if (!window.google) {

      console.error(
        "Google Identity Services not loaded"
      );

      return;
    }


    const googleButton =
      document.getElementById(
        "google-signup-button"
      );


    if (!googleButton) {

      return;

    }


    window.google.accounts.id.initialize({

      client_id:
        import.meta.env.VITE_GOOGLE_CLIENT_ID,

      callback:
        handleGoogleSuccess,

    });


    window.google.accounts.id.renderButton(

      googleButton,

      {
        theme: "outline",
        size: "large",
        width: 350,
        text: "signup_with",
        shape: "rectangular",
      }

    );

  }, []);


  // ==========================================
  // UI
  // ==========================================

  return (

    <div className="auth-page">

      {/* =====================================
          LEFT
      ====================================== */}

      <div className="left-section">

        <img
          src={banner}
          alt=""
        />

        <div className="overlay-content">

          <h1>
            Join the marketplace for premium properties.
          </h1>

          <p>
            Connect with property owners and tenants.
          </p>

        </div>

      </div>


      {/* =====================================
          RIGHT
      ====================================== */}

      <div className="right-section">


        {/* ===================================
            GOOGLE PHONE FORM
        ==================================== */}

        {showPhoneForm ? (

          <div className="google-phone-form">

            <h2>
              Complete Your Registration
            </h2>


            <p>
              {googleUser?.email
                ? `Welcome ${googleUser.email}`
                : "We need your phone number to create your account."
              }
            </p>


            <div className="input-box">

              <FaPhone />

              <input
                type="tel"
                placeholder="Enter 10-digit phone number"
                value={phone}
                maxLength={10}

                onChange={(e) => {

                  const value =
                    e.target.value.replace(
                      /\D/g,
                      ""
                    );

                  setPhone(value);

                  if (
                    value.length === 10
                  ) {

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
              onClick={
                handleCompleteGoogleRegistration
              }
              disabled={
                loading ||
                phone.length !== 10
              }
            >

              {loading
                ? "Creating Account..."
                : "Continue"
              }

            </button>


          </div>

        ) : (


          /* =================================
             NORMAL SIGNUP FORM
          ================================== */

          <div className="form-box">

            <h1>
              Create Account
            </h1>

            <p>
              Start your property journey today.
            </p>


            {/* Full Name */}

            <div className="input-box">

  <FaUser />

  <input
    type="text"
    name="fullName"
    placeholder="Full Name"
    value={formData.fullName}
    maxLength={50}
    onChange={handleChange}
  />

</div>

{errors.fullName && (
  <p className="input-error">
    {errors.fullName}
  </p>
)}


            {/* Email */}

            <div className="input-box">

  <FaEnvelope />

  <input
    type="email"
    name="email"
    placeholder="Email Address"
    value={formData.email}
    maxLength={100}
    onChange={handleChange}
  />

</div>

{errors.email && (
  <p className="input-error">
    {errors.email}
  </p>
)}


            {/* Phone */}

           <div className="input-box">

  <FaPhone />

  <input
    type="tel"
    name="phone"
    placeholder="10-digit Mobile Number"
    value={formData.phone}
    maxLength={10}
    inputMode="numeric"
    onChange={handleChange}
  />

</div>

{errors.phone && (
  <p className="input-error">
    {errors.phone}
  </p>
)}


            {/* Password */}

            <div className="input-box">

  <FaLock />

  <input
    type={showPassword ? "text" : "password"}
    name="password"
    placeholder="Password"
    value={formData.password}
    maxLength={50}
    onChange={handleChange}
  />

  <button
    type="button"
    className="password-toggle"
    onClick={() =>
      setShowPassword((prev) => !prev)
    }
    aria-label={
      showPassword
        ? "Hide password"
        : "Show password"
    }
  >
    {showPassword ? (
      <FaEyeSlash />
    ) : (
      <FaEye />
    )}
  </button>

</div>

{errors.password && (
  <p className="input-error">
    {errors.password}
  </p>
)}


            {/* Normal Signup */}

            <button
              className="auth-btn"
              onClick={
                handleSignup
              }
              disabled={loading}
            >

              {loading
                ? "Creating Account..."
                : "Create Account"
              }

            </button>


            {/* OR */}

            <div className="auth-divider">

              <span>
                OR
              </span>

            </div>


            {/* GOOGLE */}

            <div
              id="google-signup-button"
              className="google-login-button"
            ></div>


            {/* Login */}

            <p className="bottom-text">

              Already have an account?

              <Link
                to="/login"
                state={{
                  redirectTo
                }}
              >
                Login
              </Link>

            </p>


          </div>

        )}

      </div>

    </div>

  );
}

export default Signup;