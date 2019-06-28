const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe.only('Protected endpoints', function() {
  let db

  const {
    testUsers,
    testTrips,
    testFlights,
    testDestinations,
    testPackingList
  } = helpers.makeArticlesFixtures()

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    })
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())

  before('cleanup', () => helpers.cleanTables(db))

  afterEach('cleanup', () => helpers.cleanTables(db))

  beforeEach('insert users', () => {
    return db
        .from('users')
        .insert(testUsers)
  })
  beforeEach('insert trips', () => {
    return db
        .from('trip')
        .insert(testTrips)
  })
  beforeEach('insert flights', () => {
    return db
        .from('flights')
        .insert(testFlights)
  })

  beforeEach('insert destinations', () => {
    return db
        .from('destinations')
        .insert(testDestinations)
  })
  beforeEach('insert packing list', () => {
    return db
        .from('packing_list')
        .insert(testPackingList)
  })



  const protectedEndpoints = [
    {
      name: 'GET /api/trips',
      path: '/api/trips',
      method: supertest(app).get,
    },
    {
      name: 'POST /api/trips',
      path: '/api/trips',
      method: supertest(app).post,
    },
    {
      name: 'GET /api/trips/:tripid',
      path: '/api/trips/1',
      method: supertest(app).get,
    },
    {
      name: 'DELETE /api/trips/:tripid',
      path: '/api/trips/1',
      method: supertest(app).delete,
    },
    {
      name: 'PATCH /api/trips/:tripid',
      path: '/api/trips/1',
      method: supertest(app).patch,
    },
    {
      name: 'GET /api/trips/:tripid/flights',
      path: '/api/trips/1/flights',
      method: supertest(app).get,
    },
    {
      name: 'POST /api/trips/:tripid/flights',
      path: '/api/trips/1/flights',
      method: supertest(app).post,
    },
    {
      name: 'GET /api/trips/:tripid/flights/:flightid',
      path: '/api/trips/1/flights/1',
      method: supertest(app).get,
    },
    {
      name: 'DELETE /api/trips/:tripid/flights/:flightid',
      path: '/api/trips/1/flights/1',
      method: supertest(app).delete,
    },
    {
      name: 'PATCH /api/trips/:tripid/flights/:flightid',
      path: '/api/trips/1/flights/1',
      method: supertest(app).patch,
    },
    {
      name: 'GET /api/trips/:tripid/destinations/:destinationid',
      path: '/api/trips/1/destinations/1',
      method: supertest(app).get,
    },
    {
      name: 'Delete /api/trips/:tripid/destinations/:destinationid',
      path: '/api/trips/1/destinations/1',
      method: supertest(app).delete,
    },
    {
      name: 'Patch /api/trips/:tripid/destinations/:destinationid',
      path: '/api/trips/1/destinations/1',
      method: supertest(app).patch,
    },
    {
      name: 'Get /api/trips/:tripid/destinations',
      path: '/api/trips/1/destinations',
      method: supertest(app).get,
    },
    {
      name: 'Post /api/trips/:tripid/destinations',
      path: '/api/trips/1/destinations',
      method: supertest(app).post,
    },
    {
      name: 'Get /api/trips/:tripid/packing_list',
      path: '/api/trips/1/packing_list',
      method: supertest(app).get,
    },
    {
      name: 'Post /api/trips/:tripid/packing_list',
      path: '/api/trips/1/packing_list',
      method: supertest(app).post,
    },
    {
      name: 'DELETE /api/trips/:tripid/packing_list/:itemid',
      path: '/api/trips/1/packing_list/1',
      method: supertest(app).delete,
    }
    
  ]

  protectedEndpoints.forEach(endpoint => {
    describe(endpoint.name, () => {
      it(`responds 401 'Missing bearer token' when no bearer token`, () => {
        return endpoint.method(endpoint.path)
          .expect(401, { error: `Missing bearer token` })
      })

      it(`responds 401 'Unauthorized request' when invalid JWT secret`, () => {
        const validUser = testUsers[0]
        const invalidSecret = 'bad-secret'
        return endpoint.method(endpoint.path)
          .set('Authorization', helpers.makeAuthHeader(validUser, invalidSecret))
          .expect(401, { error: `Unauthorized request` })
      })

      it(`responds 401 'Unauthorized request' when invalid sub in payload`, () => {
        const invalidUser = { username: 'user-not-existy', id: 1 }
        return endpoint.method(endpoint.path)
          .set('Authorization', helpers.makeAuthHeader(invalidUser))
          .expect(401, { error: `Unauthorized request` })
      })
    })
  })
})
