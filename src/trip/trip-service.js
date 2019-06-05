const TripService = {
    getAllTrips (knex, username) {
        return knex
            .select('*')
            .from('trip')
            .where('user_username', username)

    },
    
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