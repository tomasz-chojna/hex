import uuid4 from 'uuid/v4'
import { PubSub, withFilter } from 'graphql-subscriptions';
import {players, sessions} from '../cache/all';
const pubsub = new PubSub();


export default {
    Query: {
        players: async () => {
            return players;
        },
        currentSession: async () => {
            return {};
        },
        session: async (_, {sessionId}) => {
            if (!sessions.has(sessionId)) {
                throw new Error(`Session ${sessionId} does not exist`);
            }

            const session = sessions.get(sessionId);
            const resolvedSession = Object.assign({}, session);
            resolvedSession.players = session.players.map(playerId => players.find(player => player.id === playerId));
            return resolvedSession;
        }
    },
    Mutation: {
        createPlayer: async (_, args) => {
            const player = {
                id: uuid4(),
                name: args.name,
                availabilityStatus: 'AVAILABLE',
            };

            players.push(player);
            pubsub.publish('playersListUpdates', {playersListUpdates: player});

            return player;
        },

        startGameSession: async (_, {playerA, playerB}) => {
            const players = [playerA, playerB];
            const startingPlayer = players[Math.floor(Math.random() * 2)];

            const session = {
                id: uuid4(),
                start: new Date().getTime().toString(),
                end: null,
                boardSize: 11,
                winner: null,
                status: 'ACTIVE',
                startingPlayer: startingPlayer,
                currentMove: startingPlayer,
                players: players,
                moves: []
            };

            sessions.set(session.id, session);

            const resolvedSession = Object.assign({}, session);
            resolvedSession.players = session.players.map(playerId => players.find(player => player.id === playerId));
            pubsub.publish('gameSessionStarted', {gameSessionStarted: resolvedSession});
            return resolvedSession;
        },

        makeMove: async (_, {x, y, playerId, sessionId}) => {
            const session = sessions.get(sessionId);
            const currentMoveIndex = session.players.indexOf(session.currentMove);
            const nextMoveIndex = (currentMoveIndex === 0) ? 1 : 0;

            session.currentMove = session.players[nextMoveIndex];
            session.moves.push({
                playerId: playerId,
                x: x,
                y: y
            });
            sessions.set(sessionId, session);

            const resolvedSession = Object.assign({}, session);
            resolvedSession.players = session.players.map(playerId => players.find(player => player.id === playerId));
            pubsub.publish('gameSessionUpdates', {gameSessionUpdates: resolvedSession});
            return resolvedSession;
        }
    },
    Subscription: {
        playersListUpdates: {
            subscribe: withFilter(
                () => pubsub.asyncIterator('playersListUpdates'),
                (payload, variables) => true
            )
        },
        gameSessionUpdates: {
            subscribe: withFilter(
                () => pubsub.asyncIterator('gameSessionUpdates'),
                (payload, variables) => true
            )
        },
        gameSessionStarted: {
            subscribe: withFilter(
                () => pubsub.asyncIterator('gameSessionStarted'),
                (payload, variables) => true
            )
        }
    }
};