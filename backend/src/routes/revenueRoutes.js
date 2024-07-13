const express = require('express');
const router = express.Router();
const revenueController = require('../controllers/revenueController');

router.get('/daily', revenueController.getDailyRevenue);
router.get('/weekly', revenueController.getWeeklyRevenue);
router.get('/monthly', revenueController.getMonthlyRevenue);

module.exports = router;
