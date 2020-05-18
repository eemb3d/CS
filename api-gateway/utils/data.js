const axios = require('axios');

module.exports = {

    fetchHttpGames: async (objectParams) => {
        return await axios.get(objectParams.url)
            .then(res => res.data)
            .catch(() => console.error(''));
    }

};
