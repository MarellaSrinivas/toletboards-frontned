
import { useEffect, useState } from "react";
import "./ProfileSettings.css";
import api from "../../api/api";

function ProfileSettings() {

  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    language: "English",
    city: "",
    state: "",
    profileImage: "",
    verified: false,
    activeProperties: 0,
    rating: 0,
    memberSince: ""
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {

    try {

      const { data } = await api.get("/user/profile");

      setFormData({
        ...data,
        language: data.language || "English"
      });

    } catch (err) {

      console.error("Profile fetch error:", err);

    } finally {

      setLoading(false);

    }

  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const saveProfile = async () => {

    try {

      await api.put("/user/profile", formData);

      alert("Profile updated successfully");

      setEditing(false);

    } catch (err) {

      console.error("Profile update error:", err);

      alert("Unable to update profile");

    }

  };

  // DELETE ACCOUNT
  const handleDeleteAccount = async () => {

    const confirmed = window.confirm(
      "Are you sure you want to delete your account?\n\n" +
      "This action cannot be undone."
    );

    if (!confirmed) {
      return;
    }

    try {

      setDeleting(true);

      await api.delete("/user/profile");

      alert("Your account has been deleted successfully.");

      // Clear authentication data
      localStorage.removeItem("token");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      localStorage.removeItem("userId");

      // Redirect to login
      window.location.href = "/login";

    } catch (err) {

      console.error("Delete account error:", err);

      const message =
        err?.response?.data?.message ||
        "Unable to delete your account. Please try again.";

      alert(message);

    } finally {

      setDeleting(false);

    }

  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (

    <div className="profile-settings">

      <h2 className="profile-page-title">
        Profile Settings
      </h2>

      {/* Top */}

      <div className="profile-top-card">

        <img
          src={
            formData.profileImage
              ? `https://toletboards.com${formData.profileImage}`
              : "https://i.pravatar.cc/200"
          }
          alt="profile"
          className="profile-image"
        />

        <div className="profile-info">

          <div className="profile-name-row">

            <h3>{formData.fullName}</h3>

            {formData.verified && (
              <span className="verified-badge">
                Verified Owner
              </span>
            )}

          </div>

          <p>
            Member since {formData.memberSince}
          </p>

          <div className="profile-stats">

            <span>
              {formData.activeProperties} Active Listings
            </span>

            <span>
              ⭐ {formData.rating}
            </span>

            <span>
              {formData.city}, {formData.state}
            </span>

          </div>

        </div>

      </div>

      <div className="profile-layout">

        <div className="profile-card">

          <div className="card-header">

            <h3>Personal Information</h3>

            <button
              className="edit-btn"
              onClick={() => setEditing(!editing)}
            >
              {editing ? "Cancel" : "Edit"}
            </button>

          </div>

          <div className="profile-form">

            <div className="form-grid">

              <div className="form-group">

                <label>Full Name</label>

                <input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  readOnly={!editing}
                />

              </div>

              <div className="form-group">

                <label>Email</label>

                <input
                  value={formData.email}
                  readOnly
                />

              </div>

              <div className="form-group">

                <label>Phone</label>

                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  readOnly={!editing}
                />

              </div>

              <div className="form-group">

                <label>Language</label>

                <select
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  disabled={!editing}
                >

                  <option>English</option>
                  <option>Telugu</option>
                  <option>Hindi</option>

                </select>

              </div>

            </div>

          </div>

        </div>

        {/* Right */}

        <div>

          <div className="side-card">

            <div className="side-card-header">

              <h3>Preferences</h3>

            </div>

            <div className="preference-item">

              <span>Email Notifications</span>

              <div className="toggle-switch"></div>

            </div>

            <div className="preference-item">

              <span>SMS Alerts</span>

              <div className="toggle-switch"></div>

            </div>

            <div className="preference-item">

              <span>WhatsApp Support</span>

              <div className="toggle-switch off"></div>

            </div>

          </div>

          <div className="side-card">

            <div className="side-card-header">

              <h3>Security</h3>

            </div>

            <div className="security-item">
              Change Password
            </div>

            <div className="security-item">
              Two-Factor Authentication
            </div>

            <button
              type="button"
              className="security-item delete-account"
              onClick={handleDeleteAccount}
              disabled={deleting}
            >
              {deleting ? "Deleting Account..." : "Delete Account"}
            </button>

          </div>

        </div>

      </div>

      <div className="profile-actions">

        <button
          className="discard-btn"
          onClick={fetchProfile}
        >
          Discard
        </button>

        {editing && (

          <button
            className="save-btn"
            onClick={saveProfile}
          >
            Save Changes
          </button>

        )}

      </div>

    </div>

  );

}

export default ProfileSettings;

