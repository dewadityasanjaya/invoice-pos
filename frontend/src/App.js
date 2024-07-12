import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Invoice from './components/Invoice';
import Product from './components/Product';
import Customer from './components/Customer';
import { setInvoices } from './actions/invoiceActions';

const App = ({ setInvoices }) => {
  useEffect(() => {
    // Example invoices data
    const exampleInvoices = [
      { id: 1, customerName: 'John Doe', salespersonName: 'Jane Smith', totalAmount: 100, notes: 'First invoice' },
      { id: 2, customerName: 'Mary Jane', salespersonName: 'John Smith', totalAmount: 200, notes: 'Second invoice' },
      { id: 3, customerName: 'Peter Parker', salespersonName: 'Jane Doe', totalAmount: 150, notes: 'Third invoice' },
      { id: 4, customerName: 'Clark Kent', salespersonName: 'Lois Lane', totalAmount: 250, notes: 'Fourth invoice' },
      // Add more invoices as needed
    ];
    setInvoices(exampleInvoices);
  }, [setInvoices]);

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="App-body">
          <Sidebar />
          <main className="App-main">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/invoice" element={<Invoice />} />
              <Route path="/product" element={<Product />} />
              <Route path="/customer" element={<Customer />} />
              <Route path="/" element={<Dashboard />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

const mapDispatchToProps = {
  setInvoices,
};

export default connect(null, mapDispatchToProps)(App);
