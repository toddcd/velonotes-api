const express = require('express')
const path = require('path')
const NotesService = require('./notes-service')
const {requireAuth} = require('../middleware/jwt-auth')

const notesRouter = express.Router()
const jsonBodyParser = express.json()

notesRouter
    .post(requireAuth, jsonBodyParser, (req, res, next) => {
        const {user_bike_id, note_type, note} = req.body
        const newNote = {user_bike_id, note_type, note}

        for (const [key, value] of Object.entries(newNote))
            if (value == null)
                return res.status(400).json({
                    error: `Missing '${key}' in request body`
                })

        NotesService.insertNote(
            req.app.get('db'),
            newNote
        )
            .then(note => {
                res
                    .status(201)
                    .location(path.posix.join(req.originalUrl, `/${note.note_id}`))
                    .json(NotesService.serializeNote(note[0]))
            })
            .catch(next)
    })

notesRouter
    .route('/:note_id')
    .all(requireAuth)
    .all(checkNoteExists)
    .get((req, res) => {
        res.json(NotesService.serializeNote(res.note[0]))
    })
    .delete((req, res) => {
        const {note_id} = req.params
        NotesService.deleteNote(
            req.app.get('db'),
            note_id
        )
            .then(numRowsAffected => {
                //logger.info(`Note with id ${note_id} deleted.`)
                res.status(204).end()
            })
    })
    .patch(jsonBodyParser, (req, res) => {
        const {note_type, note} = req.body
        const noteToUpdate = {note_type, note}
        const numberOfValues = Object.values(noteToUpdate).filter(Boolean).length

        if (numberOfValues === 0) {
            return res.status(400).json({
                error: `Request body must contain either: 'note_type' or 'note'`
            })
        }

        NotesService.updateNote(
            req.app.get('db'),
            req.params.note_id,
            noteToUpdate
        ).then(numRowsAffected => {
            res.status(204).end()
        })
    })

/* async/await syntax for promises */
async function checkNoteExists(req, res, next) {
    const {note_id} = req.params
    try {
        const note = await NotesService.getNoteById(
            req.app.get('db'),
            note_id
        )

        if (note.length === 0)
            return res.status(404).json({
                error: `Note id ${note_id} doesn't exist`
            })

        res.note = note
        next()

    } catch (error) {
        next(error)
    }
}

module.exports = notesRouter