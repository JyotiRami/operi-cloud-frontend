const API_BASE_URL =
  (
    typeof process !== "undefined" &&
    process.env &&
    process.env.REACT_APP_API_URL
  ) ||
  "https://operi-api-bfd9cbdjhze3bqdt.centralindia-01.azurewebsites.net/api";
  // "https://localhost:7274/api";

export const API_ENDPOINTS = {
  AUTH: {
    SIGN_UP: `${API_BASE_URL}/auth/signup`,
    LOGIN: `${API_BASE_URL}/auth/login`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
    REFRESH: `${API_BASE_URL}/auth/refresh`,
  },
  SALON: {
    GET_ALL: `${API_BASE_URL}/salons`,
    GET_BY_ID: (id: string) => `${API_BASE_URL}/salons/${id}`,
    UPDATE: (id: string) => `${API_BASE_URL}/salons/${id}`,
    DELETE: (id: string) => `${API_BASE_URL}/salons/${id}`,
  },
};
