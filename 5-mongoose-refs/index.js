const mongoose = require("mongoose")
const { Schema, model } = mongoose;

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
})

const StudentSchema = new Schema({
  firstname: { type: String, required: true }
})

// NESTING OR REFFING a related info => you have to chose one over the other
const CourseSchema = new Schema({
  title: { type: String, required: true }, // e.g. FBW23
  teacher: { ref: "Teacher", type: Schema.Types.ObjectId }, 
  // teacher: { // making a subdocument required
  //   type: TeacherSchema,
  //   required: true
  // },
  students: [StudentSchema] // array of student documents
})

// => collection: courses
const Course = model("Course", CourseSchema); // Course => Mongoose makes this out of it: courses
// => collection: teachers
const Teacher = model("Teacher", TeacherSchema);

// TRICK TO EXECUTE AWAIT ON TOP LEVEL
(async () => {

  await Course.deleteMany()
  
  const teacher = await Teacher.create({
    firstname: "Robert",
    lastname: "Ristock",
    specialization: "Fullstack"
  })
  console.log("Teacher created: ", teacher)

  const course = await Course.create({
      title: "FBW17", 
      teacher: teacher._id, // reference to a teacher with that ID in the teachers collection
      // students => array of subdocuments
      students: [
        {firstname: "Nicolo"}, 
        {firstname: "Constantine"}
      ]
    })

  console.log(course)
  
})() // => IIFE (Immediately invoked function expression)
