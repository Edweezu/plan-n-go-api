const xss = require('xss')

const TripService = {
    getAllTrips (knex, user_id) {
        return knex
            .select('*')
            .from('trip')
            .where('user_id', user_id)

    },

    serializeTrip (trip) {
        return {
            id: trip.id,
            trip_name: xss(trip.trip_name),
            city: xss(trip.city),
            start_date: trip.start_date,
            end_date: trip.end_date,
            notes: xss(trip.notes)
        }
    },
    
    getById (knex, id) {
        return knex
            .select('*')
            .from('trip')
            .where('id', id)
            .first()
    },

    addTrip (knex, newTrip) {
        return knex
            .from('trip')
            .insert(newTrip)
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },

    deleteTrip (knex, id) {
        return knex
            .from('trip')
            .where('id', id)
            .delete()
    },

    addFlight (knex, newFlight) {
        return knex
            .from('flights')
            .insert(newFlight)
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },

    serializeFlight (flight) {
        return {
            id: flight.id,
            airline: xss(flight.airline),
            flight_num: flight.flight_num,
            depart_date: flight.depart_date,
            depart_time: flight.depart_time,
            seats: xss(flight.seats),
            flight_notes: xss(flight.flight_notes)
        }
    },

    // updateNote (knex, id, newData) {
    //     return knex
    //         .from('notes')
    //         .where('id', id)
    //         .update(newData)
    //         .returning('*')
    //         .then(rows => {
    //             return rows[0]
    //         })
    // }

}

module.exports = TripService