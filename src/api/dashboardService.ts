import { API_ENDPOINTS } from '../constants';

type UnknownRecord = Record<string, unknown>;

class DashboardService {
  private getAuthHeaders() {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    };
  }

  private getAuthHeadersForMultipart() {
    return {
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    };
  }

  private async request<T>(
    url: string,
    options: RequestInit = {},
    errorPrefix = 'Request failed',
  ): Promise<T> {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...this.getAuthHeaders(),
        ...(options.headers || {}),
      },
    });

    if (!response.ok) {
      throw new Error(`${errorPrefix}: ${response.status} ${response.statusText}`);
    }

    return (await response.json()) as T;
  }

  private normalizeList(payload: unknown): UnknownRecord[] {
    if (Array.isArray(payload)) {
      return payload as UnknownRecord[];
    }

    if (payload && typeof payload === 'object') {
      const obj = payload as Record<string, unknown>;
      const possibleArrays = [obj.items, obj.data, obj.results];
      for (const value of possibleArrays) {
        if (Array.isArray(value)) {
          return value as UnknownRecord[];
        }
      }
    }

    return [];
  }

  async getServices() {
    const payload = await this.request<unknown>(
      API_ENDPOINTS.SERVICES.GET_ALL,
      { method: 'GET' },
      'Failed to fetch services',
    );
    return this.normalizeList(payload);
  }

  async createService(data: UnknownRecord) {
    return this.request<UnknownRecord>(
      API_ENDPOINTS.SERVICES.CREATE,
      {
        method: 'POST',
        body: JSON.stringify(data),
      },
      'Failed to create service',
    );
  }

  async updateService(id: string, data: UnknownRecord) {
    return this.request<UnknownRecord>(
      API_ENDPOINTS.SERVICES.UPDATE(id),
      {
        method: 'PUT',
        body: JSON.stringify(data),
      },
      'Failed to update service',
    );
  }

  async deleteService(id: string) {
    return this.request<UnknownRecord>(
      API_ENDPOINTS.SERVICES.DELETE(id),
      { method: 'DELETE' },
      'Failed to delete service',
    );
  }

  async getCustomers() {
    const payload = await this.request<unknown>(
      API_ENDPOINTS.CUSTOMERS.GET_ALL,
      { method: 'GET' },
      'Failed to fetch customers',
    );
    return this.normalizeList(payload);
  }

  async getProducts() {
    const payload = await this.request<unknown>(
      API_ENDPOINTS.PRODUCTS.GET_ALL,
      { method: 'GET' },
      'Failed to fetch products',
    );
    return this.normalizeList(payload);
  }

  async createProduct(formData: FormData) {
    const response = await fetch(API_ENDPOINTS.PRODUCTS.CREATE, {
      method: 'POST',
      headers: this.getAuthHeadersForMultipart(),
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to create product: ${response.status} ${response.statusText}`);
    }

    return (await response.json()) as UnknownRecord;
  }

  async updateProduct(id: string, formData: FormData) {
    const response = await fetch(API_ENDPOINTS.PRODUCTS.UPDATE(id), {
      method: 'PUT',
      headers: this.getAuthHeadersForMultipart(),
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to update product: ${response.status} ${response.statusText}`);
    }

    return (await response.json()) as UnknownRecord;
  }

  async updateProductStatus(id: string, isActive: boolean) {
    const response = await fetch(API_ENDPOINTS.PRODUCTS.UPDATE_STATUS(id, isActive), {
      method: 'PATCH',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to update product status: ${response.status} ${response.statusText}`);
    }

    return (await response.json()) as UnknownRecord;
  }

  async createCustomer(data: UnknownRecord) {
    return this.request<UnknownRecord>(
      API_ENDPOINTS.CUSTOMERS.CREATE,
      {
        method: 'POST',
        body: JSON.stringify(data),
      },
      'Failed to create customer',
    );
  }

  async updateCustomer(id: string, data: UnknownRecord) {
    return this.request<UnknownRecord>(
      API_ENDPOINTS.CUSTOMERS.UPDATE(id),
      {
        method: 'PUT',
        body: JSON.stringify(data),
      },
      'Failed to update customer',
    );
  }

  async getUsers() {
    const payload = await this.request<unknown>(
      API_ENDPOINTS.USERS.GET_ALL,
      { method: 'GET' },
      'Failed to fetch users',
    );
    return this.normalizeList(payload);
  }

  async getStaff() {
    const payload = await this.request<unknown>(
      API_ENDPOINTS.STAFF.GET_ALL,
      { method: 'GET' },
      'Failed to fetch staff',
    );
    return this.normalizeList(payload);
  }

  async createStaff(data: UnknownRecord) {
    return this.request<UnknownRecord>(
      API_ENDPOINTS.STAFF.CREATE,
      {
        method: 'POST',
        body: JSON.stringify(data),
      },
      'Failed to create staff',
    );
  }

  async updateStaff(id: string, data: UnknownRecord) {
    return this.request<UnknownRecord>(
      API_ENDPOINTS.STAFF.UPDATE(id),
      {
        method: 'PUT',
        body: JSON.stringify(data),
      },
      'Failed to update staff',
    );
  }

  async createAppointment(data: UnknownRecord) {
    return this.request<UnknownRecord>(
      API_ENDPOINTS.APPOINTMENTS.CREATE,
      {
        method: 'POST',
        body: JSON.stringify(data),
      },
      'Failed to create appointment',
    );
  }

  async updateAppointment(id: string, data: UnknownRecord) {
    return this.request<UnknownRecord>(
      API_ENDPOINTS.APPOINTMENTS.UPDATE(id),
      {
        method: 'PUT',
        body: JSON.stringify(data),
      },
      'Failed to update appointment',
    );
  }

  async getAppointments() {
    const payload = await this.request<unknown>(
      API_ENDPOINTS.APPOINTMENTS.GET_ALL,
      { method: 'GET' },
      'Failed to fetch appointments',
    );
    return this.normalizeList(payload);
  }
}

export default new DashboardService();
