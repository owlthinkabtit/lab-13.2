import express from require ('express');
import Book from require('../models/Book.js');

const router = express.Router();


router.get('/', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

router.post('/', async (req, res) => {
  const newBook = new Book(req.body);
  const savedBook = await newBook.save();
  res.status(201).json(savedBook)
});

module.exports = router;