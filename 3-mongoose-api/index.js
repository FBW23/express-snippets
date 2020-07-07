const mongoose = require("mongoose")
const express = require("express")
const app = express()

const Schema = mongoose.Schema
const model = mongoose.model

// SCHEMA - our blueprint for an animal DOCUMENT
const AnimalSchema = new Schema({
  name: { type: String, reqired: true },
  age: Number
})

// MODEL - our CRUD object for the animal collection
const Animal = model("Animal", AnimalSchema)
// model name: "Animal" => is converted to "animals" => THIS is the collection name mongoose will try to access in MongoDB


// connection string
const dbName = "animals"
const options = {useNewUrlParser: true, useUnifiedTopology: true}
mongoose.connect(`mongodb://localhost/${dbName}`, options)
.then(() => {
  console.log("Connected to MongoDB")
})


// SEEDING => setting some initial data

app.get("/seed", async (req, res) => {
 
  const animal1 = await Animal.create({ name: "Crabs" })
  console.log("Animal created in DB: ", animal1)

  const animal2  = await Animal.create({ name: "Platypus" })
  console.log("Animal created in DB: ", animal2)
  
  // the field "sound" will get ignored by mongoose! Because it is not set in our schema!
  const animal3 = await Animal.create({ name: "Duck", sound: "quack" })
  console.log("Animal created in DB: ", animal3)

  res.send({ animal1, animal2, animal3 })
})

app.get("/purge", async (req, res) => {
  let result = await Animal.deleteMany()
  res.send(result)
})


// JSON Parser middleware!
app.use(express.json())  
// => this will get applied to ALL incoming requests!
// API receices a body with JSON, but as string, e.g. "{name: 'jadda'}"  
// => it will parse the received JSON into "req.body" object
// => so we have the data available in all our routes (using req.body)

// GET ALL animals
app.get("/animal", async (req, res, next) => {
  console.log("GET ROUTE animals called")
  // res.send([{name: "Duck"}, {name: "T-Rex"}])

  const animals = await Animal.find()
  res.send(animals)
})

// GET SINGLE animal
app.get("/animal/:id", async (req, res, next) => {
  let id = req.params.id
  console.log("GET ROUTE animal called", id)

  try {
    const animal = await Animal.findById(id)
    res.send(animal)
  }
  catch(err) {
    err.code = 404
    next(err) 
  }
})

// CREATE animal
app.post("/animal", async (req, res, next) => {
  console.log("POST ROUTE animal called");

  const animalCreated = await Animal.create(req.body)
  res.send(animalCreated)
})

// UPDATE animal
app.patch("/animal/:id", async (req, res, next) => {
  const id = req.params.id
  const fields = req.body
  console.log("PATCH ROUTE animal called", id);

  const animalUpdated = await Animal.findByIdAndUpdate(id, fields, {new: true})
  res.send(animalUpdated)
})

// DELETE animal
app.delete("/animal/:id", async (req, res, next) => {
  let id = req.params.id
  console.log("DELETE ROUTE animal called", );

  let animalDeleted = await Animal.findByIdAndDelete(id)
  res.send(animalDeleted)
})

// CENTRAL ERROR HANDLER
app.use((err, req, res, next) => {

  let code = err.code || 500 // if code given => take that one, otherwise assume 500 (=generic error)

  res.status(code).send({
    code: code,
    message: err.message
  })
})


app.listen(3000, () => console.log("API started up"))