import React, { useState } from 'react';
import '../../styles/Invoice.css';

const InvoiceFormModal = ({ onClose }) => {
  const [formState, setFormState] = useState({
    customerName: '',
    salespersonName: '',
    totalAmount: '',
    notes: '',
  });

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/invoices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formState),
    })
      .then(response => response.json())
      .then(data => {
        onClose();
      })
      .catch(error => console.error('Error posting invoice:', error));
  };

  return (
    <div className="ModalBackdrop">
      <div className="ModalContent">
        <h2>Add Invoice</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="customerName" value={formState.customerName} onChange={handleChange} placeholder="Customer Name" required />
          <input type="text" name="salespersonName" value={formState.salespersonName} onChange={handleChange} placeholder="Salesperson Name" required />
          <input type="number" name="totalAmount" value={formState.totalAmount} onChange={handleChange} placeholder="Total Amount" required />
          <textarea name="notes" value={formState.notes} onChange={handleChange} placeholder="Notes" />
          <button type="submit">Submit</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default InvoiceFormModal;
