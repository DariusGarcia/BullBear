require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')
const express = require('express')

// const userRoutes = require('./routes/user')
// const watchlistRoutes = require('./routes/watchlists')
// express app
const app = express()
app.use(cors())
app.options('*', cors())

app.all('*', function (req, res) {
	res.header('Access-Control-Allow-Origin', '*')
	res.header(
		'Access-Control-Allow-Headers',
		'Content-Type,Content-Length, Authorization, Accept,X-Requested-With'
	)
	res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
})

const userRoutes = require('./api/user')
const watchlistRoutes = require('./api/watchlists')

app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', 'https://bull-bear.vercel.app/')
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, OPTIONS, PUT, PATCH, DELETE'
	)
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
	res.setHeader('Access-Control-Allow-Credentials', true)
	next()
})

// middleware
app.use(express.json())

// routes
app.use((req, res, next) => {
	console.log(req.path, req.method)
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	)
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, PATCH, DELETE, OPTIONS'
	)
	next()
})

app.use('/api/user', cors(), userRoutes)
app.use('/api/watchlist', cors(), watchlistRoutes)

// connect to db
mongoose
	.connect(process.env.ATLAS_URI)
	.then(() => {
		console.log('Connected to Mongo DB')
		app.listen(process.env.PORT, () => {
			console.log(`Server started on port ${process.env.PORT}`)
		})
	})
	.catch((error) => {
		console.log(error)
	})

process.on('uncaughtException', function (err) {
	console.error(err)
	console.log('Node NOT Exiting...')
})

module.exports = app
