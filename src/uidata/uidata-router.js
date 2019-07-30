const express = require('express')
const UiDataService = require('./uidata-service')
const {requireAuth} = require('../middleware/jwt-auth')

const uiDataRouter = express.Router()

uiDataRouter
    .route('/make')
    .all(requireAuth)
    .get((req, res, next) => {
        UiDataService.getAllMakeModel(req.app.get('db'))
            .then(ui => {
                res.json(ui)
                //res.json(UiDataService.serializeBicycles(bikes))
            })
            .catch(next)
    })

uiDataRouter
    .route('/size')
    .all(requireAuth)
    .get((req, res, next) => {
        const id = req.params.mfr_bike_id
        UiDataService.getSizeById(req.app.get('db'), id)
            .then(geo => {
                //res.json(ui)
                res.json(UiDataService.serializeSizes(geo))
            })
            .catch(next)
    })

module.exports = uiDataRouter