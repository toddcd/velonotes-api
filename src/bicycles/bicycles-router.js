const express = require('express')
const path = require('path')
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
        const { mfr_bike_id, geo_id } = req.body
        const newBike = {mfr_bike_id, geo_id}

        for (const [key, value] of Object.entries(newBike)) {
            if (value == null) {
                return res.status(400).json({
                    error: `Missing '${key}' in request body`
                })
            }
        }

        newBike.user_id = req.user.user_id

        BicyclesService.insertBicycle(
            req.app.get('db'),
            newBike
        )
            .then(bike => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${bike[0].user_bike_id}`))
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
    .delete((req, res) => {
        const {bike_id} = req.params
        BicyclesService.deleteBicycle(
            req.app.get('db'),
            bike_id
        )
            .then(numRowsAffected => {
                //logger.info(`Note with id ${note_id} deleted.`)
                res.status(204).end()
            })
    })
    .patch(jsonBodyParser, (req, res) => {

    })

/* async/await syntax for promises */
async function checkBikeExists(req, res, next) {
    const bike_id = req.params.bike_id
    try {
        const bike = await BicyclesService.getBicycleById(
            req.app.get('db'),
            bike_id
        )

        if (bike.length === 0)
            return res.status(404).json({
                error: `Bicycle id ${bike_id} doesn't exist`
            })

        res.bike = bike
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = bicyclesRouter
