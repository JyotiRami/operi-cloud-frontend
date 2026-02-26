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

export const validateForm = (formData: Record<string, any>): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!formData.salonName?.trim()) {
    errors.salonName = 'Salon name is required';
  }

  if (!formData.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!validateEmail(formData.email)) {
    errors.email = 'Invalid email format';
  }

  if (!formData.phone?.trim()) {
    errors.phone = 'Phone is required';
  } else if (!validatePhone(formData.phone)) {
    errors.phone = 'Phone must have at least 10 digits';
  }

  if (!formData.address?.trim()) {
    errors.address = 'Address is required';
  }

  if (!formData.city?.trim()) {
    errors.city = 'City is required';
  }

  if (!formData.country?.trim()) {
    errors.country = 'Country is required';
  }

  if (!formData.timeZone) {
    errors.timeZone = 'Time zone is required';
  }

  if (!formData.firstName?.trim()) {
    errors.firstName = 'First name is required';
  }

  if (!formData.lastName?.trim()) {
    errors.lastName = 'Last name is required';
  }

  if (!formData.password) {
    errors.password = 'Password is required';
  } else if (!validatePassword(formData.password)) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return errors;
};

export const validateLoginForm = (formData: Record<string, any>): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!formData.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!validateEmail(formData.email)) {
    errors.email = 'Invalid email format';
  }

  if (!formData.password) {
    errors.password = 'Password is required';
  }

  return errors;
};
