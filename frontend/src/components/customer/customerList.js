import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomers } from '../../redux/customerSlice';
import Pagination from '../widget/Pagination';

const CustomerList = () => {
  const dispatch = useDispatch();
  const { list, status, error, totalPages } = useSelector((state) => state.customers);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchCustomers({ page: currentPage, limit: 10 }));
  }, [dispatch, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {status === 'loading' && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {list.map((customer) => (
          <li key={customer.customerid}>{customer.customername}</li>
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

export default CustomerList;