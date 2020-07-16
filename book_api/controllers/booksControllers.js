// ROUTE LOGIC GOES HERE... 

const Book = require("../models/Book")

const getBooks = async (req, res, next) => {
  const books = await Book.find()
  res.send(books)
}

const getBook = async (req, res, next) => {
  const { id } = req.params
  const book = await Book.findById(id)
  res.send(book)
}

const addBook = async (req, res, next) => {
  res.send(req.body)
}

const updateBook = async (req, res, next) => {
  res.send({params: req.params, body: req.body})
}

const deleteBook = async (req, res, next) => {
  res.send(req.params)
}

module.exports = { getBooks, getBook, addBook, updateBook, deleteBook }