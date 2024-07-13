import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createInvoice,
  getInvoiceSummary,
  getInvoiceDetails,
  getDailyRevenue,
  getWeeklyRevenue,
  getMonthlyRevenue
} from '../services/invoiceService';

export const addInvoice = createAsyncThunk('invoices/add', async (invoiceData) => {
  const data = await createInvoice(invoiceData);
  return data;
});

export const fetchInvoiceSummary = createAsyncThunk('invoices/fetchSummary', async () => {
  const data = await getInvoiceSummary();
  return data;
});

export const fetchInvoiceDetails = createAsyncThunk('invoices/fetchDetails', async (invoiceID) => {
  const data = await getInvoiceDetails(invoiceID);
  return data;
});

export const fetchDailyRevenue = createAsyncThunk('revenue/fetchDaily', async () => {
  const data = await getDailyRevenue();
  return data;
});

export const fetchWeeklyRevenue = createAsyncThunk('revenue/fetchWeekly', async () => {
  const data = await getWeeklyRevenue();
  return data;
});

export const fetchMonthlyRevenue = createAsyncThunk('revenue/fetchMonthly', async () => {
  const data = await getMonthlyRevenue();
  return data;
});

const invoiceSlice = createSlice({
  name: 'invoices',
  initialState: {
    summary: [],
    details: {},
    dailyRevenue: [],
    weeklyRevenue: [],
    monthlyRevenue: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addInvoice.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addInvoice.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(addInvoice.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchInvoiceSummary.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchInvoiceSummary.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.summary = action.payload;
      })
      .addCase(fetchInvoiceSummary.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchInvoiceDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchInvoiceDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.details = action.payload;
      })
      .addCase(fetchInvoiceDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchDailyRevenue.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDailyRevenue.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.dailyRevenue = action.payload;
      })
      .addCase(fetchDailyRevenue.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchWeeklyRevenue.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWeeklyRevenue.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.weeklyRevenue = action.payload;
      })
      .addCase(fetchWeeklyRevenue.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchMonthlyRevenue.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMonthlyRevenue.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.monthlyRevenue = action.payload;
      })
      .addCase(fetchMonthlyRevenue.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default invoiceSlice.reducer;
