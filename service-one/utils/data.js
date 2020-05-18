const jsonfile = require('jsonfile');
const path = require('path');
const moment = require('moment');

module.exports = {

    calendarDateFormat: 'YYYY-MM-DD',

    fetchLocalGames: async () => {
        const filepath = path.join(__dirname, '../data/games.json');
        return await jsonfile.readFile(filepath)
            .then(json => json)
            .catch((err) => console.error('ERROR!', err));
    },

    dataConverter: (data) => {
        try {
            return moment.unix(data).utc().format(module.exports.calendarDateFormat);
        } catch (err) {
            console.error('ERROR!', err);
            return data;
        }
    },

    epochToReadableData: (dataObject) => {
        const copiedData = JSON.parse(JSON.stringify(dataObject));

        try {
            copiedData.comments = copiedData.comments.map(x => {
                x.dateCreated = module.exports.dataConverter(x.dateCreated);
                return x;
            });
        } catch (err) {
            console.error('ERROR!', err);
            return {};
        }

        return copiedData;
    }
};
