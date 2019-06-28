const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


function makeArticlesFixtures() {
    const testUsers = makeUsersArray()
    const testTrips = makeTripsArray(testUsers)
    const testFlights = makeFlightsArray(testTrips)
    const testDestinations = makeDestinationsArray(testTrips)
    const testPackingList = makePackingListArray(testTrips)
    return {
        testUsers, 
        testTrips, 
        testFlights,
        testDestinations,
        testPackingList
    }
}


function makeUsersArray() {
  return [
    {
      id: 1,
      username: 'test-user-1',
      password: 'password',
    },
    {
      id: 2,
      username: 'test-user-2',
      password: 'password'
    },
    {
      id: 3,
      username: 'test-user-3',
      password: 'password',
    },
    {
      id: 4,
      username: 'test-user-4',
      password: 'password',
    },
  ]
}

function makeTripsArray(users) {
  return [
    {
      id: 1,
      trip_name: 'First test trip',
      city: 'First Test city',
      start_date:  new Date('2029-01-22T07:00:00.00Z'),
      end_date:  new Date('2029-01-22T07:00:00.00Z'),
      user_id: users[0].id
    },
    {
      id: 2,
      trip_name: 'Second test trip',
      city: 'Second Test city',
      start_date:  new Date('2029-01-22T07:00:00.00Z'),
      end_date:  new Date('2029-01-22T07:00:00.00Z'),
      user_id: users[1].id
    },
    {
      id: 3,
      trip_name: 'Third test trip',
      city: 'Third Test city',
      start_date:  new Date('2029-01-22T07:00:00.00Z'),
      end_date:  new Date('2029-01-22T07:00:00.00Z'),
      user_id: users[2].id
    },
    {
      id: 4,
      trip_name: 'Fourth test trip',
      city: 'Fourth Test city',
      start_date:  new Date('2029-01-22T07:00:00.00Z'),
      end_date:  new Date('2029-01-22T07:00:00.00Z'),
      user_id: users[3].id
    },
    
  ]
}

function makeFlightsArray(trips) {
  return [
    {
      id: 1,
      airline: 'First test airline!',
      flight_num: 1,
      depart_date:  new Date('2029-01-22T07:00:00.00Z'),
      depart_time: '07:00:00',
      seats: 'First test seat',
      flight_notes: 'First flight test note',
      trip_id: trips[0].id
    },
    {
      id: 2,
      airline: 'Second test airline!',
      flight_num: 2,
      depart_date:  new Date('2029-01-22T07:00:00.00Z'),
      depart_time: '07:00:00',
      seats: 'Second test seat',
      flight_notes: 'Second flight test note',
      trip_id: trips[1].id
    },
    {
      id: 3,
      airline: 'Third test airline!',
      flight_num: 3,
      depart_date:  new Date('2029-01-22T07:00:00.00Z'),
      depart_time: '07:00:00',
      seats: 'Third test seat',
      flight_notes: 'Third flight test note',
      trip_id: trips[2].id
    },
    {
      id: 4,
      airline: 'Fourth test airline!',
      flight_num: 4,
      depart_date:  new Date('2029-01-22T07:00:00.00Z'),
      depart_time: '07:00:00',
      seats: 'Fourth test seat',
      flight_notes: 'Fourth flight test note',
      trip_id: trips[3].id
    }
    
  ];
}

function makeDestinationsArray(trips) {
  return [
    {
      id: 1,
      destination_name: 'First test destination name',
      destination_date: new Date('2029-01-22T07:00:00.00Z'),
      address:  'First test destination address',
      destination_notes: 'First destination test note',
      trip_id: trips[0].id
    },
    {
      id: 2,
      destination_name: 'Second test destination name',
      destination_date: new Date('2029-01-22T07:00:00.00Z'),
      address:  'Second test destination address',
      destination_notes: 'Second destination test note',
      trip_id: trips[1].id
    },
    {
      id: 3,
      destination_name: 'Third test destination name',
      destination_date: new Date('2029-01-22T07:00:00.00Z'),
      address:  'Third test destination address',
      destination_notes: 'Third destination test note',
      trip_id: trips[2].id
    },
    {
      id: 4,
      destination_name: 'Fourth test destination name',
      destination_date: new Date('2029-01-22T07:00:00.00Z'),
      address:  'Fourth test destination address',
      destination_notes: 'Fourth destination test note',
      trip_id: trips[3].id
    }
  ];
}

function makePackingListArray(trips) {
  return [
    {
      id: 1,
      item_name: 'First test packing item',
      list_notes: 'First packing item test note',
      checked: false,
      trip_id: trips[0].id
    },
    {
      id: 2,
      item_name: 'Second test packing item',
      list_notes: 'Second packing item test note',
      checked: false,
      trip_id: trips[1].id
    },
    {
      id: 3,
      item_name: 'Third test packing item',
      list_notes: 'Third packing item test note',
      checked: false,
      trip_id: trips[2].id
    },
    {
      id: 4,
      item_name: 'Fourth test packing item',
      list_notes: 'Fourth packing item test note',
      checked: false,
      trip_id: trips[3].id
    }, 
  ];
}


