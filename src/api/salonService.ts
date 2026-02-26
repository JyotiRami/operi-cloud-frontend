import { API_ENDPOINTS } from '../constants';

class SalonService {
  private getAuthHeaders() {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
    };
  }

  async getAllSalons() {
    try {
      const response = await fetch(API_ENDPOINTS.SALON.GET_ALL, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch salons: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Get salons error:', error);
      throw error;
    }
  }

  async getSalonById(id: string) {
    try {
      const response = await fetch(API_ENDPOINTS.SALON.GET_BY_ID(id), {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch salon: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Get salon error:', error);
      throw error;
    }
  }

  async updateSalon(id: string, data: any) {
    try {
      const response = await fetch(API_ENDPOINTS.SALON.UPDATE(id), {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Failed to update salon: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Update salon error:', error);
      throw error;
    }
  }

  async deleteSalon(id: string) {
    try {
      const response = await fetch(API_ENDPOINTS.SALON.DELETE(id), {
        method: 'DELETE',
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Failed to delete salon: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Delete salon error:', error);
      throw error;
    }
  }
}

export default new SalonService();
