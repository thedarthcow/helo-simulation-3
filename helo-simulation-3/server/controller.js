const bcrypt = require('bcryptjs') //bcrypt is npm package

async function login(req, res) {
  const db = req.app.get('db')
  let foundUser = await db.get_user([req.body.username])
  console.log("I'm in login")
  console.log(req.body.username)
  console.log(foundUser)

  const user = foundUser[0]
  if (user)
    try {
      const correctPass = await bcrypt.compare(req.body.password, user.hash)
      if (!correctPass) {
        res.status(400).send('Password does not match')
      } else {
        console.log("I GOT HERE");
        req.session.user = {
          username: req.body.username
        }
        console.log('user on session =', req.session.user)
        res.status(200).send('you logged in')
      }
    } catch {
      console.log('This username is already in use')
    }
}
//destroys the current session.
function logout(req, res) {
  req.session.destroy()
  return res.status(200).send('you logged out of it')
  console.log("yay its working")
}
//checks for a username on the users table of the database, and kicks back if there is one. Else it posts the form data into the users table
async function register(req, res) {
  const db = req.app.get('db')

  const { username, password } = req.body
  let foundUser = await db.get_user([username])
  const user = foundUser[0]
  if (!user)
    try {
      let hash = await bcrypt.hash(password, 10)
      db.register_user([username, hash])
      res.status(200).send('you have registered')
    } catch {
      res.status(401).send('there is already a user by this name')
    }
}
async function getFavorites(req, res) {
  console.log('got to favorites controller')
  const db = req.app.get('db')
  let result = await db.get_favorites()
  console.log('result=', result)
  if (result) {
    try {
      res.status(200).send(result)
    } catch{
      res.status(400).send('could not get favorites')
    }
  } else {
    res.status(400).send('could not get favorites')
  }
}
async function getPost(req, res) {
  console.log('got to post')
  const db = req.app.get('db')
  console.log('this is req.query', req.query)
  let result = await db.get_post([req.query.id])
  if (result) {
    try {
      console.log(result)
      res.status(200).send(result)
    } catch{
      console.log(result)
      res.status(400).send('couldnt do it')
    }
  }
}
module.exports = {
  login,
  logout,
  register,
  getFavorites,
  getPost
}