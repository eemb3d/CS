// const { games, report } = require('../models/index');
const { dataManipulation, errors } = require('../utils/index');

let dataGameCached = [];

/**
 - Retrieve single game info by game_id
 - All dates are stored as time since the epoch and need to be \
    converted to the readable format yyy-mm-dd (i.e. <12423423453> \
        should be returned as 2011-01-20)
 */
exports.getGame = async (req, res, next) => {
    try {
        if (!req.params || isNaN(req.params.gameId) || req.params.gameId < 0) {
            return errors.badRequest({ res: res });
        }
        await getMockGameData(req, res, next);
    } catch (error) {
        next(error);
    }
};

const getMockGameData = async (req, res, next) => {
    if (dataGameCached.length !== 0) {
        if (req.params.gameId > dataGameCached.length - 1) return errors.badRequest({ res: res });
        else return res.send(dataGameCached[req.params.gameId]);
    }

    dataManipulation.fetchLocalGames()
        .then(dataGame => {
            if (dataGame && req.params.gameId > dataGame.length - 1) return errors.badRequest({ res: res });

            if (dataGameCached.length === 0) {
                dataGameCached = dataGame.map(game => {
                    return dataManipulation.epochToReadableData(game);
                });
            };

            const dataConverted = dataManipulation.epochToReadableData(dataGame[req.params.gameId]);
            res.send(dataConverted);
        })
        .catch(error => next(error));
};
