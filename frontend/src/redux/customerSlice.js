import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createCustomer, getCustomers } from '../services/customerService';

export const fetchCustomers = createAsyncThunk('customers/fetch', async ({ page, limit }) => {
  const data = await getCustomers(page, limit);
  return {
    customers: data.customers,
    totalPages: data.totalPages,
  };
});

export const addCustomer = createAsyncThunk('customers/add', async (customerData) => {
  const data = await createCustomer(customerData);
  return data;
});

const customerSlice = createSlice({
  name: 'customers',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
    totalPages: 1,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload.customers;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addCustomer.fulfilled, (state, action) => {
        state.list.push(action.payload);
      });
  }
});

export default customerSlice.reducer;
