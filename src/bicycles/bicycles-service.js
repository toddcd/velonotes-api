const xss = require('xss')
const Treeize = require('treeize')

const BicyclesService = {
    getUserBikes(db, user_id) {
        return db
            .from('user_bikes AS bikes')
            .select(
                'bikes.user_id',
                'bikes.user_bike_id',
                'mfr.make',
                'mfr.model',
                'mfr.year',
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
            ).groupBy(
                'bikes.user_bike_id',
                'bikes.user_id',
                'pos.position_id',
                'mfr.mfr_bike_id',
                'geo.geo_id',
                'notes.note_id'
            ).having('bikes.user_bike_id', '=', user_id)
    },

    getById(db, id) {

    },

    getReviewsForThing(db, thing_id) {

    },

    serializeBicycles(bicycles) {

        let bikes = new Treeize()
        bikes.grow(bicycles)
        return bikes.getData()
    },
}

const geometryFields = [
    'geo.geo_id             AS geometry:geo_id',
    'geo.size               AS geometry:size',
    'geo.reach              AS geometry:reach',
    'geo.stack              AS geometry:stack',
    'geo.top_tube_length    AS geometry:top_tube_length',
    'geo.head_tube_length   AS geometry:head_tube_length',
    'geo.head_tube_angle    AS geometry:head_tube_angle',
    'geo.seat_tube_length   AS geometry:seat_tube_length',
    'geo.seat_tube_angle    AS geometry:seat_tube_angle',
    'geo.wheelbase          AS geometry:wheelbase',
    'geo.chainstay          AS geometry:chainstay',
    'geo.bb_drop            AS geometry:bb_drop',
    'geo.standover          AS geometry:standover',
    'geo.rake               AS geometry:rake',
    'geo.trail              AS geometry:trail',
]

const positionFields = [
    {
        'positions:position_id':     'pos.position_id',
        'positions:active':          'pos.active',
        'positions:name':            'pos.name',
        'positions:description':     'pos.description',
        'positions:stem':            'pos.stem',
        'positions:stem_angle':      'pos.stem_angle',
        'positions:handlebar':       'pos.handlebar',
        'positions:crank':           'pos.crank',
        'positions:seat':            'pos.seat',
        'positions:handlebar_reach': 'pos.handlebar_reach',
        'positions:handlebar_drop':  'pos.handlebar_drop',
        'positions:setback':         'pos.setback',
        'positions:seat_height':     'pos.seat_height'
    }
]

const notesFields = [
    {
        'notes:note_id':   'notes.note_id',
        'notes:type':      'notes.note_type',
        'notes:note':      'notes.note'
    }
]

module.exports = BicyclesService
