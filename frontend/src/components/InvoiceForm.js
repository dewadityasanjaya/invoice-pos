import React, { useState } from 'react';

function InvoiceForm() {
  const [date, setDate] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [salespersonName, setSalespersonName] = useState('');
  const [notes, setNotes] = useState('');
  const [products, setProducts] = useState([{ name: '', price: '' }]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (date && customerName && salespersonName && products.length) {
      alert('Invoice Submitted Successfully');
    } else {
      alert('Please fill in all required fields.');
    }
  };

  const handleProductChange = (index, event) => {
    const newProducts = products.map((product, i) => {
      if (i !== index) return product;
      return { ...product, [event.target.name]: event.target.value };
    });
    setProducts(newProducts);
  };

  const handleAddProduct = () => {
    setProducts([...products, { name: '', price: '' }]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Date</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      </div>
      <div>
        <label>Customer Name</label>
        <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required />
      </div>
      <div>
        <label>Salesperson Name</label>
        <input type="text" value={salespersonName} onChange={(e) => setSalespersonName(e.target.value)} required />
      </div>
      <div>
        <label>Notes</label>
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
      </div>
      {products.map((product, index) => (
        <div key={index}>
          <label>Product Name</label>
          <input type="text" name="name" value={product.name} onChange={(e) => handleProductChange(index, e)} required />
          <label>Product Price</label>
          <input type="number" name="price" value={product.price} onChange={(e) => handleProductChange(index, e)} required />
        </div>
      ))}
      <button type="button" onClick={handleAddProduct}>Add Product</button>
      <button type="submit">Submit Invoice</button>
    </form>
  );
}

export default InvoiceForm;
