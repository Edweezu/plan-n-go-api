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
    
    serializeDestination (destination) {
        return {
            id: destination.id,
            destination_name: xss(destination.destination_name),
            destination_date: destination.destination_date,
            address: xss(destination.address),
            destination_notes: xss(destination.destination_notes)
        }
    },
    serializeList (item) {
        return {
            id: item.id,
            item_name: xss(item.item_name),  
            list_notes: xss(item.list_notes)
        }
    },

    getTrip (knex, trip_id) {
        return knex
            .from('trip')
            .where('trip_id', trip_id)
            .first()
    },

    getFlights (knex, trip_id) {
        return knex
            .select('*')
            .from('flights')
            .where('trip_id', trip_id)
    },

    getDestinations (knex, trip_id) {
        return knex
            .select('*')
            .from('destinations')
            .where('trip_id', trip_id)
    },

    getList (knex, trip_id) {
        return knex
            .select('*')
            .from('packing_list')
            .where('trip_id', trip_id)
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