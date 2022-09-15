const Watchlist = require('../models/watchlistModel')

const mongoose = require('mongoose')

// get all stocks in watchlist
const getAllStocks = async (req, res) => {
	const allStocks = await Watchlist.find({}).sort({ createdAt: -1 })

	res.status(200).json({ allStocks })
}

// get a single workout
const getSingleStock = async (req, res) => {
	const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'No such stock found in watchlist' })
	}
	const stock = await Watchlist.findById(id)

	if (!stock) {
		return res.status(404).json({ error: 'No such stock in watchlist' })
	}

	res.status(200).json({ stock })
}

// add a stock to the watchlist
const createStock = async (req, res) => {
	const { ticker } = req.body

	// implemented this block of code to try to check for a duplicate stock in the database
	// const query = Watchlist.findOne({ ticker: ticker })
	// if (ticker == query) {
	// 	res.redirect('/')
	// }

	// add doc to mongoDB
	try {
		const watchlist = await Watchlist.create({ ticker })
		res.status(200).json(watchlist)
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
}

// delete a stock from the watchlist
const deleteStock = async (req, res) => {
	const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'No such stock found in watchlist' })
	}

	const watchlist = await Watchlist.findOneAndDelete({ _id: id })

	if (!watchlist) {
		return res.status(400).json({ error: 'No such stock found' })
	}

	res.status(200).json(watchlist)
}

module.exports = {
	createStock,
	getAllStocks,
	getSingleStock,
	deleteStock,
}
