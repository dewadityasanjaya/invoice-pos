import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, fetchProducts } from '../redux/productSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PageHeader from '../components/widget/PageHeader';
import ProductList from '../components/product/ProductList';
import ProductForm from '../components/product/ProductForm';
import Pagination from '../components/widget/Pagination';

function ProductPage() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { list, status, error, totalPages } = useSelector((state) => state.products);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts({ page: currentPage, limit: 10 }));
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
      await dispatch(addProduct(formData)).unwrap();
      toast.success('Product added successfully!');
      handleModalClose();
      dispatch(fetchProducts({ page: 1, limit: 10 }));
      handlePageChange(1);
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <ToastContainer />
      <PageHeader
        titleHeader={"Product"}
        onClickHandle={handleAddButtonClick}
      />
      <ProductList 
        list={list}
        status={status}
        error={error}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {isModalOpen && <ProductForm onClose={handleModalClose} onSubmit={handleFormSubmit} />}
    </div>
  );
}

export default ProductPage;
