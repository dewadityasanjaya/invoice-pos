import axios from '../api/axios';

export const getAllProducts = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get(`/products?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await axios.post('/products', productData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
