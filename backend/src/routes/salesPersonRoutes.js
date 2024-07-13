const express = require('express');
const router = express.Router();
const salesPersonController = require('../controllers/salesPersonController');

router.get('/', salesPersonController.getAllSalespersons);
router.post('/', salesPersonController.createSalesperson);

module.exports = router;
