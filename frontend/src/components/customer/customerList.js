import React from 'react';

const CustomerList = ({list, status, error}) => {
  return (
    <div>
      {status === 'loading' && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {list.map((customer) => (
          <li key={customer.customerid}>{customer.customername}</li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerList;