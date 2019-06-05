const app = require('../app')
const express = require('express')
const bodyParser = express.json()
const TripRouter = express.Router()

const logger = require('../logger')
const xss = require('xss')


TripRouter
    .route('/')
    .get((req, res, next) => {
        let db = req.app.get('db')

        console.log('hi')
    })



module.exports = TripRouter