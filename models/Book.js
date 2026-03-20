import mongoose from "mongoose";

const { Schema } = mongoose;

const bookSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
  },
  isbn: {
    type: String,
    unique: true,
  },
  publishedDate: {
    type: Date,
  },
  inStock: {
    type: Boolean,
    default: true
  }

});

const Book = mongoose.model("Book", bookSchema);

export default Book
