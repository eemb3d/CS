/* eslint-disable no-undef */
const expect = require('chai').expect;
const { errors, dataManipulation } = require('../utils/index');

describe('Test UTILS', () => {
    describe('ERRORS', () => {
        const httpServerEACCES = ' requires elevated privileges';
        const httpServerEADDRINUSE = ' is already in use';

        describe('Message Errors', () => {
            it('httpServerEACCES should be " requires elevated privileges"', (done) => {
                expect(errors.httpServerEACCES).to.equal(httpServerEACCES);
                done();
            });

            it('httpServerEADDRINUSE should be " is already in use"', (done) => {
                expect(errors.httpServerEADDRINUSE).to.equal(httpServerEADDRINUSE);
                done();
            });
        });
    });

    describe('DATA', () => {
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

        describe('fetchLocalReport()', () => {
            it('Fetch data from local: data has to be deep equal reportData', (done) => {
                dataManipulation.fetchLocalReport()
                    .then(res => {
                        expect(res).to.deep.include(reportData);
                        done();
                    })
                    .catch(error => done(error));
            });
        });
    });
});
