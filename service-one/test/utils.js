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
        const rowGameData = {
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
                    dateCreated: '1294012800',
                    like: 6
                },
                {
                    user: 'testingPriest',
                    message: 'Not enough shooting for me,far too easy ',
                    dateCreated: '1301702400',
                    like: 5
                }
            ]
        };

        describe('Check games data converter', function () {
            it('12423423453 SHOULD BE returned as 2363-09-07', function (done) {
                // TBC: 2011-01-20
                const testData = '12423423453';
                const dataConverted = dataManipulation.dataConverter(testData);

                expect(dataConverted).to.equal('2363-09-07');
                done();
            });
            it('1294012800 SHOULD BE returned as 2011-01-03', function (done) {
                expect(dataManipulation.dataConverter(1294012800)).to.equal('2011-01-03');
                done();
            });
            it('1301702400 SHOULD BE returned as 2011-04-02', function (done) {
                expect(dataManipulation.dataConverter(1301702400)).to.equal('2011-04-02');
                done();
            });
        });

        describe('fetchLocalGames()', () => {
            it('Fetch data from local: data has to be deep equal rowGameData', (done) => {
                dataManipulation.fetchLocalGames()
                    .then(res => {
                        expect(res).to.deep.include(rowGameData);
                        done();
                    })
                    .catch(error => done(error));
            });
        });

        describe('epochToReadableData()', () => {
            it('Epoch object data: from rowGameData should be deep equal gameData', (done) => {
                expect(dataManipulation.epochToReadableData(rowGameData)).to.deep.include(gameData);
                done();
            });
        });
    });
});
