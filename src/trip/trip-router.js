const app = require('../app')
const express = require('express')
const bodyParser = express.json()
const TripRouter = express.Router()

const logger = require('../logger')
const xss = require('xss')
const TripService = require('./trip-service')
const { requireAuth } = require('../middleware/jwt-auth')
const path = require('path')




TripRouter
    .route('/')
    .all(requireAuth)
    .get((req, res) => {
        let db = req.app.get('db')
        // let { userName } = req.params

        // console.log('usernameee', userName)

        console.log('reqqqq', req.user)
        
        return TripService.getAllTrips(db, req.user.id)
            .then(trips => {
                console.log('tripsss', trips)
                res.json(trips.map((trip) => {
                    return TripService.serializeTrip(trip)
                }))
            })

    })
    .post(bodyParser, (req, res, next) => {
        //when you add a new trip on trip dashboard
        //
        let db = req.app.get('db')

        const { city, trip_name, start_date, end_date, notes } = req.body

        const newTrip = { 
            city,
            // trip_name,
            start_date,
            end_date,
            // notes
        }

        for (const [key, value] of Object.entries(newTrip))
        if (value == null)
          return res.status(400).json({
            error: `Missing '${key}' in request body`
          })


        newTrip.trip_name = trip_name
        newTrip.notes = notes
        newTrip.user_id = req.user.id

        console.log('new trippp', newTrip)

        return TripService.addTrip (db, newTrip)
            .then(trip => {
                console.log('server trippp', trip)
                return res.status(201)
                    .location(path.posix.join(req.originalUrl, `/${trip.id}`))
                    .json(TripService.serializeTrip(trip))
            })
            .catch(next)
    })


TripRouter
    .route('/:tripid')
    .all(requireAuth)
    .get((req, res, next) => {
        //gets all the components on the trips item page
        //when the user clicks the trip on dashboard, redirect to trip item dashboard
    })
    .delete((req, res, next) => {
        //delete trip by id - trip dashboard
        let db = req.app.get('db')
        let { tripid } = req.params

        return TripService.getById (db, tripid)
            .then(trip => {
                if (!trip) {
                    return res.status(404).send(`Please request a valid trip id.`)
                }
                return TripService.deleteTrip (db, tripid)
                    .then(data => {
                        logger.info(`trip id ${tripid} was deleted.`)
                        return res.status(204).end()
                    })
                    .catch(next)
            })
            .catch(next)


    })
    .patch(bodyParser, (req, res, next) => {
        //when you click edit on trip dashboard
    })

TripRouter
    .route('/:tripId/flights')
    .post(bodyParser, (req, res, next) => {
        //adding a flight to the list and db
            //take the tripId from this.props.params
    })

TripRouter
    .route('/:tripId/flights/:flightId')
    .delete((req, res, next) => {
        //delete specific trip on list
        //get flightId from the key
    })
    .patch(bodyParser, (req, res, next) => {
        //edit
    })








module.exports = TripRouter