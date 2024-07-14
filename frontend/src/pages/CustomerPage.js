import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCustomer, fetchCustomers } from '../redux/customerSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PageHeader from '../components/widget/PageHeader';
import CustomerList from '../components/customer/CustomerList';
import CustomerForm from '../components/customer/CustomerForm';
import Pagination from '../components/widget/Pagination';

function CustomerPage() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { list, status, error, totalPages } = useSelector((state) => state.customers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(() => {
    dispatch(fetchCustomers({ page: currentPage, limit: 10 }));
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
      await dispatch(addCustomer(formData)).unwrap();
      toast.success('Customer added successfully!');
      handleModalClose();
      dispatch(fetchCustomers({ page: 1, limit: 10 }));
      handlePageChange(1);
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <ToastContainer />
      <PageHeader
        titleHeader={"Customer"}
        onClickHandle={handleAddButtonClick}
      />
      <CustomerList 
        list={list}
        status={status}
        error={error}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {isModalOpen && <CustomerForm onClose={handleModalClose} onSubmit={handleFormSubmit} />}
    </div>
  );
}

export default CustomerPage;
