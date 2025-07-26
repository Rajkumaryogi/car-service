const express = require('express');
const router = express.Router();
const { subscribe, verify } = require('../controllers/newsletterController');

router.post('/', subscribe);
router.get('/verify/:token', verify);

module.exports = router;