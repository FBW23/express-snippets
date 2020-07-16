const jwt = require("jsonwebtoken")

const secretJwt = "sniffMeButYouNeverWill"

// ROUTE LOGIC GOES HERE... 

const User = require("../models/User")

const loginUser = async (req, res, next) => {

  const { email, pw } = req.body // email, pw

  const userFound = await User.findOne({email})

  if(!userFound) {
    return next ( { message: "This user with that email does not exist" } )
  }

  if(userFound.pw != pw) {
    return next ( { message: "The passwords do not match" })
  }

  const token = jwt.sign({ _id: userFound._id}, secretJwt)

  res
    .cookie("token", token)
    .send(userFound)
}

const getUsers = async (req, res, next) => {
  const users = await User.find()
  res.send(users)
}

const getUser = async (req, res, next) => {
  const { id } = req.params
  const user = await User.findById(id)
  res.send(user)
}

const addUser = async (req, res, next) => {
  res.send(req.body)
}

const updateUser = async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.send(user)
}

const deleteUser = async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id)
  res.send(user)
}

module.exports = { loginUser, getUsers, getUser, addUser, updateUser, deleteUser }