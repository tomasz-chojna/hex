import uuid4 from 'uuid/v4'
import { PubSub, withFilter } from 'graphql-subscriptions';

const pubsub = new PubSub();

// Temporarily in-memory, will be moved to Redis
const players = [];
const sessions = new Map();

export default {
    Query: {
        players: async () => {
            return players;
        },
        session: async (_, {sessionId}) => {
            console.log(sessionId, sessions);
            return sessions.get(sessionId);
        }
    },
    Mutation: {
        createPlayer: async (_, args) => {
            const player = {
                id: uuid4(),
                name: args.name,
                availabilityStatus: 'AVAILABLE'
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
                players: new Set(players),
                moves: []
            };

            sessions.set(session.id, session);
            return session;
        },

        makeMove: async (_, {x, y, playerId, sessionId}) => {
            const session = sessions.get(sessionId);
            session.moves.push({
                playerId: playerId,
                x: x,
                y: y
            });
            pubsub.publish('gameSessionUpdates', {gameSessionUpdates: session});
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
        }
    }
};