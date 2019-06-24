const app = require('../app')
const express = require('express')
const bodyParser = express.json()
const TripRouter = express.Router()

const logger = require('../logger')
const xss = require('xss')
const TripService = require('./trip-service')
const { requireAuth } = require('../middleware/jwt-auth')




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
                // return res.status(200).json(
                //     trips.map((trip) => {
                //         return trip
                //     })
                // )
                // return res.status(200).json(trips.map((trip) => {
                //     return TripService.serializeTrip(trip)
                // }))
                console.log('tripsss', trips)
                res.json(trips.map(TripService.serializeTrip))
            })

    })
    // .post(bodyParser, (req, res, next) => {
    //     //when you add a new trip on trip dashboard
    // })


TripRouter
    .route('/:tripId')
    .get((req, res, next) => {
        //gets all the components on the trips item page
        //when the user clicks the trip on dashboard, redirect to trip item dashboard
    })
    .delete((req, res, next) => {
        //delete trip by id - trip dashboard
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