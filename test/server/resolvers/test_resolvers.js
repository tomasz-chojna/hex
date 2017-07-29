import 'babel-polyfill';
import { sessions } from '../../../src/server/cache/all';
import { expect } from 'chai';
import sinon from 'sinon';
import proxyquire from 'proxyquire';


describe('Hex resolver', () => {
    let resolvers;

    beforeEach(() => {
        const sessionsMock = new Map();
        sessionsMock.set('s1', {
            id: 's1',
            start: new Date().getTime().toString(),
            end: null,
            boardSize: 11,
            winner: null,
            status: 'ACTIVE',
            startingPlayer: 'p1',
            currentMove: 'p1',
            players: ['p1', 'p2'],
            moves: []
        });

        resolvers = proxyquire('../../../src/server/resolvers', {
            '../cache/all': {
                sessions: sessionsMock
            }
        }).default;
    });

    it('should switch currentMove after making a move', async () => {
        const move = await resolvers.Mutation.makeMove({}, {x: 0, y: 0, playerId: 'p1', sessionId: 's1'});
        expect(move.currentMove).to.be.equal('p2');
    });

});