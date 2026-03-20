import express from 'express';
import Book from '../models/Book.js'

const router = express.Router();


router.get('/', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

router.get('/:id', async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: "Book not found!" })
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: "Error fetching book", error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const newBook = new Book(req.body);
    const savedBook = await newBook.save();

    res.status(201).json(savedBook)
  } catch (error) {
    res.status(400).json({ message: "Error saving book", error: error.message });
  }

});


export default router;