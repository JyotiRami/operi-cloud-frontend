export type MenuKey =
  | 'dashboard'
  | 'services'
  | 'customers'
  | 'products'
  | 'users'
  | 'staff'
  | 'appointments';

export interface MenuItem {
  key: MenuKey;
  label: string;
  shortLabel: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  durationMinutes: number;
  price: number;
  isActive: boolean;
}

export type GenericEntity = Record<string, unknown>;
export type ResourceKey =
  | 'services'
  | 'customers'
  | 'products'
  | 'users'
  | 'staff'
  | 'appointments';

export interface CustomerItem {
  customerId: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string | null;
  totalAppointments: number;
  isActive: boolean;
  notes: string | null;
}

export interface CustomerFormState {
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  notes: string;
}

export interface ProductItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  isActive?: boolean;
}

export interface ProductFormState {
  name: string;
  description: string;
  price: string;
  image: File | null;
}

export interface StaffItem {
  staffId: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialization: string;
  isActive: boolean;
}

export interface StaffFormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialization: string;
  password: string;
}

export interface SummaryItem {
  title: string;
  value: string;
  trend: string;
  trendType: 'up' | 'down';
}

export interface AppointmentItem {
  appointmentDate: string;
  appointmentId: string;
  customerName: string;
  services: string[];
  staffName: string;
  status: string;
}

export interface AppointmentFormState {
  appointmentDate: string;
  customerName: string;
  services: string;
  staffName: string;
  status: string;
}
