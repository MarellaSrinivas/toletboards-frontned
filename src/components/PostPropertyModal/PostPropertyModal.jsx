import "./PostPropertyModal.css";
import {
  FaTimes,
  FaEdit,
  FaHeadset,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function PostPropertyModal({ isOpen, onClose }) {

        const navigate = useNavigate();


  if (!isOpen) return null;

  
          const handleStartListing = () => {
        onClose();
        navigate("/list-property");
    };
  return (

    <div className="modal-overlay">

      <div className="post-modal">

        <div className="modal-header">

          <div>

            <h2>Post Your Property</h2>

            <p>
              Select the best way to list your property on our platform.
            </p>

          </div>

          <FaTimes
            className="close-icon"
            onClick={onClose}
          />

        </div>

        <div className="modal-body">

          {/* Card 1 */}

          <div className="option-card">

            <div className="option-icon self">

              <FaEdit />

            </div>

            <h3>Post by myself</h3>

            <p>
              Fill out the details and manage your listing
              independently. Complete control over photos,
              pricing, and scheduling.
            </p>

            <button className="primary-option" onClick={handleStartListing}
>
              Start Listing
            </button>

          </div>

          {/* Card 2 */}

          <div className="option-card recommended">

            <span className="recommended-tag">
              RECOMMENDED
            </span>

            <div className="option-icon expert">

              <FaHeadset />

            </div>

            <h3>
              Need help for posting property
            </h3>

            <p>
              Let our experts help you with professional
              photos, virtual tours, and listing
              optimization.
            </p>

            <button className="secondary-option">
              Consult Expert
            </button>

          </div>

        </div>

        <div className="modal-footer">

          Unsure which to choose?

          <span> Compare Listing Plans</span>

        </div>

      </div>

    </div>

  );

}

export default PostPropertyModal;