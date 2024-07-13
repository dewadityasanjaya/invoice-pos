import axios from '../api/axios';

export const createInvoice = async (invoiceData) => {
  try {
    const response = await axios.post('/invoices', invoiceData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getInvoiceSummary = async () => {
  try {
    const response = await axios.get('/invoices/summary');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getInvoiceDetails = async (invoiceID) => {
  try {
    const response = await axios.get(`/invoices/${invoiceID}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getDailyRevenue = async () => {
  try {
    const response = await axios.get('/revenue/daily');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getWeeklyRevenue = async () => {
  try {
    const response = await axios.get('/revenue/weekly');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getMonthlyRevenue = async () => {
  try {
    const response = await axios.get('/revenue/monthly');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
