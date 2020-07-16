const User = require("../models/User");
const Book = require('../models/Book');


const seed = async (req, res, next) => {

  await User.deleteMany()
  await Book.deleteMany()

  const books = [
    {title: "Sophie's world", author: "Sophie"},
    {title: "The untethered soul", author: "Michael Singer"},
    {title: "12 rules for life", author: "Jordan Peterson"},
  ]

  const booksDb = await Book.create(books)

  
  const users = [
      {email: "user1@dci.org", pw: "user1"},
      {email: "user2@dci.org", pw: "user2", books: [ booksDb[0]._id ] },
      {email: "user3@dci.org", pw: "user3", books: [ booksDb[1]._id, booksDb[2]._id ] },
  ]

  const usersDb = await User.create(users)

  res.send({ booksDb, usersDb })
}

module.exports = seed