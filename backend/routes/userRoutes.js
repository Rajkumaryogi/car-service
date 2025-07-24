const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

router.get('/profile', authMiddleware, userController.getProfile);
router.patch('/profile', authMiddleware, userController.updateProfile);
router.post('/cars', authMiddleware, userController.addCar);
router.get('/bookings', authMiddleware, userController.getMyBookings);

module.exports = router;