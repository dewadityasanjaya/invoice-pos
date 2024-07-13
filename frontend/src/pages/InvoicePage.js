import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setInvoices } from '../features/invoice/invoiceActions';
import '../styles/Invoice.css';
import Pagination from '../components/widget/Pagination';
import InvoiceFormModal from '../components/invoice/InvoiceFormModal';
import TimeSeriesGraph from '../components/widget/TimeSeriesGraph';
import { MdAdd } from "react-icons/md";
import InvoiceCards from '../components/invoice/InvoiceCards';

const ITEMS_PER_PAGE = 4;

const Invoice = ({ invoices, setInvoices }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timePeriod, setTimePeriod] = useState('daily');

  const totalPages = Math.ceil(invoices.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentInvoices = invoices.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    fetch('/api/invoices')
      .then(response => response.json())
      .then(data => setInvoices(data))
      .catch(error => console.error('Error fetching invoices:', error));
  }, [setInvoices]);

  const handleAddInvoiceClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="InvoiceHeader">
        <h2>Invoice</h2>
        <button className="AddInvoiceButton" onClick={handleAddInvoiceClick}>
          <MdAdd /> Add Invoice
        </button>
      </div>
      <InvoiceCards
        currentInvoices={currentInvoices}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
        <div className="RevenueHeader">
          <h2>Revenue</h2>
          <div className="TimeSeriesFilter">
            <select
              id="timePeriodSelect"
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
      </div>
      <div className="RevenueSection">
        <TimeSeriesGraph />
      </div>
      {isModalOpen && <InvoiceFormModal onClose={handleModalClose} />}   
    </div>
  );
};

const mapStateToProps = (state) => ({
  invoices: state.invoices.data,
});

const mapDispatchToProps = {
  setInvoices,
};

export default connect(mapStateToProps, mapDispatchToProps)(Invoice);
