import axios from '../api/axios';

export const getAllCustomers = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get(`/customers?page=${page}&limit=${limit}`);
  return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const createCustomer = async (customerData) => {
  try{
    const response = await axios.post(`/customers`, customerData);
  return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};