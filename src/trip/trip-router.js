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

        console.log('reqqqq', req.user)
        
        return TripService.getAllTrips(db, req.user.id)
            .then(trips => {
                res.json(trips.map((trip) => {
                    return TripService.serializeTrip(trip)
                }))
            })

    })
    .post(bodyParser, (req, res, next) => {
        //when you add a new trip on trip dashboard
        //
        let db = req.app.get('db')

        const { city, trip_name, start_date, end_date } = req.body

        const newTrip = { 
            city,
            start_date,
            end_date,
        }

        for (const [key, value] of Object.entries(newTrip))
        if (value == null)
          return res.status(400).json({
            error: `Missing '${key}' in request body`
          })


        newTrip.trip_name = trip_name
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
       //gets trip object from db
        let db = req.app.get('db')
        const { tripid } = req.params

        return TripService.getTrip (db, tripid)
            .then(trip => {
                return res.json(TripService.serializeTrip(trip))
            })
        
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
        let db = req.app.get('db')
        const { id, trip_name, city, start_date, end_date } = req.body

        const updatedTrip = {
            trip_name,
            city,
            start_date,
            end_date
        }

        for (const [key, value] of Object.entries(updatedTrip))
        if (value == null)
        return res.status(400).json({
            error: `Missing '${key}' in request body`
        })

        updatedTrip.id = id
    

        console.log('updated tripppp', updatedTrip)
       
        return TripService.updateTrip(db, id, updatedTrip)
            .then(trip => {
                console.log('server trippp', trip)
                return res.status(204).end()
            })
            .catch(next)
    })

TripRouter
    .route('/:tripid/flights')
    .all(requireAuth)
    .get((req, res, next) => {
        let db = req.app.get('db')
        const { tripid } = req.params

        return TripService.getFlights (db, tripid)
            .then(flights => {
                res.json(flights.map((flight) => {
                    return TripService.serializeFlight(flight)
                }))
            })
    })
    .post(bodyParser, (req, res, next) => {
        //adding a flight to the list and db
            //take the tripId from this.props.params
            let db = req.app.get('db')
            let { tripid } = req.params

            let { airline, flight_num, depart_date, depart_time, seats, flight_notes } = req.body

            const newFlight = { 
                airline,
                depart_date
            }

            for (const [key, value] of Object.entries(newFlight))
            if (value == null)
            return res.status(400).json({
                error: `Missing '${key}' in request body`
            })

            console.log('flight numm', flight_num)
            console.log('depart_time', depart_time)
            newFlight.flight_num = flight_num
            newFlight.depart_time = depart_time
            newFlight.seats = seats
            newFlight.flight_notes = flight_notes
            newFlight.trip_id = tripid

            if (depart_time === '') {
                newFlight.depart_time = null
            }
            if (flight_num === '') {
                newFlight.flight_num = null
            }

            console.log('new flightt', newFlight)

            return TripService.addFlight (db, newFlight)
                .then(flight => {
                    console.log('server flight', flight)
                    return res.status(201)
                        .location(path.posix.join(req.originalUrl, `/${flight.id}`))
                        .json(TripService.serializeFlight(flight))
                })
                .catch(next)

    })

TripRouter
    .route('/:tripid/flights/:flightid')
    .all(requireAuth)
    .get((req, res, next) => {
        let db = req.app.get('db')
        const { tripid, flightid } = req.params

        return TripService.getFlightById (db, flightid)
            .then(flight => {
                res.json(TripService.serializeFlight(flight))
            })
            .catch(next)

    })
    .delete((req, res, next) => {
        //delete specific trip on list
        //get flightId from the key
        let db = req.app.get('db')
        const { tripid, flightid } = req.params

        return TripService.getFlightById (db, flightid)
        .then(flight => {
            if (!flight) {
                return res.status(404).send(`Please request a valid flight id.`)
            }
            return TripService.deleteFlight (db, flightid)
                .then(data => {
                    logger.info(`flight id ${flightid} was deleted.`)
                    return res.status(204).end()
                })
                .catch(next)
        })
        .catch(next)
    })
    .patch(bodyParser, (req, res, next) => {
        //edit
        let db = req.app.get('db')
        const { id, airline, flight_num, depart_date, depart_time, seats, flight_notes, trip_id } = req.body

        const updatedFlight = {
            airline,
            depart_date
        }

        for (const [key, value] of Object.entries(updatedFlight))
        if (value == null)
        return res.status(400).json({
            error: `Missing '${key}' in request body`
        })

        updatedFlight.id = id
        updatedFlight.flight_num = flight_num
        updatedFlight.depart_time = depart_time
        updatedFlight.seats = seats
        updatedFlight.flight_notes = flight_notes
        updatedFlight.trip_id = trip_id

        if (depart_time === '') {
            updatedFlight.depart_time = null
        }
        if (flight_num === '') {
            updatedFlight.flight_num = null
        }

        console.log('updated flighttt', updatedFlight)
       
        return TripService.updateFlight(db, id, updatedFlight)
            .then(flight => {
                console.log('server flighttt', flight)
                return res.status(204).end()
            })
            .catch(next)
    })

