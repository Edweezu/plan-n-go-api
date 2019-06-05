require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const NODE_ENV = require('./config').NODE_ENV
const ErrorHandler = require('./error-handler')
const TripRouter = require('./trip/trip-router')

const app = express()

const morganOption = process.env.NODE_ENV === 'production' ? 'tiny' : 'common'

app.use(morgan(morganOption))
app.use(cors())
app.use(helmet({hidePoweredBy: {setTo: 'bye'}}));

app.get('/', (req, res) => {
    res.json({ ok: true })
})

app.use('/api/trip', TripRouter)
// app.use('/api/trip', UsersRouter)

app.use(ErrorHandler)



module.exports = app