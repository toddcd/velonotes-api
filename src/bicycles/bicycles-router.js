const express = require('express')
const BicyclesService = require('./bicycles-service')
const {requireAuth} = require('../middleware/jwt-auth')

const bicyclesRouter = express.Router()
const jsonBodyParser = express.json()

bicyclesRouter
    .route('/')
    .all(requireAuth)
    .get((req, res, next) => {
        BicyclesService.getBicycles(req.app.get('db'), req.user.user_id)
            .then(bikes => {
                res.json(BicyclesService.serializeBicycles(bikes))
            })
            .catch(next)
    })
    .post(requireAuth, jsonBodyParser, (req, res, next) => {
        const {mfr_bike_id} = req.body
        const newBike = {mfr_bike_id}

        for (const [key, value] of Object.entries(newBike))
            if (value == null)
                return res.status(400).json({
                    error: `Missing '${key}' in request body`
                })

        newBike.user_id = req.user.user_id
        newBike.geo_id = 13

        BicyclesService.insertBicycle(
            req.app.get('db'),
            newBike
        )
            .then(bike => {
                res
                    .status(201)
                    //.location(path.posix.join(req.originalUrl, `/${bike.id}`))
                    .json(BicyclesService.serializeBicycles(bike))
            })
            .catch(next)
    })

bicyclesRouter
    .route('/:bike_id')
    .all(requireAuth)
    .all(checkBikeExists)
    .get((req, res) => {
        res.json(BicyclesService.serializeBicycles(res.bike))
    })


/* async/await syntax for promises */
async function checkBikeExists(req, res, next) {
    try {
        const bike = await BicyclesService.getBicycleById(
            req.app.get('db'),
            req.params.bike_id
        )

        if (!bike)
            return res.status(404).json({
                error: `Bicycle doesn't exist`
            })

        res.bike = bike
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = bicyclesRouter
