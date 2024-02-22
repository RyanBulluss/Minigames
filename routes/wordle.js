const express = require('express');
const router = express.Router();
const wordleCtrl = require('../controllers/wordle');

router.post('/comments/', wordleCtrl.createComment);

router.get('/comments/', wordleCtrl.getAllComments);

router.post('/comments/delete/', wordleCtrl.deleteComment);

module.exports = router;