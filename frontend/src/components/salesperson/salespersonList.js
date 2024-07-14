import React from 'react';

const SalespersonList = ({list, status, error}) => {
  return (
    <div>
      {status === 'loading' && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {list.map((salesperson) => (
          <li key={salesperson.salespersonid}>{salesperson.salespersonname}</li>
        ))}
      </ul>
    </div>
  );
};

export default SalespersonList;