const express = require('express')
const {
	getAllStocks,
	createStock,
	getSingleStock,
	deleteStock,
} = require('../controllers/watchlistController')

const router = express.Router()

// GET all stocks in watchlist
router.get('/', getAllStocks)

// GET a single stock in watchlist
router.get('/:id', getSingleStock)

// POST a single stock
router.post('/', createStock)

// DELETE a single stock
router.delete('/:id', deleteStock)

module.exports = router
