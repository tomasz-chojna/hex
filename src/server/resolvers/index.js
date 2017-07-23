import uuid4 from 'uuid/v4'
import { PubSub, withFilter } from 'graphql-subscriptions';

const pubsub = new PubSub();
const players = [];

export default {
    Query: {
        players: async () => {
            return players;
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
            pubsub.publish('newPlayerJoined', {newPlayerJoined: player});

            return player;
        }
    },
    Subscription: {
        newPlayerJoined: {
            subscribe: withFilter(
                () => pubsub.asyncIterator('newPlayerJoined'),
                (payload, variables) => true
            )
        }
    }
};