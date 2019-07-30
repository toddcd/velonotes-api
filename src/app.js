require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const authRouter = require('./auth/auth-router');
const bicyclesRouter = require('./bicycles/bicycles-router');
const positionsRouter = require('./positions/positions-router');
const notesRouter = require('./notes/notes-router');
const uiDataRouter = require('./uidata/uidata-router');

const app = express();

const morganOption = (NODE_ENV === 'production')
    ? 'tiny'
    : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

app.use('/api/auth', authRouter);
app.use('/api/bicycles', bicyclesRouter);
app.use('/api/positions', positionsRouter);
app.use('/api/notes', notesRouter);
app.use('/api/uidata', uiDataRouter);

app.get('/', (req, res) => {
    res.send('Hello, velonotes!')
});

app.use(function errorHandler(error, req, res, next) {
    let response
    if (NODE_ENV === 'production') {
        response = {error: {message: 'server error'}}
    } else {
        console.error(error)
        response = {message: error.message, error}
    }
    res.status(500).json(response)
});

module.exports = app;