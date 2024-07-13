import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import './styles/App.css';
import Header from './components/widget/Header';
import Sidebar from './components/widget/Sidebar';
import Dashboard from './pages/DashboardPage';
import Invoice from './pages/InvoicePage';
import Product from './pages/ProductPage';
import Customer from './pages/CustomerPage';
import Salesperson from './pages/SalespersonPage';
import { setInvoices } from './features/invoice/invoiceActions';

const App = ({ setInvoices }) => {
  useEffect(() => {
    const exampleInvoices = [
      { id: 1, customerName: 'John Doe', salespersonName: 'Jane Smith', totalAmount: 100, notes: 'First invoice' },
      { id: 2, customerName: 'Mary Jane', salespersonName: 'John Smith', totalAmount: 200, notes: 'Second invoice' },
      { id: 3, customerName: 'Peter Parker', salespersonName: 'Jane Doe', totalAmount: 150, notes: 'Third invoice' },
      { id: 4, customerName: 'Clark Kent', salespersonName: 'Lois Lane', totalAmount: 250, notes: 'Fourth invoice' },
      { id: 5, customerName: 'Clark Kent', salespersonName: 'Jane Smith', totalAmount: 100, notes: 'First invoice' },
      { id: 6, customerName: 'Peter Parker', salespersonName: 'John Smith', totalAmount: 200, notes: 'Second invoice' },
      { id: 7, customerName: 'Mary Jane', salespersonName: 'Jane Doe', totalAmount: 150, notes: 'Third invoice' },
      { id: 8, customerName: 'John Doe', salespersonName: 'Lois Lane', totalAmount: 250, notes: 'Fourth invoice' },
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
              <Route path="/salesperson" element={<Salesperson />} />
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
