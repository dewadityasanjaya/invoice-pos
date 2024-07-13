import React from 'react';
import '../../styles/InvoiceCards.css';
import Card from '../widget/Card';

function InvoiceCards({currentInvoices}) {

  return (
    <div className="InvoiceCards">
      {currentInvoices.map(invoice => (
          <div key={invoice.id} className="InvoiceCard">
            <Card title={invoice.customerName} footer={`$${invoice.totalAmount}`}>
              <p>{invoice.salespersonName}</p>
              <p>{invoice.notes}</p>
            </Card>
          </div>
        ))}
    </div>
  );
}

export default InvoiceCards;
