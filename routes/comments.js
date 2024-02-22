const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comments');

router.post('/', commentsCtrl.createComment);

router.get('/:game/', commentsCtrl.getAllComments);

router.post('/delete/', commentsCtrl.deleteComment);

module.exports = router;