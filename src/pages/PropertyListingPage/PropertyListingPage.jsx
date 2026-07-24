import "./PropertyListingPage.css";

import { useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";

import PropertyCard from "../../components/PropertyCard/PropertyCard";

import { FaMapMarkerAlt } from "react-icons/fa";

import { getAllProperties } from "../../api/propertyApi";

function PropertyListingPage() {
  const [searchParams] =
    useSearchParams();

  const city =
    searchParams.get("city");

  const type =
    searchParams.get("type");

  const price =
    searchParams.get("price");

  const [properties, setProperties] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

    const [allProperties, setAllProperties] = useState([]);

const [selectedBhk, setSelectedBhk] = useState("");

const [selectedType, setSelectedType] =
  useState(type || "");

const [selectedFurnishing, setSelectedFurnishing] =
  useState("");

const [maxPrice, setMaxPrice] = useState(
  price ? Number(price) : 150000
);
const [searchArea, setSearchArea] = useState(city || "");

const [sortBy, setSortBy] =
  useState("newest");
  useEffect(() => {
    fetchProperties();
  }, []);


  const [showFilters, setShowFilters] =
  useState(false);


 const fetchProperties = async () => {
  try {
    const data = await getAllProperties();

    let filtered = [...data];

    // City Filter
    if (city) {
      filtered = filtered.filter(
        (item) =>
          item.city
            ?.toLowerCase()
            .includes(city.toLowerCase())
      );
    }

    // Property Type Filter
    if (type) {
      filtered = filtered.filter(
        (item) =>
          item.propertyType === type
      );
    }

    // Price Filter from Hero
    if (price) {
      const selectedPrice = Number(price);

      if (selectedPrice === 10000) {
        filtered = filtered.filter(
          (item) =>
            Number(item.monthlyRent) <= 10000
        );
      }

      if (selectedPrice === 20000) {
        filtered = filtered.filter(
          (item) =>
            Number(item.monthlyRent) > 10000
        );
      }
    }

    setAllProperties(data);
    setProperties(filtered);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

const applyFilters = () => {
  let filtered = [...allProperties];

  if (searchArea.trim()) {
    filtered = filtered.filter(
      (item) =>
        item.city
          ?.toLowerCase()
          .includes(
            searchArea.toLowerCase()
          ) ||
        item.address
          ?.toLowerCase()
          .includes(
            searchArea.toLowerCase()
          )
    );
  }

  if (selectedType) {
    filtered = filtered.filter(
      (item) =>
        item.propertyType === selectedType
    );
  }

  if (selectedBhk) {
    filtered = filtered.filter(
      (item) =>
        Number(item.bhk) ===
        Number(selectedBhk)
    );
  }

  if (selectedFurnishing) {
    filtered = filtered.filter(
      (item) =>
        item.furnishingStatus ===
        selectedFurnishing
    );
  }

  filtered = filtered.filter(
    (item) =>
      Number(item.monthlyRent) <=
      Number(maxPrice)
  );

  setProperties(filtered);
};

const resetFilters = () => {
  setSelectedBhk("");
  setSelectedType("");
  setSelectedFurnishing("");
  setMaxPrice(150000);

  setProperties(allProperties);
};


const handleAreaSearch = () => {
  let filtered = [...allProperties];

  if (searchArea.trim()) {
    filtered = filtered.filter(
      (item) =>
        item.city
          ?.toLowerCase()
          .includes(
            searchArea.toLowerCase()
          ) ||
        item.address
          ?.toLowerCase()
          .includes(
            searchArea.toLowerCase()
          )
    );
  }

  setProperties(filtered);
};


const handleSort = (value) => {
  setSortBy(value);

  let sorted = [...properties];

  switch (value) {
    case "priceLow":
      sorted.sort(
        (a, b) =>
          a.monthlyRent -
          b.monthlyRent
      );
      break;

    case "priceHigh":
      sorted.sort(
        (a, b) =>
          b.monthlyRent -
          a.monthlyRent
      );
      break;

    case "bhk":
      sorted.sort(
        (a, b) => b.bhk - a.bhk
      );
      break;

    default:
      sorted.sort(
        (a, b) => b.id - a.id
      );
  }

  setProperties(sorted);
};
  return (
    <div className="listing-page">
      <div className="container">
        <div className="listing-layout">
          {/* Sidebar */}

          <div className="filter-sidebar">

  <div className="filter-header">
    <h3>Filters</h3>

    <button
      className="reset-btn"
      onClick={resetFilters}
    >
      Reset
    </button>
  </div>

  {/* Price */}

  <div className="filter-group">

    <h4>Price Range (₹/mo)</h4>

    <input
  type="range"
  min="5000"
  max="150000"
  step="5000"
  value={maxPrice}
  onChange={(e) =>
    setMaxPrice(e.target.value)
  }
/>

<div className="price-value">
  Up to ₹
  {Number(maxPrice).toLocaleString("en-IN")}
</div>

  </div>

  {/* BHK */}

  <div className="filter-group">

    <h4>BHK Type</h4>

    <div className="bhk-grid">

      {[1, 2, 3, 4].map((bhk) => (
        <button
          key={bhk}
          className={
            selectedBhk === bhk
              ? "active-filter"
              : ""
          }
          onClick={() =>
            setSelectedBhk(bhk)
          }
        >
          {bhk} BHK
        </button>
      ))}

    </div>

  </div>

  {/* Property Type */}

  <div className="filter-group">

    <h4>Property Type</h4>

    <select
      value={selectedType}
      onChange={(e) =>
        setSelectedType(
          e.target.value
        )
      }
    >
      <option value="">
        All
      </option>

      <option value="Residential">
        Residential
      </option>

      <option value="Commercial">
        Commercial
      </option>

    </select>

  </div>

  {/* Furnishing */}

  <div className="filter-group">

    <h4>Furnishing Status</h4>

    <div className="furnishing-grid">

      {[
        "Fully Furnished",
        "Semi Furnished",
        "Unfurnished",
      ].map((item) => (
        <button
          key={item}
          className={
            selectedFurnishing ===
            item
              ? "active-filter"
              : ""
          }
          onClick={() =>
            setSelectedFurnishing(
              item
            )
          }
        >
          {item}
        </button>
      ))}

    </div>

  </div>

  <button
    className="apply-filter-btn"
    onClick={applyFilters}
  >
    Apply Filters
  </button>

</div>

          {/* Right */}

          <div className="listing-content">
            <div className="top-search-bar">

  <div className="search-wrapper">

    <input
      type="text"
      placeholder="Search Area, City..."
      value={searchArea}
      onChange={(e) =>
        setSearchArea(
          e.target.value
        )
      }
    />

    <button
      onClick={handleAreaSearch}
    >
      Search
    </button>

  </div>

</div>

<div className="listing-header">

  <h2>
    Showing
    {" "}
    <span>
      {properties.length}
    </span>
    {" "}
    Properties
    {searchArea &&
      ` in ${searchArea}`}
  </h2>

  <div className="sort-box desktop-sort">

    <span  >Sort by:</span>

    <select
      value={sortBy}
      onChange={(e) =>
        handleSort(
          e.target.value
        )
      }
    >
      <option value="newest">
        Newest First
      </option>

      <option value="priceLow">
        Price Low to High
      </option>

      <option value="priceHigh">
        Price High to Low
      </option>

      <option value="bhk">
        Highest BHK
      </option>

    </select>

  </div>

</div>


<div className="mobile-filter-bar">

  <button
    className="mobile-filter-btn"
    onClick={() =>
      setShowFilters(true)
    }
  >
    ☰ Filters
  </button>


  <div className="sort-box mobile-sort">

    <span>Sort by:</span>

    <select
      value={sortBy}
      onChange={(e) =>
        handleSort(
          e.target.value
        )
      }
    >
      <option value="newest">
        Newest First
      </option>

      <option value="priceLow">
        Price Low to High
      </option>

      <option value="priceHigh">
        Price High to Low
      </option>

      <option value="bhk">
        Highest BHK
      </option>

    </select>

  </div>


</div>

            {loading ? (
              <h3>Loading...</h3>
            ) : (
              <div className="listing-grid">
                {properties.map(
                  (property) => (
                    <PropertyCard
                      key={
                        property.id
                      }
                      property={
                        property
                      }
                    />
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {showFilters && (
  <>
    <div
      className="filter-overlay"
      onClick={() =>
        setShowFilters(false)
      }
    />

    <div className="mobile-filter-drawer">

      <div className="drawer-header">

        <h3>Filters</h3>

        <button
          onClick={() =>
            setShowFilters(false)
          }
        >
          ✕
        </button>

      </div>

      {/* Price */}

      <div className="filter-group">

        <h4>Price Range</h4>

        <input
          type="range"
          min="5000"
          max="150000"
          step="5000"
          value={maxPrice}
          onChange={(e) =>
            setMaxPrice(e.target.value)
          }
        />

      </div>

      {/* BHK */}

      <div className="filter-group">

        <h4>BHK Type</h4>

        <div className="bhk-grid">

          {[1, 2, 3, 4].map((bhk) => (
            <button
              key={bhk}
              className={
                selectedBhk === bhk
                  ? "active-filter"
                  : ""
              }
              onClick={() =>
                setSelectedBhk(bhk)
              }
            >
              {bhk} BHK
            </button>
          ))}

        </div>

      </div>

      {/* Type */}

      <div className="filter-group">

        <h4>Property Type</h4>

        <select
          value={selectedType}
          onChange={(e) =>
            setSelectedType(
              e.target.value
            )
          }
        >
          <option value="">
            All
          </option>

          <option value="Residential">
            Residential
          </option>

          <option value="Commercial">
            Commercial
          </option>

        </select>

      </div>

      <button
        className="apply-filter-btn"
        onClick={() => {
          applyFilters();
          setShowFilters(false);
        }}
      >
        Apply Filters
      </button>

    </div>
  </>
)}
    </div>
  );
}

export default PropertyListingPage;