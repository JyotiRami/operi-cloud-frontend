export interface SignUpRequest {
  salonName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  timeZone: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    salonName: string;
  };
  message: string;
}



export interface SignUpFormData extends SignUpRequest {
  confirmPassword: string;
}

export interface LoginFormData extends LoginRequest {}
