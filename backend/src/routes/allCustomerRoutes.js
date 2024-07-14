const express = require('express');
const router = express.Router();
const allCustomerController = require('../controllers/allCustomerController');

router.get('/', allCustomerController.getAllCustomers);

module.exports = router;
