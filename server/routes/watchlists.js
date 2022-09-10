const express = require('express')

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
router.post('/', (req, res) => {
	res.json({ mssg: 'POST a  new stock in watchlist' })
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
