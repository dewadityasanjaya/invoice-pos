import React from 'react';
import { useSelector } from 'react-redux';

import '../../styles/InvoiceDetailModal.css';

const InvoiceDetailModal = ({ onClose }) => {
  const { details, status, error } = useSelector((state) => state.invoices);

  return (
    <div className="ModalBackdrop">
      <div className="ModalContent">
        <button className="CloseButton" onClick={onClose}>X</button>
        {status === 'loading' && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {details && (
          <div>
            <h2>Invoice Details</h2>
            <p><strong>Customer Name:</strong> {details.customername}</p>
            <p><strong>Salesperson Name:</strong> {details.salespersonname}</p>
            <p><strong>Invoice Date:</strong> {new Date(details.invoicedate).toLocaleDateString()}</p>
            <p><strong>Notes:</strong> {details.notes}</p>
            <p><strong>Total Amount Paid:</strong> ${details.totalamountpaid.toFixed(2)}</p>
            <h3>Items</h3>
            <ul>
              {details.items && details.items.map((item) => (
                <li key={item.productid}>
                  <img src={item.productpicture} alt={item.productname} style={{ width: '50px', height: '50px' }} />
                  <p><strong>Product Name:</strong> {item.productname}</p>
                  <p><strong>Quantity:</strong> {item.quantity}</p>
                  <p><strong>Unit Price:</strong> ${item.unitprice}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoiceDetailModal;
