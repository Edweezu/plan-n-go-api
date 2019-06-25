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
            start_date: xss(trip.start_date),
            end_date: xss(trip.end_date),
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