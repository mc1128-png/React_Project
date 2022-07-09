const express = require('express')
const router = express.Router()
const FavoriteController = require('../controller/favorite')
const authMiddleWare = require("../middleware/authMiddleWare")

router.post('/:slug', authMiddleWare, FavoriteController.addFavorite)
router.delete('/:slug', authMiddleWare, FavoriteController.removeFavorite)

module.exports = router
