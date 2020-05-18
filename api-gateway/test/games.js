/* eslint-disable no-undef */
const expect = require('chai').expect;
const request = require('request');

describe('Test Games Endpoints', () => {
    const domain = 'http://localhost:8080/'; // TBD: move to utils
    const gameData = {
        title: 'Uncharted 4',
        description: 'For the first time ever in Uncharted history, drive vehicles during gameplay',
        by: 'Sony',
        platform: [
            'PS4'
        ],
        age_rating: '16',
        likes: 100,
        comments: [
            {
                user: 'bob',
                message: 'Cracking game far too much cinematic',
                dateCreated: '2011-01-03',
                like: 6
            },
            {
                user: 'testingPriest',
                message: 'Not enough shooting for me,far too easy ',
                dateCreated: '2011-04-02',
                like: 5
            }
        ]
    };

    describe('/games/:game_id', () => {
        it('/games/1 SHOULD RETURN the same gameData object from API', (done) => {
            request(domain + 'games/1', (error, response, body) => {
                expect(response.statusCode).to.equal(200);
                expect(JSON.parse(body)).to.deep.include(gameData);

                if (error) return done(error);

                done();
            });
        });

        it('/games/BAD_ID SHOULD RETURN status error 400', function (done) {
            const badGameId = 'Something #é*!';
            request(domain + 'games/' + badGameId, (error, response, body) => {
                expect(response.statusCode).to.equal(400);

                if (error) return done(error);

                done();
            });
        });
    });
});
