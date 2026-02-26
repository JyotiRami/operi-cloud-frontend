import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../api';
import { useLoginForm } from '../../hooks';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();

  const {
    formData,
    errors,
    loading,
    setLoading,
    handleChange,
    validate,
    resetForm,
  } = useLoginForm();

  const [successMessage, setSuccessMessage] = useState('');
  const [apiError, setApiError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError('');
    setSuccessMessage('');

    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      const response = await authService.login(formData);
      
      setSuccessMessage(`Welcome back, ${response.user.firstName}!`);
      resetForm();

      setTimeout(() => {
        setSuccessMessage('');
        // redirect via router so we don't reload the page
        navigate('/dashboard');
      }, 2000);
    } catch (error: any) {
      setApiError(error.message || 'Login failed. Please check your credentials.');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-header">
          <h2>Welcome Back to Operi</h2>
          <p>Manage your salon with ease</p>
        </div>

        {successMessage && (
          <div className="login-success">{successMessage}</div>
        )}

        {apiError && (
          <div className="login-error">{apiError}</div>
        )}

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className={errors.email ? 'input-error' : ''}
            disabled={loading}
          />
          {errors.email && (
            <span className="error-text">{errors.email}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className={errors.password ? 'input-error' : ''}
            disabled={loading}
          />
          {errors.password && (
            <span className="error-text">{errors.password}</span>
          )}
        </div>

        <div className="form-options">
          <a href="#forgot" className="forgot-password">
            Forgot Password?
          </a>
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p className="signup-link">
          Don't have an account? <a href="/signup">Sign up here</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
