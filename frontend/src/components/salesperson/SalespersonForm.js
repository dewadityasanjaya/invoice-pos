import React from 'react';
import * as yup from 'yup';
import FormModal from '../widget/FormModal';

const salespersonFields = [
  { name: 'SalespersonName', label: 'Salesperson Name', type: 'text', placeholder: 'Salesperson Name', required: true }
];

const salespersonValidationSchema = yup.object().shape({
  SalespersonName: yup.string().required('Salesperson Name is required')
});

const SalespersonForm = ({ onClose, onSubmit }) => {
  return (
    <FormModal
      title="Add Salesperson"
      fields={salespersonFields}
      validationSchema={salespersonValidationSchema}
      onSubmit={onSubmit}
      onClose={onClose}
    />
  );
};

export default SalespersonForm;
