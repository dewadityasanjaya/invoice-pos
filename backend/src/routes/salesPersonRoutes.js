const express = require('express');
const router = express.Router();
const salespersonController = require('../controllers/salespersonController');

router.get('/', salespersonController.getSalespersons);
router.post('/', salespersonController.createSalesperson);

module.exports = router;
