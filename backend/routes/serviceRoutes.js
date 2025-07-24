const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const serviceController = require('../controllers/serviceController');

router.post('/book', authMiddleware, serviceController.bookService);
router.get('/', serviceController.getAllServices);

module.exports = router;