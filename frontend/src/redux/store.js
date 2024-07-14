import { configureStore } from '@reduxjs/toolkit';
import allCustomerReducer from './allCustomerSlice'
import allProductReducer from './allProductSlice';
import allSalespersonReducer from './allSalespersonSlice';
import customerReducer from './customerSlice';
import productReducer from './productSlice';
import salespersonReducer from './salespersonSlice';
import invoiceReducer from './invoiceSlice';

const store = configureStore({
  reducer: {
    allCustomers: allCustomerReducer,
    allProducts: allProductReducer,
    allSalespersons: allSalespersonReducer,
    customers: customerReducer,
    products: productReducer,
    salespersons: salespersonReducer,
    invoices: invoiceReducer,
  },
});

export default store;
