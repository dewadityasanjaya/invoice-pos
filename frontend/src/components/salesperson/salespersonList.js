import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSalespersons } from '../../redux/salespersonSlice';
import Pagination from '../widget/Pagination';

const SalespersonList = () => {
  const dispatch = useDispatch();
  const { list, status, error, totalPages } = useSelector((state) => state.salespersons);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchSalespersons({ page: currentPage, limit: 10 }));
  }, [dispatch, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {status === 'loading' && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {list.map((salespersons) => (
          <li key={salespersons.salespersonid}>{salespersons.salespersonname}</li>
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

export default SalespersonList;