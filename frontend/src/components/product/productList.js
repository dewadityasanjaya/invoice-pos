import React from 'react';

const ProductList = ({list, status, error}) => {
  return (
    <div>
      {status === 'loading' && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {list.map((product) => (
          <li key={product.productid}>{product.productname}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;