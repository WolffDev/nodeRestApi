const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const env = require('dotenv/config');
const Genre = require('./models/genre');
const Book = require('./models/book');

// Middleware
app.use(bodyParser.json());

// Connect to Mongoose
mongoose.connect('mongodb://localhost/');
let db = mongoose.connection;

app.get('/', function(req, res) {
	res.send('Please use /api endpoint');
});

app.get('/api/genres', function(req, res) {
	Genre.getGenres(function(err, genres) {
		if(err) {
			throw err;
		}
		res.json(genres);
	});
});

app.post('/api/genres', function(req, res) {
	let genre = req.body;
	Genre.addGenre(genre, function(err, genre) {
		if(err) {
			throw err;
		}
		res.json(genre);
	});
});

app.get('/api/books', function(req, res) {
	Book.getBooks(function(err, books) {
		if(err) {
			throw err;
		}
		res.json(books);
	});
});

app.get('/api/books/:_id', function(req, res) {
	Book.getBookById(req.params._id, function(err, book) {
		if(err) {
			throw err;
		}
		res.json(book);
	});
});

app.listen(3000);
console.log("Running on port localhost:3000");