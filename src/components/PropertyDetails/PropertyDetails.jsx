import "./PropertyDetails.css";

import { useParams } from "react-router-dom";
 
import {
  FaMapMarkerAlt,
  FaBuilding,
  FaLayerGroup,
  FaCalendarAlt,
} from "react-icons/fa";

import { properties } from "../../data/properties";

function PropertyDetails() {

  const { id } = useParams();

  const property = properties.find(
    item => item.id === Number(id)
  );

  if (!property) {

    return <h2>Property Not Found</h2>;

  }

  return (

    <section className="property-details">
 
      <div className="container">

        {/* Gallery */}

        <div className="gallery">

          <div className="main-image">

            <img
              src={property.image}
              alt={property.title}
            />

          </div>

          <div className="side-images">

            <img
              src={property.image}
              alt=""
            />

            <img
              src={property.image}
              alt=""
            />

          </div>

        </div>

        {/* Header */}

        <div className="details-header">

          <div>

            <div className="badges">

              <span className="premium">

                Featured

              </span>

              <span className="category">

                {property.category}

              </span>

            </div>

            <h1>

              {property.title}

            </h1>

            <p>

              <FaMapMarkerAlt />

              {property.location}

            </p>

          </div>

          <div className="price">

            {property.price}

          </div>

        </div>

        {/* Features */}

        <div className="feature-box">

          <div>

            <FaBuilding />

            Office Space

          </div>

          <div>

            <FaLayerGroup />

            3 Lifts

          </div>

          <div>

            <FaBuilding />

            Commercial

          </div>

          <div>

            <FaCalendarAlt />

            Built 2022

          </div>

        </div>

      </div>

    </section>

  );

}

export default PropertyDetails;