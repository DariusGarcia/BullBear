require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const userRoutes = require('./routes/user')

const app = express()

// middleware
app.use(express.json())
app.use(cors())

// routes
app.use((req, res, next) => {
	console.log(req.path, req.method)
	next()
})

app.use('/api/user', userRoutes)

// connect to db
mongoose
	.connect(process.env.ATLAS_URI)
	.then(() => {
		console.log('Connected to Mongo DB')

		//listen for requests
		app.listen(process.env.PORT, () => {
			console.log(`Server started on port ${process.env.PORT}`)
		})
	})
	.catch((error) => {
		console.log(error)
	})
