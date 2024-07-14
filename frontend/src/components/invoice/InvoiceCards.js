import React from 'react';
import '../../styles/InvoiceCards.css';
import Card from '../widget/Card';

function InvoiceCards({ list, status, error }) {
  return (
    <div className="InvoiceCards">
      {status === 'loading' && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {list.map((invoice) => (
        <div key={invoice.invoiceid} className="InvoiceCard">
          <Card title={invoice.customername} footer={`$${invoice.totalamountpaid}`}>
            <p>{invoice.salespersonname}</p>
            <p>{invoice.notes}</p>
          </Card>
        </div>
      ))}
    </div>
  );
}

export default InvoiceCards;
