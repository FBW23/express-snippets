const mongoose = require("mongoose")

const Schema = mongoose.Schema
const model = mongoose.model

// SCHEMA - our blueprint for an animal DOCUMENT
const AnimalSchema = new Schema({
  name: String,
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

// Animal.create({ name: "Crabs" }).then(animal => {
//   console.log("Animal created in DB: ", animal)
// })
// Animal.create({ name: "Platypus" }).then(animal => {
//   console.log("Animal created in DB: ", animal)
// })
Animal.create({ name: "Duck" }).then(animal => {
  console.log("Animal created in DB: ", animal)
})
