import { createStore, combineReducers } from 'redux';
import invoiceReducer from './reducers/invoiceReducer';

const rootReducer = combineReducers({
  invoices: invoiceReducer,
});

const store = createStore(rootReducer);

export default store;
