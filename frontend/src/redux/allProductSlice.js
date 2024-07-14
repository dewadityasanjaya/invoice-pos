import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllProducts } from '../services/productService';

export const fetchAllProducts = createAsyncThunk('allProducts/fetch', async () =>{
	const data = await getAllProducts();
	return data;
  })

const allProductSlice = createSlice({
	name: 'allProduct',
	initialState: {
	  list: [],
	  status: 'idle',
	  error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
	  builder
		.addCase(fetchAllProducts.pending, (state) => {
		  state.status = 'loading';
		})
		.addCase(fetchAllProducts.fulfilled, (state, action) => {
		  state.status = 'succeeded';
		  state.list = action.payload;
		})
		.addCase(fetchAllProducts.rejected, (state, action) => {
		  state.status = 'failed';
		  state.error = action.error.message;
		})
	}
  })
  
  export default allProductSlice.reducer;