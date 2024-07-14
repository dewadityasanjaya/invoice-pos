import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllSalespersons } from '../services/salespersonService';

export const fetchAllSalespersons = createAsyncThunk('allSalespersons/fetch', async () =>{
	const data = await getAllSalespersons();
	return data;
  })

const allSalespersonSlice = createSlice({
	name: 'allSalespersons',
	initialState: {
	  list: [],
	  status: 'idle',
	  error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
	  builder
		.addCase(fetchAllSalespersons.pending, (state) => {
		  state.status = 'loading';
		})
		.addCase(fetchAllSalespersons.fulfilled, (state, action) => {
		  state.status = 'succeeded';
		  state.list = action.payload;
		})
		.addCase(fetchAllSalespersons.rejected, (state, action) => {
		  state.status = 'failed';
		  state.error = action.error.message;
		})
	}
  })
  
  export default allSalespersonSlice.reducer;