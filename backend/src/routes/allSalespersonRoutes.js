const express = require('express');
const router = express.Router();
const allSalespersonController = require('../controllers/allSalespersonController');

router.get('/', allSalespersonController.getAllSalesperson);

module.exports = router;
