import { useEffect, useState } from "react";
import "./PropertySection.css";
import PropertyCard from "../PropertyCard/PropertyCard";
import { FaArrowRight } from "react-icons/fa";
import { getAllProperties } from "../../api/propertyApi";

function PropertySection() {

  const [properties, setProperties] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchProperties();

  }, []);

  const fetchProperties = async () => {

    try {

      const data = await getAllProperties();

      setProperties(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  return (

    <section className="property-section">

      <div className="container">

        <div className="section-header">

          <div>

            <h2>Featured Properties</h2>

            <p>
              Browse the latest verified properties.
            </p>

          </div>

        <a href="/Properties"  > <button className="view-all-btn">

            View All Listings

            <FaArrowRight />

          </button> </a>

        </div>

        {loading ? (

          <h3>Loading...</h3>

        ) : (

          <div className="property-grid">

            {properties.map((property) => (

              <PropertyCard
                key={property.id}
                property={property}
              />

            ))}

          </div>

        )}

      </div>

    </section>

  );
}

export default PropertySection;