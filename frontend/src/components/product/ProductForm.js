import React from 'react';
import * as yup from 'yup';
import FormModal from '../widget/FormModal';

const productFields = [
  { name: 'ProductName', label: 'Product Name', type: 'text', placeholder: 'Product Name', required: true },
  { name: 'ProductPicture', label: 'Product Picture', type: 'text', placeholder: 'Product Picture URL', required: true, readOnly: true, value: 'https://picsum.photos/200' }, // Hardcoded Picture URL
  { name: 'Stock', label: 'Product Stock', type: 'number', placeholder: 'Product Stock', required: true },
  { name: 'Price', label: 'Product Price', type: 'number', placeholder: 'Product Price', required: true, step: '0.01' },
];

const productValidationSchema = yup.object().shape({
  ProductName: yup
    .string()
    .required('Product Name is required')
    .min(2, 'Product Name must be at least 2 characters long')
    .max(100, 'Product Name must be at most 100 characters long'),
  
  ProductPicture: yup
    .string()
    .required('Product Picture URL is required')
    .url('Product Picture must be a valid URL'),
  
  Stock: yup
    .number()
    .required('Product Stock is required')
    .positive('Product Stock must be a positive number')
    .integer('Product Stock must be an integer')
    .min(1, 'Product Stock must be at least 1'),
  
  Price: yup
    .number()
    .required('Product Price is required')
    .positive('Product Price must be a positive number')
    .test('decimal', 'Product Price must have at most 2 decimal places', value => {
      return /^\d+(\.\d{1,2})?$/.test(value);
    })
});

const ProductForm = ({ onClose, onSubmit }) => {
  return (
    <FormModal
      title="Add Product"
      fields={productFields}
      validationSchema={productValidationSchema}
      onSubmit={onSubmit}
      onClose={onClose}
    />
  );
};

export default ProductForm;
