require('dotenv').config()
const { json } = require('body-parser')
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const app = express()
const controller = require('./controller');
//Figure out why this is undefined?
const { SESSION_SECRET, SERVER_PORT, CONNECTION_HOST } = process.env

const { login, register, logout, getFavorites, getPost } = require('./controller.js')
app.use(json())
//database

massive(CONNECTION_HOST)
  .then(db => {
    app.set('db', db)
    console.log('database is connected')
  })
  .catch(err => {
    console.log(err)
  })
//session
 app.use(
   session({
   secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
   cookie: {
     maxAge: 1000 * 60 * 60 * 24 * 7 * 2
    }
  })
 )
//endpoints
app.post('/login', (req, res, next) => {
  if (!req.session.user) {
     controller.logout(req,res);
    req.session.Username = {};
    controller.login(req,res);
    console.log(value);
    console.log(req.session.user);
     next()
  } else {
    console.log("Already logged in");
    next()
  }
}, login)

app.post('/register', (req, res, next) => {
  if (!req.session.user) {
    console.log('hit session check')
    req.session.user = {}
    console.log(req.session.user)
    next()
  } else {
    next()
  }
}, register)
app.get('/logout', logout)
app.get('/favorites', getFavorites)
app.get('/posts', getPost)
app.listen(SERVER_PORT, () => {
  console.log(`listening on ${SERVER_PORT}`)
})