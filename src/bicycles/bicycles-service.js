const xss = require('xss')
const Treeize = require('treeize')

const BicyclesService = {
    getBicycles(db, user_id) {
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
            ).leftJoin(
                'user_bike_positions AS pos',
                'pos.user_bike_id',
                'bikes.user_bike_id'
            ).leftJoin(
                'user_bike_notes AS notes',
                'notes.user_bike_id',
                'bikes.user_bike_id'
            )
            .where('bikes.user_id', user_id)
    },
    getGridBicycles(db, user_id) {
        return db
            .from('user_bikes AS bikes')
            .select(
                'bikes.user_id',
                ...gridFields
            ).innerJoin(
                'mfr_bikes AS mfr',
                'mfr.mfr_bike_id',
                'bikes.mfr_bike_id'
            ).innerJoin(
                'mfr_bikes_geometry AS geo',
                'geo.geo_id',
                'bikes.geo_id'
            ).leftJoin(
                'user_bike_positions AS pos',
                'pos.user_bike_id',
                'bikes.user_bike_id'
            )
            .where('bikes.user_id', user_id)
    },
    getBicycleById(db, bike_id) {
        return db
            .from('user_bikes AS bikes')
            .select(
                'bikes.user_id',
                'bikes.user_bike_id',
                'bikes.nick_name',
                'bikes.date_created',
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
            ).leftOuterJoin(
                'user_bike_positions AS pos',
                'pos.user_bike_id',
                'bikes.user_bike_id'
            ).leftOuterJoin(
                'user_bike_notes AS notes',
                'notes.user_bike_id',
                'bikes.user_bike_id'
            )
            .where('bikes.user_bike_id', bike_id)
    },
    getNewBicycleById(db, bike_id) {
        return db
            .from('user_bikes AS bikes')
            .select(
                'bikes.user_id',
                'bikes.user_bike_id',
                ...bikeFields,
                ...geometryFields,
            ).innerJoin(
                'mfr_bikes AS mfr',
                'mfr.mfr_bike_id',
                'bikes.mfr_bike_id'
            ).innerJoin(
                'mfr_bikes_geometry AS geo',
                'geo.geo_id',
                'bikes.geo_id'
            )
            .where('bikes.user_bike_id', bike_id)
    },

    getGeoId(db, mfr_bike_id , size) {
        return db
            .from("mfr_bikes_geometry AS mfr")
            .select("geo_id")
            .where('mfr.mfr_bike_id', mfr_bike_id)
            .andWhere('mfr.size', size)
    },

    insertBicycle(db, newBike) {
        return db
            .insert(newBike)
            .into('user_bikes')
            .returning('*')
            .then(([bike]) => bike)
            .then(bike =>
                BicyclesService.getNewBicycleById(db, bike.user_bike_id)
            )
    },

    serializeBicycles(bicycles) {
        let bikesTree = new Treeize()
        bikesTree.grow(bicycles)
        return bikesTree.getData()[0]
    },

    async deleteBicycle(db, user_bike_id) {
        await db('user_bike_positions')
            .where({user_bike_id})
            .delete()

        await db('user_bike_notes')
            .where({user_bike_id})
            .delete()

        await db('user_positions')
        await db('user_positions')
            .where({user_bike_id})
            .delete()
    },
    updateBicycle(db, bike_id, bikeFieldsToUpdate) {
        return db('user_bikes')
            .where({bike_id})
            .update(bikeFieldsToUpdate)
    },
}

const bikeFields = [
    {
        'bicycles:user_bike_id': 'bikes.user_bike_id',
        'bicycles:nick_name': 'bikes.nick_name',
        'bicycles:date_created': 'bikes.date_created',
        'bicycles:mfr_bike_id': 'mfr.mfr_bike_id',
        'bicycles:make': 'mfr.make',
        'bicycles:model': 'mfr.model',
        'bicycles:year': 'mfr.year',
    }
]

const gridFields = [
    {
        'user_bike_id': 'bikes.user_bike_id',
        'date_created': 'bikes.date_created',
        'mfr_bike_id': 'mfr.mfr_bike_id',
        'make': 'mfr.make',
        'model': 'mfr.model',
        'year': 'mfr.year',
        'geo_id': 'geo.geo_id',
        'size': 'geo.size',
        'reach': 'geo.reach',
        'stack': 'geo.stack',
        'top_tube_length': 'geo.top_tube_length',
        'head_tube_length': 'geo.head_tube_length',
        'head_tube_angle': 'geo.head_tube_angle',
        'seat_tube_length': 'geo.seat_tube_length',
        'seat_tube_angle': 'geo.seat_tube_angle',
        'wheelbase': 'geo.wheelbase',
        'chainstay': 'geo.chainstay',
        'bb_drop': 'geo.bb_drop',
        'standover': 'geo.standover',
        'rake': 'geo.rake',
        'trail': 'geo.trail',
        'position_id': 'pos.position_id',
        'active': 'pos.active',
        'name': 'pos.name',
        'description': 'pos.description',
        'stem': 'pos.stem',
        'stem_angle': 'pos.stem_angle',
        'handlebar': 'pos.handlebar',
        'crank': 'pos.crank',
        'seat': 'pos.seat',
        'handlebar_reach': 'pos.handlebar_reach',
        'handlebar_drop': 'pos.handlebar_drop',
        'setback': 'pos.setback',
        'seat_height': 'pos.seat_height'
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
        'bicycles:geometry:trail': 'geo.trail'
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
