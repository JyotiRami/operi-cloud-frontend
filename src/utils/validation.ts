import type { LoginRequest, SignUpFormData } from '../types';

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

export const validatePhone = (phone: string): boolean => {
  return phone.trim().length >= 10;
};

const asString = (value: unknown): string => {
  return typeof value === 'string' ? value : '';
};

export const validateForm = (formData: SignUpFormData): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!asString(formData.salonName).trim()) {
    errors.salonName = 'Salon name is required';
  }

  const email = asString(formData.email);
  if (!email.trim()) {
    errors.email = 'Email is required';
  } else if (!validateEmail(email)) {
    errors.email = 'Invalid email format';
  }

  const phone = asString(formData.phone);
  if (!phone.trim()) {
    errors.phone = 'Phone is required';
  } else if (!validatePhone(phone)) {
    errors.phone = 'Phone must have at least 10 digits';
  }

  if (!asString(formData.address).trim()) {
    errors.address = 'Address is required';
  }

  if (!asString(formData.city).trim()) {
    errors.city = 'City is required';
  }

  if (!asString(formData.country).trim()) {
    errors.country = 'Country is required';
  }

  if (!formData.timeZone) {
    errors.timeZone = 'Time zone is required';
  }

  if (!asString(formData.firstName).trim()) {
    errors.firstName = 'First name is required';
  }

  if (!asString(formData.lastName).trim()) {
    errors.lastName = 'Last name is required';
  }

  const password = asString(formData.password);
  if (!password) {
    errors.password = 'Password is required';
  } else if (!validatePassword(password)) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (password !== asString(formData.confirmPassword)) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return errors;
};

export const validateLoginForm = (formData: LoginRequest): Record<string, string> => {
  const errors: Record<string, string> = {};

  const email = asString(formData.email);
  if (!email.trim()) {
    errors.email = 'Email is required';
  } else if (!validateEmail(email)) {
    errors.email = 'Invalid email format';
  }

  if (!asString(formData.password)) {
    errors.password = 'Password is required';
  }

  return errors;
};
