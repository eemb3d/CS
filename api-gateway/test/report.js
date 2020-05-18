/* eslint-disable no-undef */
const expect = require('chai').expect;
const request = require('request');

describe('Test Reports Endpoints', () => {
    const domain = 'http://localhost:8080/'; // TBD: move to utils
    const reportData = {
        user_with_most_comments: 'Alison',
        highest_rated_game: 'Uncharted 4',
        average_likes_per_game: [{
            title: 'Call of Duty, Infinite Warfare',
            average_likes: 4
        }, {
            title: 'Uncharted 4',
            average_likes: 7
        }]
    };

    describe('/games/report', () => {
        it('/games/report SHOULD RETURN the same reportData object from API', (done) => {
            request(domain + 'games/report', (error, response, body) => {
                expect(response.statusCode).to.equal(200);
                expect(JSON.parse(body)).to.deep.include(reportData);

                if (error) return done(error);

                done();
            });
        });

        it('/games/BAD_ID SHOULD RETURN status error 400', function (done) {
            const badGameId = 'report #é*!';
            request(domain + 'games/' + badGameId, (error, response, body) => {
                expect(response.statusCode).to.equal(400);

                if (error) return done(error);

                done();
            });
        });
    });
});