TripRouter
    .route('/:tripid/destinations/:destinationid')
    .all(requireAuth)
    .get((req, res, next) => {
        let db = req.app.get('db')
        const { tripid, destinationid } = req.params

        return TripService.getDestinationById (db, destinationid)
            .then(destination => {
                res.json(TripService.serializeDestination(destination))
            })
            .catch(next)

    })
    .delete((req, res, next) => {
        //delete specific trip on list
        //get destinationid from the key
        let db = req.app.get('db')
        const { tripid, destinationid } = req.params

        return TripService.getDestinationById (db, destinationid)
        .then(destination => {
            if (!destination) {
                return res.status(404).send(`Please request a valid destination id.`)
            }
            return TripService.deleteDestination (db, destinationid)
                .then(data => {
                    logger.info(`flight id ${destinationid} was deleted.`)
                    return res.status(204).end()
                })
                .catch(next)
        })
        .catch(next)
    })
    .patch(bodyParser, (req, res, next) => {
        //edit
        let db = req.app.get('db')
        const { id, destination_name, destination_date, address, destination_notes, trip_id } = req.body

        const updatedDestination = {
            destination_name,
            destination_date
        }

        for (const [key, value] of Object.entries(updatedDestination))
        if (value == null)
        return res.status(400).json({
            error: `Missing '${key}' in request body`
        })

        updatedDestination.id = id
        updatedDestination.address = address
        updatedDestination.destination_notes = destination_notes
        updatedDestination.trip_id = trip_id

        console.log('updated destinationnn', updatedDestination)
       
        return TripService.updateDestination(db, id, updatedDestination)
            .then(destination => {
                console.log('server destinationnn', destination)
                return res.status(204).end()
            })
            .catch(next)
    })

TripRouter
    .route('/:tripid/destinations')
    .all(requireAuth)
    .get((req, res, next) => {
        let db = req.app.get('db')
        const { tripid } = req.params

        return TripService.getDestinations (db, tripid)
            .then(destinations => {
                res.json(destinations.map((destination) => {
                    return TripService.serializeDestination(destination)
                }))
            })
    })
    .post(bodyParser, (req, res, next) => {
        let db = req.app.get('db')
        let { tripid } = req.params

        let { destination_name, destination_date, address, destination_notes } = req.body

        let newDestination = { 
           destination_name,
           destination_date
        }

        for (const [key, value] of Object.entries(newDestination))
        if (value == null)
        return res.status(400).json({
            error: `Missing '${key}' in request body`
        })

        newDestination.address = address
        newDestination.destination_notes = destination_notes
        newDestination.trip_id = tripid

        console.log('new Destinationnn', newDestination)

        return TripService.addDestination (db, newDestination)
            .then(destination => {
                console.log('server destination', destination)
                return res.status(201)
                    .location(path.posix.join(req.originalUrl, `/${destination.id}`))
                    .json(TripService.serializeDestination(destination))
            })
            .catch(next)
    })

TripRouter
    .route('/:tripid/packing_list')
    .all(requireAuth)
    .get((req, res, next) => {
        let db = req.app.get('db')
        const { tripid } = req.params

        return TripService.getList (db, tripid)
            .then(list => {
                res.json(list.map((item) => {
                    return TripService.serializeList(item)
                }))
            })
    })
    .post(bodyParser, (req, res, next) => {
        let db = req.app.get('db')
        let { tripid } = req.params

        let { item_name, list_notes, checked } = req.body

        let newItem = { 
           item_name
        }

        for (const [key, value] of Object.entries(newItem))
        if (value == null)
        return res.status(400).json({
            error: `Missing '${key}' in request body`
        })

        newItem.list_notes = list_notes
        newItem.checked = checked
        newItem.trip_id = tripid

        console.log('new packing itemmmm', newItem)

        return TripService.addPackingItem (db, newItem)
            .then(item => {
                console.log('server destination', item)
                return res.status(201)
                    .location(path.posix.join(req.originalUrl, `/${item.id}`))
                    .json(TripService.serializeList(item))
            })
            .catch(next)
    })

    TripRouter
    .route('/:tripid/packing_list/:itemid')
    .all(requireAuth)
    .delete((req, res, next) => {
        let db = req.app.get('db')
        const { tripid, itemid } = req.params

        return TripService.getPackingItemById (db, itemid)
        .then(item => {
            if (!item) {
                return res.status(404).send(`Please request a valid Packing Item id.`)
            }
            return TripService.deletePackingItem (db, itemid)
                .then(data => {
                    logger.info(`flight id ${itemid} was deleted.`)
                    return res.status(204).end()
                })
                .catch(next)
        })
        .catch(next)
    })



module.exports = TripRouter