import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../services/authService";
import { login as loginAction } from "../store/authSlice";
import "./style.css";
import FormInput from "../components/Form/FormInput";
import { showToast } from "../store/toastSlice";
import { CircularProgress } from "@mui/material"; // Import CircularProgress from Material-UI

const SignInPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false); // State to track form validity
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to handle sign in
  const handleSignIn = async () => {
 
    if (!validateForm()) {
        dispatch(showToast({ text: "Please fill in all fields", severity: "error" }));
        return; // Exit function if form is not valid
      }
    setLoading(true);
    try {
      const userData = await login(email, password);
      if (userData.token) {
        dispatch(
          showToast({ text: "Successfully Signed In", severity: "success" })
        );
        dispatch(loginAction(userData.token));
        navigate("/");
      }
    } catch (error: any) {
      dispatch(
        showToast({ text: error ?? "Invalid Credentials", severity: "error" })
      );
    } finally {
      setLoading(false);
    }
  };

  // Function to validate form fields
  const validateForm = () => {
    return email.trim() !== "" && password.trim() !== ""; // Return true if both fields are not empty
  };

  // Function to handle email input change
  const handleEmailChange = (value: string) => {
    setEmail(value);
    setIsFormValid(validateForm()); // Update form validity on email change
  };

  // Function to handle password input change
  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setIsFormValid(validateForm()); // Update form validity on password change
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="form-title">Sign In</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <FormInput
            label="Email"
            type="email"
            className="form-input"
            value={email}
            onChange={handleEmailChange} // Pass handleEmailChange as onChange handler
          />
          <FormInput
            label="Password"
            type="password"
            className="form-input"
            value={password}
            onChange={handlePasswordChange} // Pass handlePasswordChange as onChange handler
          />
          <button
            className="submit-button"
            onClick={handleSignIn}
            disabled={loading } // Disable button if loading or form is not valid
          >
            {loading ? (
              <CircularProgress size={24} /> // Render CircularProgress while loading
            ) : (
              "Sign In" // Render button text when not loading
            )}
          </button>
          <div className="new-member">
            New member?{" "}
            <div onClick={() => navigate("/signup")} className="signup-link">
              Sign up
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
