require('dotenv').config()
const { json } = require('body-parser')
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const app = express()
const controller = require('./controller');