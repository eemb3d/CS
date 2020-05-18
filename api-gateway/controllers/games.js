const { dataManipulation, errors } = require('../utils/index');
const { apiHelper } = require('../helpers/');

const SERVICE_ONE_URI = apiHelper.accessEnv('SERVICE_ONE_URI');
const SERVICE_TWO_URI = apiHelper.accessEnv('SERVICE_TWO_URI');

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

        dataManipulation.fetchHttpGames({ url: SERVICE_ONE_URI + '/games/' + req.params.gameId, next: next })
            .then(dataGame => res.send(dataGame))
            .catch(error => next(error));
    } catch (error) {
        next(error);
    };
};

/**
    - Retrieve summary of the games.
    - This report will need to return:
        - The user who has added the most comments across all games
        - The game with the highest sum of likes
        - The average likes per game (rounded up to the nearest integer)
 */
exports.getReport = async (req, res, next) => {
    try {
        dataManipulation.fetchHttpGames({ url: SERVICE_TWO_URI + '/games/report', next: next })
            .then(report => res.send(report))
            .catch(error => next(error));
    } catch (error) {
        next(error);
    }
};
