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
  SERVICES: {
    GET_ALL: `${API_BASE_URL}/services`,
    CREATE: `${API_BASE_URL}/services`,
    UPDATE: (id: string) => `${API_BASE_URL}/services/${id}`,
    DELETE: (id: string) => `${API_BASE_URL}/services/${id}`,
  },
  PRODUCTS: {
    GET_ALL: `${API_BASE_URL}/product`,
    CREATE: `${API_BASE_URL}/product`,
    UPDATE: (id: string) => `${API_BASE_URL}/product/${id}`,
    UPDATE_STATUS: (id: string, isActive: boolean) =>
      `${API_BASE_URL}/product/${id}/status?isActive=${isActive}`,
  },
  CUSTOMERS: {
    GET_ALL: `${API_BASE_URL}/customers`,
    CREATE: `${API_BASE_URL}/customers`,
    UPDATE: (id: string) => `${API_BASE_URL}/customers/${id}`,
  },
  USERS: {
    GET_ALL: `${API_BASE_URL}/users`,
  },
  STAFF: {
    GET_ALL: `${API_BASE_URL}/staff`,
    CREATE: `${API_BASE_URL}/staff`,
    UPDATE: (id: string) => `${API_BASE_URL}/staff/${id}`,
  },
  APPOINTMENTS: {
    GET_ALL: `${API_BASE_URL}/appointment`,
    CREATE: `${API_BASE_URL}/appointment`,
    UPDATE: (id: string) => `${API_BASE_URL}/appointment/${id}`,
  },
};
