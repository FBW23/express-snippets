const express = require('express');
const app = express();

// express - the library for creating APIs
// app - setup a concrete API

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('./data/db.json')
const db = low(adapter)

// { name: vasilis, age: 32 } => req.body
app.use(express.json()) // parser for incoming json body data

// req => request
// res => response
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get("/test", (req, res) => {
  res.send("Test")
})


// *** USER CRUD ROUTES 
// (we will outsource them tomorrow into an own file)

app.get("/user", (req, res) => {
  // get all users from "database"
  let users = db.get("users").value()
  res.send(users)
})

// /user/15 => 15 will be stored in 
app.get("/user/:userId", (req, res) => {
  let { userId } = req.params

  // grab me a single user from "database"
  let userFound = db.get("users").find({id: userId}).value()
  res.send(userFound)
})

app.post("/user", (req, res) => {
  // all key value pairs of a users are stored in "req.body" objects

  // create a new user with the data given + a fresh ID
  let userNew = { ...req.body, id: Date.now().toString() }

  // write to json file
  userNew = db.get("users").push(userNew).write()
  res.send(userNew)
})

app.patch("/user/:userId", (req, res) => {
  let { userId } = req.params 
  let { name, age } = req.body

  let userUpdated = db.get("users").find({id: userId}).assign({name, age}).write()

  res.send(userUpdated)
})

app.delete("/user/:userId", (req, res) => {
  let { userId } = req.params

  // remove user with given id from JSON file 
  let userDeleted = db.get("users").remove({id: userId}).write()
  res.send( userDeleted )
})

app.listen(8000, () => {
  console.log('Example app listening on port 8000!');
});

//Run app, then load http://localhost:8000 in a browser to see the output.