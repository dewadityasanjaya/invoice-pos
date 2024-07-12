import { ADD_INVOICE, SET_INVOICES } from '../actions/invoiceActions';

const initialState = {
  data: [],
};

const invoiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INVOICE:
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    case SET_INVOICES:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default invoiceReducer;
