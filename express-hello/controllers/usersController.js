// LOW DB setup
// low db conveniently syncs all changes to an array of data to a JSON file for us automatically
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('./data/db.json')
const db = low(adapter)


const getUsers = (req, res) => {
  // get all users from "database"
  let users = db.get("users").value()
  res.send(users)
}

const getUser = (req, res) => {
  let { userId } = req.params

  // grab me a single user from "database"
  let userFound = db.get("users").find({id: userId}).value()
  res.send(userFound)
}

const addUser = (req, res) => {
  // all key value pairs of a users are stored in "req.body" objects

  // create a new user with the data given + a fresh ID
  let userNew = { ...req.body, id: Date.now().toString() }

  // write to json file
  userNew = db.get("users").push(userNew).write()
  res.send(userNew)
}

const updateUser = (req, res) => {
  let { userId } = req.params
  let { name, age } = req.body

  // use find + assign to update fields
  let userUpdated = db.get("users").find({id: userId}).assign({name, age}).write()
  res.send(userUpdated)
}

const deleteUser = (req, res) => {
  let { userId } = req.params

  // remove user with given id from JSON file 
  let userDeleted = db.get("users").remove({id: userId}).write()
  res.send( userDeleted )
}

module.exports = {
  getUsers, getUser, addUser, updateUser, deleteUser
}