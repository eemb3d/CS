const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');

require('dotenv').config();

const app = express();

const { gamesRoutes } = require('./routes/index');
const { errors } = require('./utils/index');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(compression()); // Compress all routes

// ROUTES
app.use('/', gamesRoutes);

// ERRORS
app.get('/*', (req, res) => {
    return errors.notFound({ res: res });
});
app.use(function (err, req, res, next) {
    return errors.serverCrash({ res: res, err: err });
});

module.exports = app;
