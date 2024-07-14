import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProducts, createProduct } from '../services/productService';

export const fetchProducts = createAsyncThunk('products/fetch', async ({ page, limit }) => {
  const data = await getProducts(page, limit);
  return {
    products: data.products,
    totalPages: data.totalPages,
  };
});

export const addProduct = createAsyncThunk('products/add', async (productData) => {
  const data = await createProduct(productData);
  return data;
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
    totalPages: 1,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload.products;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.list.push(action.payload);
      });
  }
});

export default productSlice.reducer;
