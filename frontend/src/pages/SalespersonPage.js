import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSalesperson, fetchSalespersons } from '../redux/salespersonSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PageHeader from '../components/widget/PageHeader';
import SalespersonList from '../components/salesperson/SalespersonList';
import SalespersonForm from '../components/salesperson/SalespersonForm';
import Pagination from '../components/widget/Pagination';

function SalespersonPage() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { list, status, error, totalPages } = useSelector((state) => state.salespersons);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(() => {
    dispatch(fetchSalespersons({ page: currentPage, limit: 10 }));
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
      await dispatch(addSalesperson(formData)).unwrap();
      toast.success('Salesperson added successfully!');
      handleModalClose();
      dispatch(fetchSalespersons({ page: 1, limit: 10 }));
      handlePageChange(1);
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <ToastContainer />
      <PageHeader
        titleHeader={"Salesperson"}
        onClickHandle={handleAddButtonClick}
      />
      <SalespersonList 
        list={list}
        status={status}
        error={error}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {isModalOpen && <SalespersonForm onClose={handleModalClose} onSubmit={handleFormSubmit} />}
    </div>
  );
}

export default SalespersonPage;
