import "./Footer.css";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">

      <div className="container">

        <div className="footer-grid">

          {/* Company */}

          <div className="footer-column">

            <h3>TO-LET BOARDS</h3>

            <p>
              A subsidiary of SR Realty Properties.
              The gold standard in B2B real estate
              management and board visibility
              solutions.
            </p>

            <div className="social-icons">

              <a href="#">
                <FaFacebookF />
              </a>

              <a href="https://www.instagram.com/tolet_boards/">
                <FaInstagram />
              </a>

              <a href="#">
                <FaLinkedinIn />
              </a>

            </div>

          </div>

          {/* Market */}

          <div className="footer-column">

            <h4>Market Insights</h4>

            <ul>

              <li>
                <a href="/aboutus">About Us</a>
              </li>

              <li>
                <a href="/list-property">List Property</a>
              </li>

              <li>
                <a href="#">Market Insights</a>
              </li>

            </ul>

          </div>

          {/* Legal */}

          <div className="footer-column">

            <h4>Legal</h4>

            <ul>

              <li>
                <a href="terms-and-conditions">Terms of Service</a>
              </li>

              <li>
                <a href="privacy-policy">Privacy Policy</a>
              </li>

              <li>
                <a href="#">Cookie Settings</a>
              </li>

            </ul>

          </div>

          {/* Contact */}

          <div className="footer-column">

            <h4>Contact Support</h4>

            <p>
              Questions or enquiries?
              Reach out to our 24/7
              dedicated desk.
            </p>

            <div className="phone">

              <FaPhoneAlt />

              <span>+91 75696 85696</span>

            </div>

          </div>

        </div>

      </div>

      <div className="footer-bottom">

        © 2026 TO-LET BOARDS. All Rights Reserved.

      </div>

    </footer>
  );
}

export default Footer;