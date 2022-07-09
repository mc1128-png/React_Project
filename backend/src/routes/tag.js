const express = require('express')
const router = express.Router()
const TagController = require('../controller/tag')
const authMiddleWare = require("../middleware/authMiddleWare")

router.post('/', authMiddleWare, TagController.createTagController)
router.get('/', TagController.getTagController)
router.delete('/:tag', authMiddleWare, TagController.deleteTagController)

module.exports = router