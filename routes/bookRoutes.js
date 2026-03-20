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

router.delete('/:id', async (req, res) => {
  try {
    const bookId = req.params.id;
    const deletedBook = await Book.findByIdAndDelete(bookId)

    if (!deletedBook) {
      return res.status(404).json({ message: "Cannot delete: Book not found." });
    }
    res.json({ message: "Book successfully removed from the shelf!", deletedBook })
  } catch (error) {
    res.status(500).json({ message: "Error deleting book", error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const bookId = req.params.id;
    const updateData = req.body;

    const updatedBook = await Book.findByIdAndUpdate(bookId, updateData, { new: true });

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found to update" });
    }
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: "Error updating book", error: error.message });
  }
});


export default router;