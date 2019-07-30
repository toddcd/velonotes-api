const xss = require('xss')
const Treeize = require('treeize')

const UiDataService = {
    getAllMakeModel(db) {
        return db
            .unionAll(
                db.raw(`select make.mfr_bike_id,   
                               'make' AS type,
                               make.make AS parent,
                               make.make as child
                        from mfr_bikes AS make`),
                db.raw(`select model.mfr_bike_id,   
                               'model' AS type,
                               model.make AS parent,
                               model.model as child
                        from mfr_bikes AS model`),
                db.raw(`select myear.mfr_bike_id,
                               'year' AS type,
                               myear.model AS parent,
                               myear."year" as child
                        from mfr_bikes AS myear`)
            )
    },
    getSizeById(db) {
        return db.
            from('mfr_bikes_geometry AS geo')
            .select(
                'geo.mfr_bike_id',
                ...sizeFields
            )
    },
    serializeSizes(geo) {
        let sizeTree = new Treeize()
        sizeTree.grow(geo)
        return sizeTree.getData()
    },
}

const sizeFields = [
    {
        'sizes:geo_id': 'geo.geo_id',
        'sizes:size': 'geo.size',
    }
]

module.exports = UiDataService