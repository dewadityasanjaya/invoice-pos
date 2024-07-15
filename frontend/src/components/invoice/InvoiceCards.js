import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import '../../styles/InvoiceCards.css';
import Card from '../widget/Card';
import InvoiceDetailModal from './InvoiceDetailModal';
import { fetchInvoiceDetails } from '../../redux/invoiceSlice';

function InvoiceCards({ list, status, error }) {
  const dispatch = useDispatch();
  const [selectedInvoiceID, setSelectedInvoiceID] = useState(null);

  const handleCardClick = async (invoiceID) => {
    await dispatch(fetchInvoiceDetails(invoiceID));
    setSelectedInvoiceID(invoiceID);
  };

  const handleCloseModal = () => {
    setSelectedInvoiceID(null);
  };

  return (
    <div className="InvoiceCards">
      {status === 'loading' && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {list.map((invoice) => (
        <div key={invoice.invoiceid} className="InvoiceCard" onClick={() => handleCardClick(invoice.invoiceid)}>
          <Card title={invoice.customername} footer={`$${invoice.totalamountpaid}`}>
            <p>{invoice.salespersonname}</p>
            <p>{invoice.notes}</p>
          </Card>
        </div>
      ))}
      {selectedInvoiceID && <InvoiceDetailModal onClose={handleCloseModal} />}
    </div>
  );
}

export default InvoiceCards;
