import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addInvoice, setInvoices } from '../actions/invoiceActions';
import '../Invoice.css';
import Pagination from './Pagination';
import InvoiceForm from './InvoiceForm';
// import InvoiceCards from './InvoiceCards';
import TimeSeriesGraph from './TimeSeriesGraph';



const ITEMS_PER_PAGE = 2;

const Invoice = ({ invoices, addInvoice }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(invoices.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentInvoices = invoices.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div>
      <h2>Invoice</h2>
      <div className="Dashboard-section">
        <h2>Add Invoice</h2>
        <InvoiceForm />
      </div>
      <div className="Dashboard-section">
        <h2>Invoices</h2>
        {/* <InvoiceCards /> */}
        {currentInvoices.map(invoice => (
            <div key={invoice.id} className="InvoiceCard">
              <p>Customer: {invoice.customerName}</p>
              <p>Salesperson: {invoice.salespersonName}</p>
              <p>Total Amount: ${invoice.totalAmount}</p>
              <p>Notes: {invoice.notes}</p>
            </div>
          ))}
          <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      </div>
      <div className="Dashboard-section">
        <h2>Revenue Graph</h2>
        <TimeSeriesGraph />
      </div>   
    </div>
  );
};

const mapStateToProps = (state) => ({
  invoices: state.invoices.data,
});

const mapDispatchToProps = {
  addInvoice,
  setInvoices,
};

export default connect(mapStateToProps, mapDispatchToProps)(Invoice);
