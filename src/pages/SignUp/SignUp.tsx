import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../api';
import { useSignUpForm } from '../../hooks';
import { TIME_ZONES, COUNTRIES } from '../../constants';
import './SignUp.css';

const SignUp = () => {
  const {
    formData,
    errors,
    loading,
    setLoading,
    handleChange,
    validate,
    resetForm,
  } = useSignUpForm();

  const [successMessage, setSuccessMessage] = useState('');
  const [apiError, setApiError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError('');
    setSuccessMessage('');

    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      const response = await authService.signUp({
        salonName: formData.salonName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        country: formData.country,
        timeZone: formData.timeZone,
        firstName: formData.firstName,
        lastName: formData.lastName,
        password: formData.password,
      });
      console.log('Sign up successful:', response);
      setSuccessMessage(
        `Welcome ${formData.firstName}! Your salon "${formData.salonName}" has been registered successfully.`
      );
      resetForm();

      setTimeout(() => {
        setSuccessMessage('');
        // navigate to login page
        navigate('/login');
      }, 2000);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred during sign up. Please try again.';
      setApiError(errorMessage);
      console.error('Sign up error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-side">
        <div className="signup-info">
          <img
            src="https://via.placeholder.com/300x300?text=Salon+Graphic"
            alt="Salon illustration"
            className="signup-illustration"
          />
          <h2>Welcome to Operi</h2>
          <p>Start your salon journey by creating an account. Manage appointments, staff, and more.</p>
        </div>
      </div>
      <div className="signup-content">
        <form className="signup-form" onSubmit={handleSubmit}>
        <div className="signup-header">
          <h1>Create Your Salon Account</h1>
          <p>Join Operi and manage your salon efficiently</p>
        </div>

        {successMessage && (
          <div className="signup-success">{successMessage}</div>
        )}

        {apiError && (
          <div className="signup-error">{apiError}</div>
        )}

        <div className="form-content">
          <div className="form-left-column">
            <div className="form-section">
              <h3>Salon Information</h3>
              <div className="form-group">
                <label htmlFor="salonName">Salon Name *</label>
                <input
                  type="text"
                  id="salonName"
                  name="salonName"
                  value={formData.salonName}
                  onChange={handleChange}
                  placeholder="Enter your salon name"
                  className={errors.salonName ? 'input-error' : ''}
                  disabled={loading}
                />
                {errors.salonName && (
                  <span className="error-text">{errors.salonName}</span>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="address">Address *</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter street address"
                    className={errors.address ? 'input-error' : ''}
                    disabled={loading}
                  />
                  {errors.address && (
                    <span className="error-text">{errors.address}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="city">City *</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter city"
                    className={errors.city ? 'input-error' : ''}
                    disabled={loading}
                  />
                  {errors.city && (
                    <span className="error-text">{errors.city}</span>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="country">Country *</label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className={errors.country ? 'input-error' : ''}
                    disabled={loading}
                  >
                    <option value="">Select your country</option>
                    {COUNTRIES.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                  {errors.country && (
                    <span className="error-text">{errors.country}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="timeZone">Time Zone *</label>
                  <select
                    id="timeZone"
                    name="timeZone"
                    value={formData.timeZone}
                    onChange={handleChange}
                    className={errors.timeZone ? 'input-error' : ''}
                    disabled={loading}
                  >
                    <option value="">Select your time zone</option>
                    {TIME_ZONES.map((tz) => (
                      <option key={tz} value={tz}>
                        {tz}
                      </option>
                    ))}
                  </select>
                  {errors.timeZone && (
                    <span className="error-text">{errors.timeZone}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Contact Information</h3>
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
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
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className={errors.phone ? 'input-error' : ''}
                  disabled={loading}
                />
                {errors.phone && (
                  <span className="error-text">{errors.phone}</span>
                )}
              </div>
            </div>
          </div>

          <div className="form-right-column">
            <div className="form-section">
              <h3>Account Owner</h3>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter first name"
                    className={errors.firstName ? 'input-error' : ''}
                    disabled={loading}
                  />
                  {errors.firstName && (
                    <span className="error-text">{errors.firstName}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">Last Name *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter last name"
                    className={errors.lastName ? 'input-error' : ''}
                    disabled={loading}
                  />
                  {errors.lastName && (
                    <span className="error-text">{errors.lastName}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Security</h3>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="password">Password *</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a strong password"
                    className={errors.password ? 'input-error' : ''}
                    disabled={loading}
                  />
                  {errors.password && (
                    <span className="error-text">{errors.password}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password *</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className={errors.confirmPassword ? 'input-error' : ''}
                    disabled={loading}
                  />
                  {errors.confirmPassword && (
                    <span className="error-text">{errors.confirmPassword}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <button type="submit" className="signup-submit-btn" disabled={loading}>
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>

        <p className="login-link">
          Already have an account? <a href="/login">Login here</a>
        </p>
      </form>
      </div>
    </div>
  );
};

export default SignUp;

