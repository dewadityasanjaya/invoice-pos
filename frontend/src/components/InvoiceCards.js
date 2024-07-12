import React from 'react';

function InvoiceCards() {
  // Sample invoice data
  const invoices = [
    { id: 1, customerName: 'John Doe', salespersonName: 'Jane Smith', total: 100, notes: 'First invoice' },
    { id: 2, customerName: 'Mary Johnson', salespersonName: 'John Smith', total: 200, notes: 'Second invoice' },
    // Add more sample data as needed
  ];

  return (
    <div className="InvoiceCards">
      {invoices.map((invoice) => (
        <div className="InvoiceCard" key={invoice.id}>
          <h3>{invoice.customerName}</h3>
          <p>Salesperson: {invoice.salespersonName}</p>
          <p>Total: ${invoice.total}</p>
          <p>Notes: {invoice.notes}</p>
        </div>
      ))}
    </div>
  );
}

export default InvoiceCards;
