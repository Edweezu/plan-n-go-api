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
            trip_name: xss(trip.trip_name)
        }
    }
    
    // getById (knex, id) {
    //     return knex
    //         .select('*')
    //         .from('notes')
    //         .where('id', id)
    //         .first()
    // },

    // addNote (knex, newNote) {
    //     return knex
    //         .from('notes')
    //         .insert(newNote)
    //         .returning('*')
    //         .then(rows => {
    //             return rows[0]
    //         })
    // },

    // deleteNote (knex, id) {
    //     return knex
    //         .from('notes')
    //         .where('id', id)
    //         .delete()
    // },

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