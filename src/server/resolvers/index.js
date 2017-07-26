import uuid4 from 'uuid/v4'
import { PubSub, withFilter } from 'graphql-subscriptions';

const pubsub = new PubSub();
const players = [];
const session = {
    id: 'session-id',
    start: 1000,
    end: 2000,
    boardSize: 11,
    winner: 'uuid2',
    status: 'INTERRUPTED',
    startingPlayer: 'uuid1',
    currentMove: 'uuid2',
    players: ['uuid1', 'uuid2'],
    moves: [
        {playerId: 'uuid1', x: 0, y: 0, timestamp: 1000},
        {playerId: 'uuid2', x: 0, y: 1, timestamp: 2000},
    ]
};

export default {
    Query: {
        players: async () => {
            return players;
        },
        session: async (_, {sessionId}) => {
            return session;
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
        startGameSession: async (_, args) => {
            session.id = uuid4();
            return session;
        },
        makeMove: async (_, args) => {
            session.moves.push({
                playerId: 'uuid2',
                x: args.x,
                y: args.y
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