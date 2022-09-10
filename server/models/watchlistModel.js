const mongoose = require('mongoose')

const Schema = mongoose.Schema

const watchlistSchema = new Schema(
	{
		ticker: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Watchlist', watchlistSchema)
