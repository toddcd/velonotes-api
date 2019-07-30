const xss = require('xss')
const Treeize = require('treeize')

const NotesService = {
    getNoteById(db, note_id) {
        return db
            .from('user_bike_notes AS note')
            .select(
                'note.*'
            )
            .where('note.note_id', note_id)
    },

    serializeNote(note) {
        return {
            user_bike_id: note.user_bike_id,
            note_id: note.note_id,
            note_type: note.note_type,
            note: xss(note.note),
            date_created: note.date_created
        }
    },

    insertNote(db, newNote) {
        return db
            .insert(newNote)
            .into('user_bike_notes')
            .returning('*')
            .then(([note]) => note)
            .then(note =>
                NotesService.getNoteById(db, note.note_id)
            )
    },

    deleteNote(db, note_id) {
        return db('user_bike_notes')
            .where({ note_id })
            .delete()
    },

    updateNote(db, note_id, noteFieldsToUpdate) {
        return db('user_bike_notes')
            .where({ note_id })
            .update(noteFieldsToUpdate)
    },
}

module.exports = NotesService