const express = require('express')
const path = require('path')
const PositionsService = require('./positions-service')
const {requireAuth} = require('../middleware/jwt-auth')

const positionsRouter = express.Router()
const jsonBodyParser = express.json()

positionsRouter
    .post(requireAuth, jsonBodyParser, (req, res, next) => {
        const {
            user_bike_id, name,
            description, active,
            stem, stem_angle,
            handlebar, handlebar_bend,
            crank, crank_q,
            seat, seat_height,
            handlebar_reach, handlebar_drop,
            setback
        } = req.body
        const newPosition = {
            user_bike_id, name,
            description, active,
            stem, stem_angle,
            handlebar, handlebar_bend,
            crank, crank_q,
            seat, seat_height,
            handlebar_reach, handlebar_drop,
            setback
        }

        for (const [key, value] of Object.entries(newPosition))
            if (value == null)
                return res.status(400).json({
                    error: `Missing '${key}' in request body`
                })

        PositionsService.insertPosition(
            req.app.get('db'),
            newPosition
        )
            .then(position => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${position.position_id}`))
                    .json(PositionsService.serializePosition(position[0]))
            })
            .catch(next)
    })

positionsRouter
    .route('/:position_id')
    .all(requireAuth)
    .all(checkPositionExists)
    .get((req, res) => {
        res.json(PositionsService.serializePosition(res.position[0]))
    })
    .delete((req, res) => {
        const {position_id} = req.params
        PositionsService.deletePosition(
            req.app.get('db'),
            position_id
        )
            .then(numRowsAffected => {
                //logger.info(`Note with id ${note_id} deleted.`)
                res.status(204).end()
            })
    })
    .patch(jsonBodyParser, (req, res) => {
        const {
            name, description, active,
            stem, stem_angle,
            handlebar, handlebar_bend,
            crank, crank_q,
            seat, seat_height,
            handlebar_reach, handlebar_drop,
            setback
        } = req.body
        const posToUpdate = {
            name, description, active,
            stem, stem_angle,
            handlebar, handlebar_bend,
            crank, crank_q,
            seat, seat_height,
            handlebar_reach, handlebar_drop,
            setback
        }
        const numberOfValues = Object.values(posToUpdate).filter(Boolean).length

        if (numberOfValues === 0) {
            return res.status(400).json({
                error: `Request body must contain at least one of the following: 'name', 'description', 'active',
            'stem', 'stem_angle', 'handlebar', 'handlebar_bend', 'crank', 'crank_q', 'seat', 'seat_height',
            'handlebar_reach', handlebar_drop','setback'`
            })
        }

        PositionsService.updatePosition(
            req.app.get('db'),
            req.params.position_id,
            posToUpdate
        ).then(numRowsAffected => {
            res.status(204).end()
        })
    })

/* async/await syntax for promises */
async function checkPositionExists(req, res, next) {
    const position_id =  req.params.position_id
    try {
        const position = await PositionsService.getPositionById(
            req.app.get('db'),
            position_id
        )

        if (position.length === 0)
            return res.status(404).json({
                error: `Position id ${position_id} doesn't exist`
            })

        res.position = position
        next()

    } catch (error) {
        next(error)
    }
}

module.exports = positionsRouter