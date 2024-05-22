import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import "../assets/css/setupProfile.css";
import {
  CalendarDays,
  Camera,
  Mail,
  Map,
  MapPinned,
  Phone,
  Radar,
  User,
} from "lucide-react";
// const defaultDummyImage = "../assets/images/person-gray-photo-placeholder-woman.jpg";
const defaultDummyImage = "../../src/assets/images/person-gray-photo-placeholder-woman.jpg";

const SetupProfile: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    gender: "",
    dateOfBirth: "",
    address: "",
    city: "",
    state: "",
    country: "",
    profilePicture: null as File | null,
  });

  const [submitted, setSubmitted] = useState(false);
  const [mapPosition, setMapPosition] = useState({ lat: 0, lng: 0 });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFormData({ ...formData, profilePicture: file });
    }
  };

  const handleDummyImageClick = () => {
    document.getElementById("profilePictureInput")?.click();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you can perform form submission logic, like sending data to server
    // For now, just simulate submission success
    setSubmitted(true);
  };

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    const { latLng } = e;
    setMapPosition({ lat: latLng.lat(), lng: latLng.lng() });
    // Reverse geocode to get address components
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === "OK" && results[0]) {
        const addressComponents = results[0].address_components;
        const addressData: { [key: string]: string } = {};
        addressComponents.forEach((component) => {
          const types = component.types;
          types.forEach((type) => {
            if (type === "locality") {
              addressData.city = component.long_name;
            } else if (type === "administrative_area_level_1") {
              addressData.state = component.long_name;
            } else if (type === "country") {
              addressData.country = component.long_name;
            }
          });
        });
        setFormData({
          ...formData,
          address: results[0].formatted_address,
          ...addressData,
        });
      } else {
        console.error("Geocoder failed due to: " + status);
      }
    });
  };

  const getCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setMapPosition({ lat: latitude, lng: longitude });
        // Reverse geocode to get address components
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode(
          { location: { lat: latitude, lng: longitude } },
          (results, status) => {
            if (status === "OK" && results[0]) {
              const addressComponents = results[0].address_components;
              const addressData: { [key: string]: string } = {};
              addressComponents.forEach((component) => {
                const types = component.types;
                types.forEach((type) => {
                  if (type === "locality") {
                    addressData.city = component.long_name;
                  } else if (type === "administrative_area_level_1") {
                    addressData.state = component.long_name;
                  } else if (type === "country") {
                    addressData.country = component.long_name;
                  }
                });
              });
              setFormData({
                ...formData,
                address: results[0].formatted_address,
                ...addressData,
              });
            } else {
              console.error("Geocoder failed due to: " + status);
            }
          }
        );
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <main className="setup-profile-page">
      <div className="setup-profile-container">
        <h1 className="setup-profile-heading">Setup your profile</h1>
        {!submitted ? (
          <form className="setupProfileForm" onSubmit={handleSubmit}>
            <div className="form-item">
              <div
                className="w-80 mb-8 mx-auto relative"
                onClick={handleDummyImageClick}
                style={{ cursor: "pointer" }}
              >
                <Camera className="form-item-icon-image" />
                <input
                  type="file"
                  id="profilePictureInput"
                  name="profilePicture"
                  placeholder="Profile Picture"
                  onChange={handleFileChange}
                  accept="image/*"
                  style={{ display: "none" }}
                />
                {formData.profilePicture ? (
                  <img
                    src={URL.createObjectURL(formData.profilePicture)}
                    alt="Preview"
                    className="personImage"
                  />
                ) : (
                  <img
                    src={defaultDummyImage}
                    alt="Dummy"
                    className="personImage"
                  />
                )}
              </div>
            </div>
            <br />
            <div className="form-item">
              <User className="form-item-icon" />
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Anant Maurya"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
            <br />
            <div className="form-item">
              <Phone className="form-item-icon" />
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="+912084422881"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
            <br />
            <div className="form-item">
              <Mail className="form-item-icon" />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="jane@gmail.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <br />
            <div className="form-item">
              <User className="form-item-icon" />
              <select
                id="gender"
                name="gender"
                title="Select your gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="not_to_say">Rather Not to Say</option>
              </select>
            </div>
            <br />
            <div className="form-item">
              <CalendarDays className="form-item-icon" />
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                placeholder="Date of Birth"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
            </div>
            <br />
            <div className="form-item">
              <Map className="form-item-icon" />
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <br />
            <div className="form-item">
              <Radar className="form-item-icon" />
              <input
                type="text"
                id="city"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
            <br />
            <div className="form-item">
              <Radar className="form-item-icon" />
              <input
                type="text"
                id="state"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
              />
            </div>
            <br />
            <div className="form-item">
              <MapPinned className="form-item-icon" />
              <input
                type="text"
                id="country"
                name="country"
                placeholder="India"
                value={formData.country}
                onChange={handleChange}
              />
            </div>
            <br />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Submit
            </button>
          </form>
        ) : (
          <div
            className="mt-8 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">Successfully registered!</span>
          </div>
        )}

        {/* Map Section */}
        <div className="mt-8">
          <button className="geoButton" onClick={getCurrentLocation}>
            Get Current Location
          </button>
          <LoadScript
            googleMapsApiKey={
              import.meta.env.REACT_APP_GOOGLE_MAPS_API_KEY || ""
            }
          >
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "400px" }}
              center={mapPosition}
              zoom={15}
              onClick={handleMapClick}
            >
              <Marker position={mapPosition} />
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    </main>
  );
};

export default SetupProfile;
