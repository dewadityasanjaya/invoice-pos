import React  from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/App.css';
import Header from './components/widget/Header';
import Sidebar from './components/widget/Sidebar';
import Dashboard from './pages/DashboardPage';
import Invoice from './pages/InvoicePage';
import Product from './pages/ProductPage';
import Customer from './pages/CustomerPage';
import Salesperson from './pages/SalespersonPage';

const App = () => {
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

export default App;