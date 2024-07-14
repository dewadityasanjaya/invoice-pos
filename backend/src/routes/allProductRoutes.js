const express = require('express');
const router = express.Router();
const allProductController = require('../controllers/allProductController');

router.get('/', allProductController.getAllProducts);

module.exports = router;
