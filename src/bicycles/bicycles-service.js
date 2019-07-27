const xss = require('xss')
const Treeize = require('treeize')

const BicyclesService = {
    getUserBikes(db, user_id) {
        return db
            .from('user_bikes AS bikes')
            .select(
                'bikes.user_id',
                ...bikeFields,
                ...geometryFields,
                ...positionFields,
                ...notesFields
            ).innerJoin(
                'mfr_bikes AS mfr',
                'mfr.mfr_bike_id',
                'bikes.mfr_bike_id'
            ).innerJoin(
                'mfr_bikes_geometry AS geo',
                'geo.geo_id',
                'bikes.geo_id'
            ).innerJoin(
                'user_bike_positions AS pos',
                'pos.user_bike_id',
                'bikes.user_bike_id'
            ).innerJoin(
                'user_bike_notes AS notes',
                'notes.user_bike_id',
                'bikes.user_bike_id'
            ).where('bikes.user_id', '=', user_id)
    },

    serializeBicycles(bicycles) {
        let bikes = new Treeize()
        bikes.grow(bicycles)
        return bikes.getData()
    },
}

const bikeFields = [
    {
        'bicycles:user_bike_id': 'bikes.user_bike_id',
        'bicycles:mfr_bike_id': 'mfr.mfr_bike_id',
        'bicycles:make': 'mfr.make',
        'bicycles:model': 'mfr.model',
        'bicycles:year': 'mfr.year'
    }
]

const geometryFields = [
    {
        'bicycles:geometry:geo_id': 'geo.geo_id',
        'bicycles:geometry:size': 'geo.size',
        'bicycles:geometry:reach': 'geo.reach',
        'bicycles:geometry:stack': 'geo.stack',
        'bicycles:geometry:top_tube_length': 'geo.top_tube_length',
        'bicycles:geometry:head_tube_length': 'geo.head_tube_length',
        'bicycles:geometry:head_tube_angle': 'geo.head_tube_angle',
        'bicycles:geometry:seat_tube_length': 'geo.seat_tube_length',
        'bicycles:geometry:seat_tube_angle': 'geo.seat_tube_angle',
        'bicycles:geometry:wheelbase': 'geo.wheelbase',
        'bicycles:geometry:chainstay': 'geo.chainstay',
        'bicycles:geometry:bb_drop': 'geo.bb_drop',
        'bicycles:geometry:standover': 'geo.standover',
        'bicycles:geometry:rake': 'geo.rake',
        'bicycles:geometry:trail': 'geo.trail',
    }
]

const positionFields = [
    {
        'bicycles:positions:position_id': 'pos.position_id',
        'bicycles:positions:active': 'pos.active',
        'bicycles:positions:name': 'pos.name',
        'bicycles:positions:description': 'pos.description',
        'bicycles:positions:stem': 'pos.stem',
        'bicycles:positions:stem_angle': 'pos.stem_angle',
        'bicycles:positions:handlebar': 'pos.handlebar',
        'bicycles:positions:crank': 'pos.crank',
        'bicycles:positions:seat': 'pos.seat',
        'bicycles:positions:handlebar_reach': 'pos.handlebar_reach',
        'bicycles:positions:handlebar_drop': 'pos.handlebar_drop',
        'bicycles:positions:setback': 'pos.setback',
        'bicycles:positions:seat_height': 'pos.seat_height'
    }
]

const notesFields = [
    {
        'bicycles:notes:note_id': 'notes.note_id',
        'bicycles:notes:type': 'notes.note_type',
        'bicycles:notes:note': 'notes.note'
    }
]

module.exports = BicyclesService
