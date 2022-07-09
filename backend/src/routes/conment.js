const express = require('express')
const router = express.Router()
const CommentController = require('../controller/conment')
const authMiddleWare = require("../middleware/authMiddleWare")

router.post('/:slug', authMiddleWare, CommentController.createCommentController)
router.get('/:slug', CommentController.getCommentController)
router.delete('/:slug/:id', authMiddleWare, CommentController.deleteCommentController)

module.exports = router
