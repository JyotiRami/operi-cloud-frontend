import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService, dashboardService } from '../../api';
import AppointmentsScreen from '../../components/dashboard/AppointmentsScreen';
import CustomersScreen from '../../components/dashboard/CustomersScreen';
import DashboardHomeScreen from '../../components/dashboard/DashboardHomeScreen';
import GenericEntityScreen from '../../components/dashboard/GenericEntityScreen';
import ProductsScreen from '../../components/dashboard/ProductsScreen';
import ServicesScreen from '../../components/dashboard/ServicesScreen';
import SidebarMenu from '../../components/dashboard/SidebarMenu';
import StaffScreen from '../../components/dashboard/StaffScreen';
import type {
  AppointmentFormState,
  AppointmentItem,
  CustomerFormState,
  CustomerItem,
  GenericEntity,
  MenuItem,
  MenuKey,
  ProductFormState,
  ProductItem,
  ResourceKey,
  ServiceItem,
  StaffFormState,
  StaffItem,
  SummaryItem,
} from '../../types/dashboard';
import './Dashboard.css';

const MENU_ITEMS: MenuItem[] = [
  { key: 'dashboard', label: 'Dashboard', shortLabel: 'DB' },
  { key: 'services', label: 'Services', shortLabel: 'SV' },
  { key: 'customers', label: 'Customers', shortLabel: 'CU' },
  { key: 'products', label: 'Products', shortLabel: 'PR' },
  { key: 'users', label: 'Users', shortLabel: 'US' },
  { key: 'staff', label: 'Staff', shortLabel: 'ST' },
  { key: 'appointments', label: 'Appointments', shortLabel: 'AP' },
];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const user = authService.getUser();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState<MenuKey>('dashboard');

  const [services, setServices] = useState<ServiceItem[]>([]);
  const [customers, setCustomers] = useState<CustomerItem[]>([]);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [users, setUsers] = useState<GenericEntity[]>([]);
  const [staff, setStaff] = useState<StaffItem[]>([]);
  const [appointments, setAppointments] = useState<AppointmentItem[]>([]);

  const [loadingByResource, setLoadingByResource] = useState<Record<ResourceKey, boolean>>({
    services: false,
    customers: false,
    products: false,
    users: false,
    staff: false,
    appointments: false,
  });

  const [errorByResource, setErrorByResource] = useState<Record<ResourceKey, string | null>>({
    services: null,
    customers: null,
    products: null,
    users: null,
    staff: null,
    appointments: null,
  });

  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [editingCustomerId, setEditingCustomerId] = useState<string | null>(null);
  const [editingStaffId, setEditingStaffId] = useState<string | null>(null);
  const [editingAppointmentId, setEditingAppointmentId] = useState<string | null>(null);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  const [serviceForm, setServiceForm] = useState({
    name: '',
    durationMinutes: '',
    price: '',
  });

  const [customerForm, setCustomerForm] = useState<CustomerFormState>({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    notes: '',
  });

  const [staffForm, setStaffForm] = useState<StaffFormState>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialization: '',
    password: '',
  });

  const [appointmentForm, setAppointmentForm] = useState<AppointmentFormState>({
    appointmentDate: '',
    customerName: '',
    services: '',
    staffName: '',
    status: 'Booked',
  });

  const [productForm, setProductForm] = useState<ProductFormState>({
    name: '',
    description: '',
    price: '',
    image: null,
  });

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/login');
    }
  }, [navigate]);

  const activeMenuItem = useMemo(
    () => MENU_ITEMS.find((item) => item.key === activeMenu),
    [activeMenu],
  );

  const setResourceLoading = (key: ResourceKey, isLoading: boolean) => {
    setLoadingByResource((prev) => ({ ...prev, [key]: isLoading }));
  };

  const setResourceError = (key: ResourceKey, errorMessage: string | null) => {
    setErrorByResource((prev) => ({ ...prev, [key]: errorMessage }));
  };

  const mapServiceFromApi = (item: GenericEntity): ServiceItem => {
    const rawId = item.id ?? item.serviceId ?? item._id ?? '';
    const rawName = item.name ?? item.serviceName ?? item.title ?? '';
    const rawDuration = item.durationMinutes ?? item.duration ?? item.timeInMinutes ?? 0;
    const rawPrice = item.price ?? item.amount ?? item.cost ?? 0;
    const rawIsActive = item.isActive ?? item.active ?? item.status;

    return {
      id: String(rawId),
      name: String(rawName),
      durationMinutes: Number(rawDuration) || 0,
      price: Number(rawPrice) || 0,
      isActive:
        typeof rawIsActive === 'boolean'
          ? rawIsActive
          : String(rawIsActive).toLowerCase() !== 'inactive',
    };
  };

  const mapCustomerFromApi = (item: GenericEntity): CustomerItem => ({
    customerId: String(item.customerId ?? item.id ?? item._id ?? ''),
    name: String(item.name ?? ''),
    email: String(item.email ?? ''),
    phone: String(item.phone ?? ''),
    dateOfBirth: item.dateOfBirth ? String(item.dateOfBirth).slice(0, 10) : null,
    totalAppointments: Number(item.totalAppointments ?? 0),
    isActive:
      typeof item.isActive === 'boolean'
        ? item.isActive
        : String(item.isActive).toLowerCase() === 'true',
    notes: item.notes ? String(item.notes) : null,
  });

  const mapStaffFromApi = (item: GenericEntity): StaffItem => ({
    staffId: String(item.staffId ?? item.id ?? item._id ?? ''),
    userId: String(item.userId ?? ''),
    firstName: String(item.firstName ?? ''),
    lastName: String(item.lastName ?? ''),
    email: String(item.email ?? ''),
    phone: String(item.phone ?? ''),
    specialization: String(item.specialization ?? ''),
    isActive:
      typeof item.isActive === 'boolean'
        ? item.isActive
        : String(item.isActive).toLowerCase() === 'true',
  });

  const mapAppointmentFromApi = (item: GenericEntity): AppointmentItem => ({
    appointmentDate: String(item.appointmentDate ?? ''),
    appointmentId: String(item.appointmentId ?? item.id ?? ''),
    customerName: String(item.customerName ?? ''),
    services: Array.isArray(item.services)
      ? item.services.map((service) => String(service))
      : [],
    staffName: String(item.staffName ?? ''),
    status: String(item.status ?? ''),
  });

  const mapProductFromApi = (item: GenericEntity): ProductItem => ({
    id: String(item.productId ?? item.id ?? item._id ?? ''),
    name: String(item.name ?? ''),
    description: String(item.description ?? ''),
    price: Number(item.price ?? 0),
    imageUrl: typeof item.imageUrl === 'string' ? item.imageUrl : undefined,
    isActive:
      typeof item.isActive === 'boolean'
        ? item.isActive
        : String(item.isActive).toLowerCase() !== 'inactive',
  });

  const loadServices = async () => {
    setResourceLoading('services', true);
    setResourceError('services', null);
    try {
      const payload = await dashboardService.getServices();
      setServices(payload.map(mapServiceFromApi));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch services';
      setResourceError('services', message);
    } finally {
      setResourceLoading('services', false);
    }
  };

  const loadCustomers = async () => {
    setResourceLoading('customers', true);
    setResourceError('customers', null);
    try {
      const payload = await dashboardService.getCustomers();
      setCustomers(payload.map(mapCustomerFromApi));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch customers';
      setResourceError('customers', message);
    } finally {
      setResourceLoading('customers', false);
    }
  };

  const loadProducts = async () => {
    setResourceLoading('products', true);
    setResourceError('products', null);
    try {
      const payload = await dashboardService.getProducts();
      setProducts(payload.map(mapProductFromApi));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch products';
      setResourceError('products', message);
    } finally {
      setResourceLoading('products', false);
    }
  };

  const loadUsers = async () => {
    setResourceLoading('users', true);
    setResourceError('users', null);
    try {
      setUsers(await dashboardService.getUsers());
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch users';
      setResourceError('users', message);
    } finally {
      setResourceLoading('users', false);
    }
  };

  const loadStaff = async () => {
    setResourceLoading('staff', true);
    setResourceError('staff', null);
    try {
      const payload = await dashboardService.getStaff();
      setStaff(payload.map(mapStaffFromApi));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch staff';
      setResourceError('staff', message);
    } finally {
      setResourceLoading('staff', false);
    }
  };

  const loadAppointments = async () => {
    setResourceLoading('appointments', true);
    setResourceError('appointments', null);
    try {
      const payload = await dashboardService.getAppointments();
      setAppointments(payload.map(mapAppointmentFromApi));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch appointments';
      setResourceError('appointments', message);
    } finally {
      setResourceLoading('appointments', false);
    }
  };

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      return;
    }

    void Promise.allSettled([
      loadServices(),
      loadCustomers(),
      loadProducts(),
      loadUsers(),
      loadStaff(),
      loadAppointments(),
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dashboardSummary = useMemo<SummaryItem[]>(
    () => [
      { title: 'Today Appointments', value: String(appointments.length), trend: '+0%', trendType: 'up' },
      { title: 'Active Staff', value: String(staff.length), trend: '+0', trendType: 'up' },
      { title: 'Total Services', value: String(services.length), trend: '+0', trendType: 'up' },
      { title: 'Users', value: String(users.length), trend: '+0%', trendType: 'up' },
    ],
    [appointments.length, staff.length, services.length, users.length],
  );

  const handleLogout = async () => {
    try {
      await authService.logout();
      navigate('/login');
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  const handleServiceFormChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setServiceForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCustomerFormChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setCustomerForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleStaffFormChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setStaffForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAppointmentFormChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setAppointmentForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleProductFormChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setProductForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleProductImageChange = (file: File | null) => {
    setProductForm((prev) => ({ ...prev, image: file }));
  };

  const resetServiceForm = () => {
    setServiceForm({ name: '', durationMinutes: '', price: '' });
    setEditingServiceId(null);
  };

  const resetCustomerForm = () => {
    setCustomerForm({ name: '', email: '', phone: '', dateOfBirth: '', notes: '' });
    setEditingCustomerId(null);
  };

  const resetStaffForm = () => {
    setStaffForm({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      specialization: '',
      password: '',
    });
    setEditingStaffId(null);
  };

  const handleServiceSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = serviceForm.name.trim();
    const durationMinutes = Number(serviceForm.durationMinutes);
    const price = Number(serviceForm.price);

    if (!trimmedName || durationMinutes <= 0 || price <= 0) {
      return;
    }

    const payload: GenericEntity = { name: trimmedName, durationMinutes, price };

    try {
      if (editingServiceId) {
        await dashboardService.updateService(editingServiceId, payload);
      } else {
        await dashboardService.createService(payload);
      }
      await loadServices();
      resetServiceForm();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to save service';
      setResourceError('services', message);
    }
  };

  const handleEditService = (service: ServiceItem) => {
    if (!service.id) {
      return;
    }

    setEditingServiceId(service.id);
    setServiceForm({
      name: service.name,
      durationMinutes: String(service.durationMinutes),
      price: String(service.price),
    });
    setActiveMenu('services');
  };

  const handleToggleServiceStatus = async (service: ServiceItem) => {
    if (!service.id) {
      return;
    }

    try {
      await dashboardService.updateService(service.id, {
        name: service.name,
        durationMinutes: service.durationMinutes,
        price: service.price,
        isActive: !service.isActive,
      });
      await loadServices();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update service status';
      setResourceError('services', message);
    }
  };

  const handleCustomerSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload: GenericEntity = {
      name: customerForm.name.trim(),
      email: customerForm.email.trim(),
      phone: customerForm.phone.trim(),
      dateOfBirth: customerForm.dateOfBirth || null,
      notes: customerForm.notes.trim(),
    };

    if (!payload.name || !payload.email || !payload.phone) {
      return;
    }

    try {
      if (editingCustomerId) {
        await dashboardService.updateCustomer(editingCustomerId, payload);
      } else {
        await dashboardService.createCustomer(payload);
      }
      await loadCustomers();
      resetCustomerForm();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to save customer';
      setResourceError('customers', message);
    }
  };

  const handleEditCustomer = (customer: CustomerItem) => {
    if (!customer.customerId) {
      return;
    }

    setEditingCustomerId(customer.customerId);
    setCustomerForm({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      dateOfBirth: customer.dateOfBirth || '',
      notes: customer.notes || '',
    });
    setActiveMenu('customers');
  };

  const handleToggleCustomerStatus = async (customer: CustomerItem) => {
    if (!customer.customerId) {
      return;
    }

    try {
      await dashboardService.updateCustomer(customer.customerId, {
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        dateOfBirth: customer.dateOfBirth,
        notes: customer.notes || '',
        isActive: !customer.isActive,
      });
      await loadCustomers();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to update customer status';
      setResourceError('customers', message);
    }
  };

  const handleStaffSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload: GenericEntity = {
      firstName: staffForm.firstName.trim(),
      lastName: staffForm.lastName.trim(),
      email: staffForm.email.trim(),
      phone: staffForm.phone.trim(),
      specialization: staffForm.specialization.trim(),
    };

    const trimmedPassword = staffForm.password.trim();
    if (trimmedPassword) {
      payload.password = trimmedPassword;
    }

    if (
      !payload.firstName ||
      !payload.lastName ||
      !payload.email ||
      !payload.phone ||
      !payload.specialization
    ) {
      return;
    }

    if (!editingStaffId && !trimmedPassword) {
      return;
    }

    try {
      if (editingStaffId) {
        await dashboardService.updateStaff(editingStaffId, payload);
      } else {
        await dashboardService.createStaff(payload);
      }
      await loadStaff();
      resetStaffForm();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to save staff';
      setResourceError('staff', message);
    }
  };

  const handleEditStaff = (staffMember: StaffItem) => {
    if (!staffMember.staffId) {
      return;
    }

    setEditingStaffId(staffMember.staffId);
    setStaffForm({
      firstName: staffMember.firstName,
      lastName: staffMember.lastName,
      email: staffMember.email,
      phone: staffMember.phone,
      specialization: staffMember.specialization,
      password: '',
    });
    setActiveMenu('staff');
  };

  const handleToggleStaffStatus = async (staffMember: StaffItem) => {
    if (!staffMember.staffId) {
      return;
    }

    try {
      await dashboardService.updateStaff(staffMember.staffId, {
        staffId: staffMember.staffId,
        userId: staffMember.userId,
        firstName: staffMember.firstName,
        lastName: staffMember.lastName,
        email: staffMember.email,
        phone: staffMember.phone,
        specialization: staffMember.specialization,
        isActive: !staffMember.isActive,
      });
      await loadStaff();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update staff status';
      setResourceError('staff', message);
    }
  };

  const resetAppointmentForm = () => {
    setAppointmentForm({
      appointmentDate: '',
      customerName: '',
      services: '',
      staffName: '',
      status: 'Booked',
    });
    setEditingAppointmentId(null);
  };

  const resetProductForm = () => {
    setProductForm({
      name: '',
      description: '',
      price: '',
      image: null,
    });
    setEditingProductId(null);
  };

  const handleAppointmentSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const services = appointmentForm.services
      .split(',')
      .map((service) => service.trim())
      .filter(Boolean);

    if (
      !appointmentForm.appointmentDate ||
      !appointmentForm.customerName.trim() ||
      !appointmentForm.staffName.trim() ||
      services.length === 0 ||
      !appointmentForm.status.trim()
    ) {
      return;
    }

    const appointmentDate = new Date(appointmentForm.appointmentDate);
    const payload: GenericEntity = {
      appointmentDate: Number.isNaN(appointmentDate.getTime())
        ? appointmentForm.appointmentDate
        : appointmentDate.toISOString(),
      customerName: appointmentForm.customerName.trim(),
      services,
      staffName: appointmentForm.staffName.trim(),
      status: appointmentForm.status.trim(),
    };

    try {
      if (editingAppointmentId) {
        await dashboardService.updateAppointment(editingAppointmentId, payload);
      } else {
        await dashboardService.createAppointment(payload);
      }
      await loadAppointments();
      resetAppointmentForm();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to save appointment';
      setResourceError('appointments', message);
    }
  };

  const handleProductSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const name = productForm.name.trim();
    const description = productForm.description.trim();
    const price = Number(productForm.price);
    const image = productForm.image;

    if (!name || !description || Number.isNaN(price) || price < 0 || (!image && !editingProductId)) {
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price.toString());
    if (image) {
      formData.append('image', image);
    }

    try {
      if (editingProductId) {
        await dashboardService.updateProduct(editingProductId, formData);
      } else {
        await dashboardService.createProduct(formData);
      }
      await loadProducts();
      resetProductForm();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create product';
      setResourceError('products', message);
    }
  };

  const handleEditProduct = (product: ProductItem) => {
    if (!product.id) {
      return;
    }
    setEditingProductId(product.id);
    setProductForm({
      name: product.name,
      description: product.description,
      price: String(product.price),
      image: null,
    });
    setActiveMenu('products');
  };

  const handleToggleProductStatus = async (product: ProductItem) => {
    if (!product.id) {
      return;
    }

    const nextIsActive = product.isActive === false;
    setProducts((prev) =>
      prev.map((item) =>
        item.id === product.id ? { ...item, isActive: nextIsActive } : item,
      ),
    );

    try {
      await dashboardService.updateProductStatus(product.id, nextIsActive);
    } catch (error) {
      setProducts((prev) =>
        prev.map((item) =>
          item.id === product.id ? { ...item, isActive: product.isActive } : item,
        ),
      );
      const message = error instanceof Error ? error.message : 'Failed to update product status';
      setResourceError('products', message);
    }
  };

  const handleEditAppointment = (appointment: AppointmentItem) => {
    if (!appointment.appointmentId) {
      return;
    }

    const localDateTime = appointment.appointmentDate
      ? new Date(appointment.appointmentDate).toISOString().slice(0, 16)
      : '';

    setEditingAppointmentId(appointment.appointmentId);
    setAppointmentForm({
      appointmentDate: localDateTime,
      customerName: appointment.customerName,
      services: appointment.services.join(', '),
      staffName: appointment.staffName,
      status: appointment.status || 'Booked',
    });
    setActiveMenu('appointments');
  };

  const handleToggleAppointmentStatus = async (appointment: AppointmentItem) => {
    if (!appointment.appointmentId) {
      return;
    }

    const nextStatus = appointment.status.toLowerCase() === 'cancelled' ? 'Booked' : 'Cancelled';

    try {
      await dashboardService.updateAppointment(appointment.appointmentId, {
        appointmentDate: appointment.appointmentDate,
        customerName: appointment.customerName,
        services: appointment.services,
        staffName: appointment.staffName,
        status: nextStatus,
      });
      await loadAppointments();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to update appointment status';
      setResourceError('appointments', message);
    }
  };

  const renderActiveScreen = () => {
    if (activeMenu === 'dashboard') {
      return <DashboardHomeScreen summary={dashboardSummary} onChangeMenu={setActiveMenu} />;
    }

    if (activeMenu === 'services') {
      return (
        <ServicesScreen
          services={services}
          loading={loadingByResource.services}
          error={errorByResource.services}
          editingServiceId={editingServiceId}
          form={serviceForm}
          onFormChange={handleServiceFormChange}
          onSubmit={handleServiceSubmit}
          onCancelEdit={resetServiceForm}
          onEdit={handleEditService}
          onToggleStatus={handleToggleServiceStatus}
        />
      );
    }

    if (activeMenu === 'customers') {
      return (
        <CustomersScreen
          customers={customers}
          loading={loadingByResource.customers}
          error={errorByResource.customers}
          editingCustomerId={editingCustomerId}
          form={customerForm}
          onFormChange={handleCustomerFormChange}
          onSubmit={handleCustomerSubmit}
          onCancelEdit={resetCustomerForm}
          onEdit={handleEditCustomer}
          onToggleStatus={handleToggleCustomerStatus}
        />
      );
    }

    if (activeMenu === 'products') {
      return (
        <ProductsScreen
          products={products}
          loading={loadingByResource.products}
          error={errorByResource.products}
          editingProductId={editingProductId}
          form={productForm}
          onFormChange={handleProductFormChange}
          onImageChange={handleProductImageChange}
          onSubmit={handleProductSubmit}
          onCancelEdit={resetProductForm}
          onEdit={handleEditProduct}
          onToggleStatus={handleToggleProductStatus}
        />
      );
    }

    if (activeMenu === 'staff') {
      return (
        <StaffScreen
          staff={staff}
          loading={loadingByResource.staff}
          error={errorByResource.staff}
          editingStaffId={editingStaffId}
          form={staffForm}
          onFormChange={handleStaffFormChange}
          onSubmit={handleStaffSubmit}
          onCancelEdit={resetStaffForm}
          onEdit={handleEditStaff}
          onToggleStatus={handleToggleStaffStatus}
        />
      );
    }

    if (activeMenu === 'users') {
      return (
        <GenericEntityScreen
          title="Users"
          loading={loadingByResource.users}
          error={errorByResource.users}
          rows={users}
        />
      );
    }

    return (
      <AppointmentsScreen
        appointments={appointments}
        loading={loadingByResource.appointments}
        error={errorByResource.appointments}
        editingAppointmentId={editingAppointmentId}
        form={appointmentForm}
        onFormChange={handleAppointmentFormChange}
        onSubmit={handleAppointmentSubmit}
        onCancelEdit={resetAppointmentForm}
        onEdit={handleEditAppointment}
        onToggleStatus={handleToggleAppointmentStatus}
      />
    );
  };

  return (
    <div className="dashboard-container">
      <header className="app-header">
        <div className="app-header-left">
          <h1 className="app-title">Operi Salon Admin</h1>
          <p className="app-user">Manage your day-to-day salon operations</p>
        </div>
        <button className="logout-btn app-logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <div className="dashboard-content">
        <div className={`dashboard-layout ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
          <SidebarMenu
            isSidebarOpen={isSidebarOpen}
            activeMenu={activeMenu}
            items={MENU_ITEMS}
            onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
            onChangeMenu={setActiveMenu}
          />

          <main className="dashboard-main">
            <section className="dashboard-hero">
              <h2>Salon Dashboard</h2>
              <p className="dashboard-subtitle">Welcome back, {user?.firstName || 'User'}</p>
            </section>

            {activeMenu !== 'dashboard' && (
              <section className="section-title-row">
                <h2>{activeMenuItem?.label || 'Dashboard'}</h2>
              </section>
            )}

            {renderActiveScreen()}
          </main>
        </div>
      </div>

      <footer className="app-footer">
        <p>(c) {new Date().getFullYear()} Operi Salon. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
