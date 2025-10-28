// routes/newsRoutes.js
const express = require('express');
const { checkNews } = require('../controllers/newsController');

const router = express.Router();
router.post('/check-news', checkNews);

module.exports = router;
