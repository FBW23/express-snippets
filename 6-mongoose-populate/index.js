// EXPRESS
const express = require("express")
const app = express()

// MONGOOSE
const mongoose = require("mongoose")
const { Schema, model } = mongoose;

mongoose.connect("mongodb://localhost/courses_db", {
  useNewUrlParser: true, useUnifiedTopology: true
})
.then(() => console.log("Connection established"))

// COURSE
// TEACHER
// STUDENTS
// ROOM

const RoomSchema = new Schema({
  floor: { type: Number, required: true } ,
  nr: { type: Number, required: true }
})

const StudentSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: String,
})

const CourseSchema = new Schema({
  title: { type: String, required: true }, // e.g. FBW23
  room: RoomSchema, // => { floor: 2, nr: 27 }
  students: [{ ref: 'Student', type: Schema.Types.ObjectId }], // [ ID1, ID2, ID3... ]
  teachers: [{ ref: 'Teacher', type: Schema.Types.ObjectId }]
})

const TeacherSchema = new Schema({
  firstname: {type: String, required: true},
  lastname: {type: String, required: true},
  specialization: String
})


// RELATIONSHIP CLARIFICATION: 

  // COURSE - ROOM
  // 1 Course - 1 Room
  // 1 Room - 1 Course
  // => One-to-One

  // COURSE - STUDENT
  // 1 Course - n Students
  // 1 Student - 1 Course
  // => One-to-Many

  // COURSE - TEACHER
  // 1 Course - n Teachers
  // 1 Teacher - n Courses
  // => Many-to-Many 

const Course = model("Course", CourseSchema); // => collection: courses
const Teacher = model("Teacher", TeacherSchema); // => collection: teachers
const Student = model("Student", StudentSchema); // => collection: students


let port = 8000
app.listen(port, () => console.log(`Server started on port ${port}`))

// TRICK TO EXECUTE AWAIT ON TOP LEVEL
app.get("/seed", async (req, res, next) => {

  await Teacher.deleteMany()
  await Student.deleteMany()
  await Course.deleteMany()
  
  const teachers = await Teacher.create([
    { firstname: "Vasilis", lastname: "Psychas", specialization: "React" },
    { firstname: "Robert", lastname: "Ristock", specialization: "NodeJS" },
  ])
  let teacherIds = teachers.map(teacher => teacher._id)
  console.log("Teachers created: ", teachers)

  const students = await Student.create([
    {firstname: "Julia" },
    {firstname: "Nicolo" }, 
    {firstname: "Constantine" },
  ])
  let studentIds = students.map(student => student._id)
  console.log("Students created: ", students)
  console.log(studentIds)

  const course = await Course.create({
    title: "FBW23", 
    room: { nr: 27, floor: 2 }, // one-to-one
    students: studentIds,
    teachers: teacherIds
  })
  console.log("Course created:" , course)

  res.send({ teachers, students, course })
})