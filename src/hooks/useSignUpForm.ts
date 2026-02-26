import { useState } from 'react';
import { validateForm } from '../utils/validation';
import type { SignUpFormData } from '../types';

export const useSignUpForm = () => {
  const [formData, setFormData] = useState<SignUpFormData>({
    salonName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    timeZone: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<Partial<SignUpFormData>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof SignUpFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validate = (): boolean => {
    const newErrors = validateForm(formData);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData({
      salonName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      country: '',
      timeZone: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
    });
    setErrors({});
  };

  return {
    formData,
    errors,
    loading,
    setLoading,
    handleChange,
    validate,
    resetForm,
    setFormData,
  };
};
