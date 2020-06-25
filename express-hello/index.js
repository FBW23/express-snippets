const express = require('express');
const app = express();

// import my sub API (=routers)
const userRouter = require("./routes/users")

// express - the library for creating APIs
// app - a concrete API (created from express)

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

// APP = main API
// ROUTER = sub API

app.use(userRouter) // plub the "sub API" into our main api 
  // making all routes of this sub API available in our API

app.listen(8000, () => {
  console.log('Example app listening on port 8000!');
});

//Run app, then load http://localhost:8000 in a browser to see the output.
