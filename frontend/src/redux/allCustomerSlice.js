import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllCustomers } from '../services/customerService';

export const fetchAllCustomers = createAsyncThunk('allCustomers/fetch', async () =>{
	const data = await getAllCustomers();
	return data;
  })

const allCustomerSlice = createSlice({
	name: 'allCustomers',
	initialState: {
	  list: [],
	  status: 'idle',
	  error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
	  builder
		.addCase(fetchAllCustomers.pending, (state) => {
		  state.status = 'loading';
		})
		.addCase(fetchAllCustomers.fulfilled, (state, action) => {
		  state.status = 'succeeded';
		  state.list = action.payload;
		})
		.addCase(fetchAllCustomers.rejected, (state, action) => {
		  state.status = 'failed';
		  state.error = action.error.message;
		})
	}
  })
  
  export default allCustomerSlice.reducer;