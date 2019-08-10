const knex = require('knex')
const fixtures = require('./bicycles-fixtures')
const app = require('../src/app')

describe('Bicycles Endpoints', () => {
    let db
    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('cleanup', () =>
        db.schema.raw('TRUNCATE TABLE mfr_bikes, mfr_bikes_geometry RESTART IDENTITY CASCADE'))
    before('cleanup', () =>
        db.schema.raw('TRUNCATE TABLE user_bikes RESTART IDENTITY CASCADE'))

    before('insert manufacture bikes', () => {
        const mfrBikes = fixtures.mfrBikes()
        return db
            .into('mfr_bikes')
            .insert(mfrBikes)

    })

    before('insert manufacture geometry', () => {
        const mfrGeometry = fixtures.mfrBikeGeometry()
        return db
            .into('mfr_bikes_geometry')
            .insert(mfrGeometry)
    })

    describe(`Unauthorized requests`, () => {
        it(`responds with 401 Unauthorized for GET /bicycles`, () => {
            return supertest(app)
                .get('/api/bicycles')
                .expect(401, {error: 'Unauthorized request'})
        })

        it(`responds with 401 Unauthorized for POST /bicycles/`, () => {
            return supertest(app)
                .post('/api/bicycles/')
                .expect(401, {error: 'Unauthorized request'})
        })

        it(`responds with 401 Unauthorized for GET /bicycles/:bike_id`, () => {
            return supertest(app)
                .get('/api/bicycles/1')
                .expect(401, {error: 'Unauthorized request'})
        })
    })

    describe('Bicycle Requests', () => {
        context(`No user bikes in the database`, () => {
            it(`responds with 204 and no content`, () => {
                return supertest(app)
                    .get('/api/bicycles')
                    .set('Authorization', `Bearer ${process.env.TESTUSER_JWT_TOKEN}`)
                    .expect(204)
            })
        })

        context(`There are user bicycles in the database`, () => {
            const testBicycles = fixtures.makeBicycles()
            before('insert user_bikes for testing', () => {
                return db
                    .into('user_bikes')
                    .insert(testBicycles)
            })

            it('get the user bicycles from the database', () => {
                const results = [
                    {
                        nick_name: 'SpecializedBike',
                        mfr_bike_id: 1,
                        make: 'Specialized',
                        model: 'Crux',
                        year: '2019',
                    },
                    {
                        nick_name: 'GiantBike',
                        mfr_bike_id: 2,
                        make: 'Giant',
                        model: 'TCX Advanced',
                        year: '2020'
                    }
                ]

                return supertest(app)
                    .get('/api/bicycles')
                    .set('Authorization', `Bearer ${process.env.TESTUSER_JWT_TOKEN}`)
                    .expect(200)
                    .expect(res => {
                        expect(res.body.bicycles.length).to.eql(results.length)
                        expect(res.body.bicycles[0].nick_name).to.eql(results[0].nick_name)
                        expect(res.body.bicycles[1].nick_name).to.eql(results[1].nick_name)
                    })
            })

            it('get a single user bicycle from the database', () => {
                const result = {
                    nick_name: 'GiantBike',
                    mfr_bike_id: 2,
                    make: 'Giant',
                    model: 'TCX Advanced',
                    year: '2020'
                }

                return supertest(app)
                    .get('/api/bicycles/2')
                    .set('Authorization', `Bearer ${process.env.TESTUSER_JWT_TOKEN}`)
                    .expect(200)
                    .expect(res => {
                        expect(res.body.nick_name).to.eql(result.nick_name)
                    })
            })
        })

        context(`Create a new user bike in the database`, () => {
            it('POST a user bike to the database', () => {
                const newBike =
                    {
                        user_id: 1,
                        mfr_bike_id: 1,
                        geo_id: 1,
                        nick_name: 'SuperSpecializedBike',
                    }

                return supertest(app)
                    .post('/api/bicycles')
                    .send(newBike)
                    .set('Authorization', `Bearer ${process.env.TESTUSER_JWT_TOKEN}`)
                    .expect(201)
                    .expect(res => {
                        expect(res.body.bicycles[0].nick_name).to.eql(newBike.nick_name)
                    })
            })
        })
    })
})