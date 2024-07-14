import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addInvoice, fetchInvoiceSummary, fetchInvoiceDetails, fetchDailyRevenue, fetchWeeklyRevenue, fetchMonthlyRevenue } from '../redux/invoiceSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PageHeader from '../components/widget/PageHeader';
import InvoiceForm from '../components/invoice/InvoiceForm';
import Pagination from '../components/widget/Pagination';

function InvoicePage() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { list, status, error, totalPages } = useSelector((state) => state.invoices);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(() => {
    dispatch(fetchInvoiceSummary({ page: currentPage, limit: 10 }));
  }, [dispatch, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAddButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = async (formData) => {
    try {
      await dispatch(addInvoice(formData)).unwrap();
      toast.success('Invoice added successfully!');
      handleModalClose();
      dispatch(fetchInvoiceSummary({ page: 1, limit: 10 }));
      handlePageChange(1);
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <ToastContainer />
      <PageHeader
        titleHeader={"Invoice"}
        onClickHandle={handleAddButtonClick}
      />
      {/* <CustomerList 
        list={list}
        status={status}
        error={error}
      /> */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {isModalOpen && <InvoiceForm onClose={handleModalClose} onSubmit={handleFormSubmit} />}
    </div>
  );
}

export default InvoicePage;
