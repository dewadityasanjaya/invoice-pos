import axios from '../api/axios';

export const getAllSalespersons = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get(`/salespersons?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const createSalesperson = async (salespersonData) => {
  try {
    const response = await axios.post('/salespersons', salespersonData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
