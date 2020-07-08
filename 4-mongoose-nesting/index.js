const mongoose = require("mongoose")
const { Schema, model } = mongoose


mongoose.connect("mongodb://localhost/courses_db", {
  useNewUrlParser: true, useUnifiedTopology: true
})
.then(() => console.log("Connection established"))

// COURSE
// TEACHER
// STUDENTS

// COURSE => has 1 TEACHER
// COURSE => has many STUDENTS

const TeacherSchema = new Schema({
  firstname: {type: String, required: true},
  lastname: String,
  specialization: String
}, {_id: false})

const StudentSchema = new Schema({
  firstname: { type: String, required: true }
})

const CourseSchema = new Schema({
  title: { type: String, required: true }, // e.g. FBW23
  teacher: { // making a subdocument required
    type: TeacherSchema,
    required: true
  },
  students: [StudentSchema] // array of student documents
})

const Course = model("Course", CourseSchema) // Course => Mongoose makes this out of it: courses

// TRICK TO EXECUTE AWAIT ON TOP LEVEL
Course.deleteMany().then(() => {

  Course.create({
    title: "FBW23", 
    // teacher => subdocument
    teacher: {
      firstname: "Robert",
      lastname: "Ristock",
      // specialization: "Fullstack"
    },
    // students => array of subdocuments
    students: [
      {firstname: "Nicolo"}, 
      {firstname: "Constantine"}
    ]
  })

})
  
// IIFE (Immediately invoked function expression)
