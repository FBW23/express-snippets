const express = require("express")
const userRouter = express.Router() // SUB API
const { getUsers, getUser, addUser, updateUser, deleteUser } = require("../controllers/usersController")

// *** USER CRUD ROUTES 
// (we will outsource the common path (=/user ) that is same for all our routes later...) 

userRouter.get("/user", getUsers)

// example call: /user/15 => "15" will be stored in req.params.userId
// we map an URL parameter to a variable this way
userRouter.get("/user/:userId", getUser)

userRouter.post("/user", addUser)

// patch = update someting in API
userRouter.patch("/user/:userId", updateUser)

// delete an item from API
userRouter.delete("/user/:userId", deleteUser)

module.exports = userRouter
// export default userRouter