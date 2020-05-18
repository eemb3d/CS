const { dataManipulation } = require('../utils/index');

let dataReportCached = {};

/**
    - Retrieve summary of the games.
    - This report will need to return:
        - The user who has added the most comments across all games
        - The game with the highest sum of likes
        - The average likes per game (rounded up to the nearest integer)
 */
exports.getReport = async (req, res, next) => {
    try {
        await getMockReportData(req, res, next);
    } catch (error) {
        next(error);
    }
};

const getMockReportData = async (req, res, next) => {
    if (Object.keys(dataReportCached).length !== 0) return res.send(dataReportCached);

    dataManipulation.fetchLocalReport()
        .then(report => {
            dataReportCached = Object.assign({}, report);
            res.send(dataReportCached);
        })
        .catch(error => next(error));
};
