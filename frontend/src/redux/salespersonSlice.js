import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllSalespersons, createSalesperson } from '../services/salespersonService';

export const fetchSalespersons = createAsyncThunk('salespersons/fetchAll', async ({ page, limit }) => {
  const data = await getAllSalespersons(page, limit);
  return {
    salespersons: data.salespersons,
    totalPages: data.totalPages,
  };
});

export const addSalesperson = createAsyncThunk('salespersons/add', async (salespersonData) => {
  const data = await createSalesperson(salespersonData);
  return data;
});

const salespersonSlice = createSlice({
  name: 'salespersons',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
    totalPages: 1,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSalespersons.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSalespersons.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload.salespersons;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchSalespersons.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addSalesperson.fulfilled, (state, action) => {
        state.list.push(action.payload);
      });
  }
});

export default salespersonSlice.reducer;
