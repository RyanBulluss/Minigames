const express = require('express');
const router = express.Router();
const snakeCtrl = require('../controllers/snake');

router.post('/comments/', snakeCtrl.createComment);

router.get('/comments/', snakeCtrl.getAllComments);

router.post('/comments/delete/', snakeCtrl.deleteComment);

module.exports = router;