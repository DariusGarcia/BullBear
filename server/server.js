require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
// const userRoutes = require('./routes/users');
// const authRoutes = require('./routes/auth');

// middlewares
app.use(express.json());
app.use(cors());

// routes
// app.use('/api/user', userRoutes);
// app.use('/api/auth', authRoutes);

const port = process.env.PORT || 5000;
app.use(require('./routes/record'));
// get driver connection
const dbo = require('./db/conn');

app.listen(port, () => {
	// perform a database connection when server starts
	dbo.connectToServer(function (err) {
		if (err) console.error(err);
	});
	console.log(`Server is running on port: ${port}`);
});
