const express = require('express');
const router = express.Router();
const {sendMessage} = require('../controllers/sendMessageController');

router.post('/send', sendMessage);

module.exports = router;