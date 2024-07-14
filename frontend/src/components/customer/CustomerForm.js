import React from 'react';
import * as yup from 'yup';
import FormModal from '../widget/FormModal';

const customerFields = [
  { name: 'CustomerName', label: 'Customer Name', type: 'text', placeholder: 'Customer Name', required: true }
];

const customerValidationSchema = yup.object().shape({
  CustomerName: yup.string().required('Customer Name is required')
});

const CustomerForm = ({ onClose, onSubmit }) => {
  return (
    <FormModal
      title="Add Customer"
      fields={customerFields}
      validationSchema={customerValidationSchema}
      onSubmit={onSubmit}
      onClose={onClose}
    />
  );
};

export default CustomerForm;
