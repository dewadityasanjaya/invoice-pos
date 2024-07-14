require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import routes
const allCustomerRoutes = require('./routes/allCustomerRoutes');
const allProductRoutes = require('./routes/allProductRoutes');
const allSalespersonRoutes = require('./routes/allSalespersonRoutes');
const customerRoutes = require('./routes/customerRoutes');
const productRoutes = require('./routes/productRoutes');
const salespersonRoutes = require('./routes/salespersonRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');
const revenueRoutes = require('./routes/revenueRoutes');

// Import error handling middleware
const errorHandler = require('./middleware/errorHandler');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Use routes
app.use('/allCustomers', allCustomerRoutes);
app.use('/allProducts', allProductRoutes);
app.use('/allSalespersons', allSalespersonRoutes);
app.use('/customers', customerRoutes);
app.use('/products', productRoutes);
app.use('/salespersons', salespersonRoutes);
app.use('/invoices', invoiceRoutes);
app.use('/revenue', revenueRoutes);

app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
