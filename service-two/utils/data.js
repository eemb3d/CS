const jsonfile = require('jsonfile');
const path = require('path');

module.exports = {

    fetchLocalReport: async () => {
        const filepath = path.join(__dirname, '../data/report.json');
        return await jsonfile.readFile(filepath)
            .then(json => json)
            .catch((err) => console.error('ERROR!', err));
    }

};
