import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/productSlice';
import Pagination from '../widget/Pagination';

const ProductList = () => {
  const dispatch = useDispatch();
  const { list, status, error, totalPages } = useSelector((state) => state.products);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchProducts({ page: currentPage, limit: 10 }));
  }, [dispatch, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {status === 'loading' && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {list.map((product) => (
          <li key={product.productid}>{product.productname}</li>
        ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ProductList;