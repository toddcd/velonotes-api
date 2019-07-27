const express = require('express')
const BicyclesService = require('./bicycles-service')
const {requireAuth} = require('../middleware/jwt-auth')

const bicyclesRouter = express.Router()

bicyclesRouter
    .route('/')
    .get((req, res, next) => {
        BicyclesService.getUserBikes(req.app.get('db'), 1)
            .then(bikes => {
                //res.json(bikes)
                res.json(BicyclesService.serializeBicycles(bikes))
            })
            .catch(next)
    })

// bicyclesRouter
//     .route('/:bike_id')
//     .all(requireAuth)
//     .all(checkBikeExists)
//     .get((req, res) => {
//         res.json(BicyclesService.serializeBike(res.thing))
//     })
//
// bicyclesRouter.route('/:thing_id/reviews/')
//     .all(requireAuth)
//     .all(checkBikeExists)
//     .get((req, res, next) => {
//         BicyclesService.getReviewsForThing(
//             req.app.get('db'),
//             req.params.thing_id
//         )
//             .then(reviews => {
//                 res.json(CollectionService.serializeThingReviews(reviews))
//             })
//             .catch(next)
//     })

/* async/await syntax for promises */
async function checkBikeExists(req, res, next) {
    try {
        const bike = await BicyclesService.getById(
            req.app.get('db'),
            req.params.user_bike_id
        )

        if (!bike)
            return res.status(404).json({
                error: `Thing doesn't exist`
            })

        res.thing = thing
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = bicyclesRouter
