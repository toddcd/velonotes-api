const xss = require('xss')
const Treeize = require('treeize')

const PositionsService = {
    getPositionById(db, position_id) {
        return db
            .from('user_bike_positions AS pos')
            .select(
                'pos.*'
            )
            .where('pos.position_id', position_id)
    },

    serializePosition(position) {
        return {
            user_bike_id: position.user_bike_id,
            position_id: position.position_id,
            active: position.active,
            name: xss(position.name),
            description: xss(position.description),
            stem: position.stem,
            stem_angle: position.stem_angle,
            handlebar: position.handlebar,
            handlebar_bend: position.handlebar_bend,
            crank: position.crank,
            crank_q: position.crank_q,
            seat: position.seat,
            handlebar_reach: position.handlebar_reach,
            handlebar_drop: position.handlebar_drop,
            setback: position.setback,
            seat_height: position.seat_height
        }
    },

    insertPosition(db, newPosition) {
        return db
            .insert(newPosition)
            .into('user_bike_positions')
            .returning('*')
            .then(([position]) => position)
            .then(position =>
                PositionsService.getPositionById(db, position.position_id)
            )
    },

    deletePosition(db, position_id) {
        return db('user_bike_positions')
            .where({ position_id })
            .delete()
    },

    updatePosition(db, position_id, posFieldsToUpdate) {
        return db('user_bike_positions')
            .where({ position_id })
            .update(posFieldsToUpdate)
    },
}


module.exports = PositionsService