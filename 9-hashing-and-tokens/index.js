const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// secret used for JWT signing & verifying
let holySecret = "hackMeIfYouCan"

// potential new user in our system
let user = { _id: "123", email: "rob@dci.com", pwPlain: "hello123" }

// hashing a plain text password
// specify rounds of salting => the higher this number the longer it takes to create the hash
// making it harder for attackers to calculate all possible combinations
let pwHashed = bcrypt.hashSync(user.pwPlain, 10)
user.pwHashed = pwHashed

console.log("User pws: ", user.pwPlain, pwHashed)


/**
 * Login a user and create a token (=visitor card)
 */
const login = (email, pwPlain) => {  
  if(user.email != email) {
    console.log("Email does not exist");
    return;
  }

  // check if the password given matches with the stored hashed one
  let match = bcrypt.compareSync(pwPlain, user.pwHashed)
  console.log(match ? "Passwords match" : "Passwords do not match")

  if(!match) {
    return
  }

  // user authenticated => create a token (=visitor card)
  const token = jwt.sign({ _id: user._id }, holySecret)
  console.log("Token: ", token)
  return token
}

// login("rob@dci.com", "hello333")
const token = login("rob@dci.com", "hello123")

// read the information from the token
let decoded = jwt.verify(token, holySecret)
console.log("Verified token, data received: ", decoded)


// BCRYPT => PASSWORDS => CREATING HASHES & LOOKING UP HASHES
  // SIGNUP => CREATE HASHED PASSWORD
  // LOGIN => TO CHECK THE PASSWORD

// JWT => TOKEN => AUTHENTICATION ON SUBSEQUENT REQUESTS
  // ON ALL OTHER REQUESTS TO SECRET ROUTES
