const express = require('express');
const router = express.Router();
const adminMiddleware = require('../middleware/adminMiddleware');
const adminController = require('../controllers/adminController');

router.post('/login', adminController.adminLogin);
router.get('/me', adminMiddleware, (req, res) => {
    res.send(req.admin);
    router.get('/logout', adminController.adminLogout);
});
router.post('/service', adminMiddleware, adminController.addService);
router.get('/services', adminMiddleware, adminController.getAllServices);
router.get('/users', adminMiddleware, adminController.getAllUsers);
router.get('/bookings', adminMiddleware, adminController.getAllBookings);
router.patch('/bookings/:id', adminMiddleware, adminController.updateBookingStatus);
router.delete('/services/:id', adminMiddleware, adminController.deleteService);
router.get('/user/:id', adminMiddleware, adminController.getUserDetails);

module.exports = router;