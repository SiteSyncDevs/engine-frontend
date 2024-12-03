import axios from 'axios';

// Base URL for the API
const BASE_URL = 'http://localhost:8000';

class ApiHandler {
  constructor() {
    this.client = axios.create({
      baseURL: BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // GET request
  async get(endpoint, params = {}, config = {}) {
    try {
      const response = await this.client.get(endpoint, {
        ...config,
        params,
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // POST request
  async post(endpoint, data = {}, config = {}) {
    try {
        console.log(data)
      const response = await this.client.post(endpoint, data, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // PUT request
  async put(endpoint, data = {}, config = {}) {
    try {
      const response = await this.client.put(endpoint, data, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // PATCH request
  async patch(endpoint, data = {}, config = {}) {
    try {
      const response = await this.client.patch(endpoint, data, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // DELETE request
  async delete(endpoint, config = {}) {
    try {
      const response = await this.client.delete(endpoint, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Handle errors
  handleError(error) {
    if (error.response) {
      console.error('Error Response:', error.response.data);
    } else if (error.request) {
      console.error('Error Request:', error.request);
    } else {
      console.error('Error Message:', error.message);
    }
    throw error;
  }
}

export default new ApiHandler();

// Example usage:
// import api from './ApiHandler';
// api.get('/users').then(data => console.log(data));
