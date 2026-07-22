import "./CTASection.css";

function CTASection() {
  return (
    <section className="cta-section">
      <div className="container">

        <div className="cta-card">

          <h2>Ready to Board Your Property?</h2>

          <p>
            Join India's fastest growing B2B real estate network.
            Professional board management and property matching
            at your fingertips.
          </p>

          <div className="cta-buttons">

            <button className="primary-btn">
              List a Property Now
            </button>

            <button className="secondary-btn">
              Contact Support
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}

export default CTASection;