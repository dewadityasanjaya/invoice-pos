import React, { useEffect } from 'react';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import FormModal from '../widget/FormModal';
import { fetchAllCustomers } from '../../redux/allCustomerSlice';
import { fetchAllProducts } from '../../redux/allProductSlice';
import { fetchAllSalespersons } from '../../redux/allSalespersonSlice';

const invoiceValidationSchema = yup.object().shape({
  InvoiceDate: yup.date().required('Invoice Date is required'),
  CustomerID: yup.string().required('Customer is required'),
  SalespersonID: yup.string().required('Salesperson is required'),
  Items: yup.array().of(
    yup.object().shape({
      ProductID: yup.string().required('Product is required'),
      Quantity: yup.number().required('Quantity is required').positive('Quantity must be a positive number').integer('Quantity must be an integer'),
      UnitPrice: yup.number().required('Unit Price is required').positive('Unit Price must be a positive number').test('decimal', 'Unit Price must have at most 2 decimal places', value => {
        return /^\d+(\.\d{1,2})?$/.test(value);
      })
    })
  ).required('At least one item is required').min(1, 'At least one item is required'),
  Notes: yup.string()
});

const InvoiceForm = ({ onClose, onSubmit }) => {
  const dispatch = useDispatch();
  const allCustomers = useSelector((state) => state.allCustomers.list);
  const allSalespersons = useSelector((state) => state.allSalespersons.list);
  const allProducts = useSelector((state) => state.allProducts.list);

  useEffect(() => {
    dispatch(fetchAllCustomers());
    dispatch(fetchAllProducts());
    dispatch(fetchAllSalespersons());
  }, [dispatch]);

  const invoiceFields = [
    {
      name: 'InvoiceDate',
      label: 'Invoice Date',
      type: 'date',
      placeholder: 'Select Date',
      required: true
    },
    {
      name: 'CustomerID',
      label: 'Customer',
      type: 'select',
      placeholder: 'Select Customer',
      required: true,
      options: allCustomers.map(customer => ({ value: customer.customerid, label: customer.customername }))
    },
    {
      name: 'SalespersonID',
      label: 'Salesperson',
      type: 'select',
      placeholder: 'Select Salesperson',
      required: true,
      options: allSalespersons.map(salesperson => ({ value: salesperson.salespersonid, label: salesperson.salespersonname }))
    },
    {
      name: 'Items',
      label: 'Items',
      type: 'array',
      placeholder: 'Add Items',
      required: true,
      fields: [
        {
          name: 'ProductID',
          label: 'Product',
          type: 'select',
          placeholder: 'Select Product',
          required: true,
          options: allProducts.map(product => ({ value: product.productid, label: product.productname }))
        },
        {
          name: 'Quantity',
          label: 'Quantity',
          type: 'number',
          placeholder: 'Quantity',
          required: true
        },
        {
          name: 'UnitPrice',
          label: 'Unit Price',
          type: 'number',
          placeholder: 'Unit Price',
          required: true,
          step: '0.01'
        }
      ]
    },
    {
      name: 'Notes',
      label: 'Notes',
      type: 'textarea',
      placeholder: 'Notes'
    }
  ];

  return (
    <FormModal
      title="Add Invoice"
      fields={invoiceFields}
      validationSchema={invoiceValidationSchema}
      onSubmit={onSubmit}
      onClose={onClose}
    />
  );
};

export default InvoiceForm;
