const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');

router.post('/', invoiceController.createInvoice);
router.get('/summary', invoiceController.getInvoiceSummary);
router.get('/:id', invoiceController.getInvoiceDetails);

module.exports = router;
