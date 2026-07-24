import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaEdit,
  FaTrash,
  FaEye,
} from "react-icons/fa";

import { getMyProperties } from "../../api/propertyApi";

import "./MyListings.css";

function MyListings() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadListings();
  }, []);

  const loadListings = async () => {
    try {
      const data = await getMyProperties();
      setProperties(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="my-listings">

      <div className="listing-header">

        <h2>My Properties</h2>

        <span>
          {properties.length} Properties
        </span>

      </div>

      {properties.length === 0 ? (

        <div className="empty-listing">

          <h3>No Properties Found</h3>

          <p>
            Start by adding your first property.
          </p>

        </div>

      ) : (

        <div className="listing-grid">

          {properties.map((property) => (

            <div
              className="listing-card"
              key={property.id}
            >

              <div className="listing-image">

                <img
                  src={
                    property.coverImage
                      ? `https://toletboards.com${property.coverImage}`
                      : "/images/no-image.jpg"
                  }
                  alt={property.propertyName}
                />

                <span
                  className={
                    property.approved
                      ? "approved"
                      : "pending"
                  }
                >
                  {property.approved
                    ? "Approved"
                    : "Pending"}
                </span>

              </div>

              <div className="listing-content">

                <h3>
                  {property.propertyName}
                </h3>

                <p className="location">

                  <FaMapMarkerAlt />

                  {property.city},{" "}
                  {property.state}

                </p>

                <h2>
                  ₹
                  {Number(
                    property.monthlyRent
                  ).toLocaleString("en-IN")}
                  <small>/month</small>
                </h2>

                <div className="listing-details">

                  <span>
                    {property.propertyCategory}
                  </span>

                  <span>
                    {property.bhk} BHK
                  </span>

                  <span>
                    {property.propertyStatus}
                  </span>

                </div>

                <div className="listing-actions">

                  <Link
                    to={`/properties/${property.id}`}
                    className="view-btn"
                  >
                    <FaEye />
                    View
                  </Link>

                  <Link
                    to={`/edit-property/${property.id}`}
                    className="edit-btn"
                  >
                    <FaEdit />
                    Edit
                  </Link>

                  <button
                    className="delete-btn"
                  >
                    <FaTrash />
                    Delete
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default MyListings;