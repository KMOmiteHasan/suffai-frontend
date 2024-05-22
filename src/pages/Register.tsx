import React, { useState } from "react";
import axios from "axios";
import "../assets/css/register.css";
import { Check, LockKeyhole, Phone, TriangleAlert, User } from "lucide-react";
import googleIcon from "../assets/images/g_icon.png";
import appleIcon from "../assets/images/a_icon.png";
import { Link } from "react-router-dom";

const Register: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [nameValid, setNameValid] = useState(false);
  const [phoneNumberValid, setPhoneNumberValid] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setNameValid(event.target.value.length > 6);
  };

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const formattedNumber = "+9" + event.target.value;
    setPhoneNumber(formattedNumber);
    setPhoneNumberValid(formattedNumber.length === 12);
  };

  const handleOtpChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(event.target.value);
  };

  const sendOtp = async () => {
    try {
      const response = await axios.post("/api/send-otp", { phoneNumber });
      if (response.status === 200) {
        setOtpSent(true);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setOtpError("Error sending OTP to server.");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!termsAccepted) {
      setOtpError("Please accept the terms and conditions.");
      return;
    }
    try {
      const response = await axios.post("/api/verify-otp", {
        phoneNumber,
        otp,
      });
      if (response.status === 200) {
        // If OTP is verified, proceed with registration
        const registerResponse = await axios.post("/api/register", {
          phoneNumber,
          name,
        });
        if (registerResponse.status === 200) {
          // Registration successful, you can redirect or show a success message
          console.log("Registration successful!");
        }
      }
    } catch (error) {
      console.error("Error registering:", error);
      setOtpError("Incorrect Phone number or OTP please try again.");
    }
  };

  const handleCheckboxChange = () => {
    setTermsAccepted(!termsAccepted);
    setOtpError(""); // Clear any previous error message when the checkbox is clicked
  };

  const handleGoogleLogin = async () => {
    const googleUser = await window.gapi.auth2.getAuthInstance().signIn();
    const idToken = googleUser.getAuthResponse().id_token;

    // Send the token to your backend
    try {
      const response = await axios.post("/api/google-login", { idToken });
      console.log(response.data); // If successful, handle response
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  const handleAppleLogin = async () => {
    try {
      const response = await AppleID.auth.signIn({
        clientId: import.meta.env.APPLE_CLIENT_ID,
        scope: "name email",
        redirectURI: import.meta.env.REDIRECT_URI,
      });

      // Send the response.authorization.id_token to your backend
      const idToken = response.authorization.id_token;
      const backendResponse = await sendTokenToBackend(idToken);
      console.log(backendResponse); // If successful, handle response
    } catch (error) {
      console.error("Apple Sign-In error:", error);
    }
  };

  const sendTokenToBackend = async (idToken) => {
    try {
      const response = await axios.post("/api/apple-login", { idToken });
      return response.data;
    } catch (error) {
      console.error("Error sending token to backend:", error);
      throw error;
    }
  };

  return (
    <>
      <main className="register-page">
        <div className="register-page-container">
          <h1 className="register-page-heading">Sign up to your account</h1>

          <form className="loginForm" onSubmit={handleSubmit}>
            <div className="form-item">
              <User className="form-item-icon" />
              <input
                type="text"
                placeholder="Jane smith"
                value={name}
                onChange={handleNameChange}
              />
              {nameValid ? <Check className="form-item-icon-check" /> : null}
            </div>
            <br />
            <div className="form-item">
              <Phone className="form-item-icon" />
              <input
                type="tel"
                placeholder="Phone Number"
                pattern="[0-9]{4}[0-9]{6}"
                value={phoneNumber.substring(2)} // Display number without +9
                onChange={handlePhoneNumberChange}
              />
              {phoneNumberValid ? (
                <Check className="form-item-icon-check" />
              ) : null}
            </div>
            <br />
            {otpSent ? (
              <div className="form-item">
                <LockKeyhole className="form-item-icon" />
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={handleOtpChange}
                />
              </div>
            ) : (
              <button type="button" className="sendOTP" onClick={sendOtp}>
                Send OTP
              </button>
            )}
            <br />
            {otpError && (
              <p className="error-message">
                <TriangleAlert />
                {otpError}
              </p>
            )}
            <br />
            <div className="form-item">
              <input
                type="checkbox"
                id="termsCheckbox"
                checked={termsAccepted}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="termsCheckbox" className="checkbox-custom-label">
                Accept Terms & Conditions
              </label>
            </div>
            <br />
            <button className="logBtn" id="logBtn" type="submit">
              Sign up
            </button>
          </form>

          <div className="social-logins">
            <div className="social-logins-head">
              <p>or</p>
            </div>
            <div className="social-logins-btn-container">
              <button
                title="Continue with Google"
                className="googleBtn social-login-btn"
                onClick={handleGoogleLogin}
              >
                <img src={googleIcon} alt="" />
              </button>
              <button
                title="Continue with Google"
                className="appleBtn social-login-btn"
                onClick={handleAppleLogin}
              >
                <img src={appleIcon} alt="" />
              </button>
            </div>
          </div>

          <div className="loginForm-footer">
            <p>
              Don’t have any account? <Link to="/login">Sign In</Link>{" "}
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Register;
