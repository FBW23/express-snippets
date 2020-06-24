const express = require('express');
const app = express();

// express - the library for creating APIs
// app - a concrete API (created from express)

// LOW DB setup
// low db conveniently syncs all changes to an array of data to a JSON file for us automatically
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('./data/db.json')
const db = low(adapter)

app.use(express.json()) // parser for incoming json body data
// => the data sent to us will be made available to us in: req.body
// e.g. { name: "Rob", age: 37 } (=> that is the stuff you entered into postman UI body section)

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

// example call: /user/15 => "15" will be stored in req.params.userId
// we map an URL parameter to a variable this way
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

  // use find + assign to update fields
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