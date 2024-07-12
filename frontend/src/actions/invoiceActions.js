export const ADD_INVOICE = 'ADD_INVOICE';
export const SET_INVOICES = 'SET_INVOICES';

export const addInvoice = (invoice) => ({
  type: ADD_INVOICE,
  payload: invoice,
});

export const setInvoices = (invoices) => ({
  type: SET_INVOICES,
  payload: invoices,
});