function makeExpectedFlight(flight, trips=[]) {

    const expectedTrip = trips.find(trip => trip.id === flight.trip_id)

    return {
        id: flight.id,
        airline: flight.airline,
        flight_num: flight.flight_num,
        depart_date: flight.depart_date,
        seats: flight.seats,
        flight_notes: flight.flight_notes,
        trip_id: expectedTrip.id
    }
}
function makeExpectedPackingList(list, trips=[]) {

    const expectedTrip = trips.find(trip => trip.id === flight.trip_id)

    return {
        id: list.id,
        item_name: list.item_name,
        list_notes: list.list_notes,
        checked: list.checked,
        trip_id: expectedTrip.id
    }
}

function makeExpectedTrip(users, trip) {

    const expectedUser = users.find(user => user.id === trip.user_id)

    return {
        id: trip.id,
        trip_name: trip.trip_name,
        city: trip.city,
        start_date: trip.start_date,
        end_date: trip.end_date,
        user_id: expectedUser.id
    }
}

function makeExpectedDestination(destination, trips=[]) {

    const expectedTrip = trips.find(trip => trip.id === destination.trip_id)

    return {
        id: destination.id,
        destination_name: destination.destination_name,
        destination_date: destination.destination_date,
        address: destination.address,
        destination_notes: destination.destination_notes,
        trip_id: expectedTrip.id
    }
}

function makeMaliciousFlight(trip) {
  const maliciousFlight = {
    id: 911,
    airline: 'Naughty naughty very naughty <script>alert("xss");</script>',
    flight_num: 1,
    depart_date: new Date(),
    depart_time: '07:00:00',
    seats: 'Naughty naughty very naughty <script>alert("xss");</script>',
    flight_notes: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
    trip_id: trip.id
  }
  const expectedFlight = {
    ...makeExpectedFlight([trip], maliciousFlight),
    airline: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
    seats: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
    flight_notes: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`,
  }
  return {
    maliciousFlight,
    expectedFlight,
  }
}

function makeMaliciousDestination(trip) {
    const maliciousDestination = {
        id: 1,
        destination_name: 'First test destination name',
        destination_date: new Date('2029-01-22T07:00:00.00Z'),
        address:  'First test destination address',
        destination_notes: 'Naughty naughty very naughty <script>alert("xss");</script>',
        trip_id: trip.id
    }
    const expectedDestination = {
        ...makeexpectedDestination([trip], maliciousDestination),
        destination_notes: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;'
    }
    return {
        maliciousDestination,
        expectedDestination
    }
}

function makeMaliciousPackingItem(trip) {
    const maliciousPackingItem = {
        id: 1,
        item_name: 'First test packing item',
        list_notes: 'Naughty naughty very naughty <script>alert("xss");</script>',
        checked: false,
        trip_id: trip.id
    }
    const expectedPackingItem = {
        ...makeexpectedPackingItem([trip], maliciousPackingItem),
        list_notes: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;'
    }
    return {
        maliciousPackingItem,
        expectedDestination
    }
}


function cleanTables(db) {
  return db.transaction(trx =>
    trx.raw(
      `TRUNCATE
        trip,
        flights,
        packing_list,
        destinations,
        users
      `
    )
    .then(() =>
      Promise.all([
        trx.raw(`ALTER SEQUENCE trip_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE users_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE flights_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE packing_list_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE destinations_id_seq minvalue 0 START WITH 1`),
        trx.raw(`SELECT setval('trip_id_seq', 0)`),
        trx.raw(`SELECT setval('users_id_seq', 0)`),
        trx.raw(`SELECT setval('flights_id_seq', 0)`),
        trx.raw(`SELECT setval('packing_list_id_seq', 0)`),
        trx.raw(`SELECT setval('destinations_id_seq', 0)`),
      ])
    )
  )
}

function seedUsers(db, users) {
  const preppedUsers = users.map(user => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1)
  }))
  return db.into('users').insert(preppedUsers)
    .then(() =>
      // update the auto sequence to stay in sync
      db.raw(
        `SELECT setval('users_id_seq', ?)`,
        [users[users.length - 1].id],
      )
    )
}


function seedMaliciousFlight(db, user, flight) {
  return seedUsers(db, [user])
    .then(() =>
      db
        .into('flights')
        .insert([flight])
    )
}

function seedMaliciousDestination(db, user, destination) {
  return seedUsers(db, [user])
    .then(() =>
      db
        .into('destinations')
        .insert([destination])
    )
}

function seedMaliciousPackingItem(db, user, item) {
  return seedUsers(db, [user])
    .then(() =>
      db
        .into('packing_list')
        .insert([item])
    )
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.username,
    algorithm: 'HS256',
  })
  return `bearer ${token}`
}

module.exports = {
  makeUsersArray,
  makeTripsArray,
  makeFlightsArray,
  makeDestinationsArray,
  makePackingListArray,
  makeArticlesFixtures,
  makeExpectedDestination,
  makeExpectedFlight,
  makeExpectedPackingList,
  makeExpectedTrip,
  makeAuthHeader,
  cleanTables,
  seedUsers,
  makeMaliciousDestination,
  makeMaliciousFlight,
  makeMaliciousPackingItem,
  seedMaliciousFlight,
  seedMaliciousDestination,
  seedMaliciousPackingItem
  
}
