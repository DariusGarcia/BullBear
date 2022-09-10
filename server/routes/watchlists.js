const express = require('express')

const Watchlist = require('../models/watchlistModel')

const router = express.Router()

// GET all stocks in watchlist
router.get('/', (req, res) => {
	res.json({ mssg: 'GET all stocks in watchlist' })
})

// GET a single stock in watchlist
router.get('/:id', (req, res) => {
	res.json({ mssg: 'GET a single stock in watchlist' })
})

// POST a single stock
router.post('/', async (req, res) => {
	const { ticker } = req.body

	try {
		const watchlist = await Watchlist.create({ ticker })
		res.status(200).json(watchlist)
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
})

// DELETE a single stock
router.delete('/:id', (req, res) => {
	res.json({ mssg: 'DELETE a  new stock in watchlist' })
})

// UPDATE a single stock in watchlist'
router.patch('/', (req, res) => {
	res.json({ mssg: 'UPDATE the watchlist' })
})

router.get('/hello', () => {})

module.exports = router
