require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

// Import routes
const customerRoutes = require('./routes/customerRoutes');
const productRoutes = require('./routes/productRoutes');
const salesPersonRoutes = require('./routes/salesPersonRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');
const revenueRoutes = require('./routes/revenueRoutes');

// Import error handling middleware
const errorHandler = require('./middleware/errorHandler');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use routes
app.use('/customers', customerRoutes);
app.use('/products', productRoutes);
app.use('/salespersons', salesPersonRoutes);
app.use('/invoices', invoiceRoutes);
app.use('/revenue', revenueRoutes);

app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
