import { configureStore } from '@reduxjs/toolkit';
import customerReducer from './customerSlice';
import productReducer from './productSlice';
import salespersonReducer from './salespersonSlice';
import invoiceReducer from './invoiceSlice';

const store = configureStore({
  reducer: {
    customers: customerReducer,
    products: productReducer,
    salespersons: salespersonReducer,
    invoices: invoiceReducer,
  },
});

export default store;
