import React, { useState } from 'react';
import { signUp } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import FormInput from '../components/Form/FormInput';
import { CircularProgress } from '@mui/material';
import { showToast } from '../store/toastSlice';
import { useDispatch } from 'react-redux';

const SignUpPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Function to validate form fields
  const validateForm = () => {
    return email.trim() !== '' && password.trim() !== ''; // Return true if both fields are not empty
  };

  // Function to handle sign up
  const handleSignUp = async () => {
    debugger
    if (!validateForm()) {
      dispatch(showToast({ text: 'Please fill in all fields', severity: 'error' }));
      return; // Exit function if form is not valid
    }
    setLoading(true);
    try {
      const data = await signUp(email, password);
      if (data.token) {
        navigate('/signin');
        dispatch(showToast({ text: 'Successfully Signed Up', severity: 'success' }));
      }
    } catch (error: any) {
        console.log('error',error)
      dispatch(showToast({ text: 'Invalid Credentials', severity: 'error' }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="form-title">Sign Up</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <FormInput
            label="Email"
            type="email"
            className="form-input"
            value={email}
            onChange={setEmail}
          />
          <FormInput
            label="Password"
            type="password"
            className="form-input"
            value={password}
            onChange={setPassword}
          />
          <button className="submit-button" onClick={handleSignUp} disabled={loading}>
            {loading ? (
              <CircularProgress size={24} /> // Render CircularProgress while loading
            ) : (
              'Sign Up' // Render button text when not loading
            )}
          </button>
          <div className="new-member">
            Already have an account?
            <div onClick={() => navigate('/signin')} className="signup-link">
              Login
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
