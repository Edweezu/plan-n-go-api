const app = require('../app')
const express = require('express')
const bodyParser = express.json()
const TripRouter = express.Router()

const logger = require('../logger')
const xss = require('xss')
const TripService = require('./trip-service')


TripRouter
    .route('/')
    .get((req, res, next) => {
        let db = req.app.get('db')
        // let { userName } = req.params

        // console.log('usernameee', userName)
        
        return TripService.getAllTrips(db, userName)
            .then(trips => {
                return res.status(200).json(
                    trips.map((trip) => {
                        return trip
                    })
                )
            })





    })
    .post(bodyParser, (req, res, next) => {
        //when you add a new trip on trip dashboard
    })


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