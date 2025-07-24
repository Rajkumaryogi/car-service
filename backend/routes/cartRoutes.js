const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const cartController = require('../controllers/cartController');

router.post('/add', authMiddleware, cartController.addToCart);
router.delete('/remove/:serviceId', authMiddleware, cartController.removeFromCart);
router.get('/', authMiddleware, cartController.getCart);

module.exports = router;