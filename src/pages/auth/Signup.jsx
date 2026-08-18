import "./Auth.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

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


  // ==========================================
  // NORMAL INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  };


  // ==========================================
  // NORMAL SIGNUP
  // ==========================================

  const handleSignup = async () => {

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

      alert(
        "Account created successfully!"
      );


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


    } catch (error) {

      console.error(
        "Signup Failed:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Signup failed."
      );

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
                value={
                  formData.fullName
                }
                onChange={
                  handleChange
                }
              />

            </div>


            {/* Email */}

            <div className="input-box">

              <FaEnvelope />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={
                  formData.email
                }
                onChange={
                  handleChange
                }
              />

            </div>


            {/* Phone */}

            <div className="input-box">

              <FaPhone />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={
                  formData.phone
                }
                onChange={
                  handleChange
                }
              />

            </div>


            {/* Password */}

            <div className="input-box">

              <FaLock />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={
                  formData.password
                }
                onChange={
                  handleChange
                }
              />

            </div>


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