const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();
const mongoose = require("mongoose");
const { getBooks, getBook, addBook, updateBook, deleteBook } = require('./controllers/booksControllers');
const seed = require('./controllers/seedController');
const { getUsers, getUser, addUser, updateUser, deleteUser, loginUser } = require('./controllers/usersControllers');

const { Schema, model } = mongoose

const secretJwt = "sniffMeButYouNeverWill"


// DATABASE CONN SETUP
const strConn = "mongodb://localhost/books_db"
mongoose.connect(strConn, {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => console.log("Connection to database established!"))

app.use(cookieParser()) // parse incoming cookies
app.use(express.json()) // parses incoming bodies

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Provide some initial data
app.get('/seed', seed)


// AUTH CHECK MIDDLEWARE
// => IS THE TOKEN VALID?
const auth = (req, res, next) => {
  console.log("[AUTH MIDDLEWARE] Called...")

  // req.body => only defined when we setup JSON parser middleware!
  // req.cookies => only defined we setup COOKIE parser middleware!
  const token = req.cookies.token 
  console.log("Cookies received: ", req.cookies)

  if(!token) {
    return next( { message: "No token provided. Who do you think you are? We don't know!" } )
  }

  try {
    let decoded = jwt.verify(token, secretJwt) /// eydhehe$eua5$ => { _id: 12345}
    next()
  }
  catch(err) {
    next(err)
  }
  
} 

// book routes
app.get('/books', auth, getBooks)
app.get('/books/:id', getBook)
app.post('/books', addBook)
app.patch('/books/:id', updateBook)
app.delete('/books/:id', deleteBook)

// user routes
app.post('/login', loginUser)
app.get('/users', getUsers)
app.get('/users/:id', getUser)
app.post('/users', addUser)
app.patch('/users/:id', updateUser)
app.delete('/users/:id', deleteUser)

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500)
    .send({error: err.message })
})

app.listen(8000, () => {
  console.log('Example app listening on port 8000!');
});

//Run app, then load http://localhost:8000 in a browser to see the output.