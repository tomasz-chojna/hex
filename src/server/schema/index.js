import {makeExecutableSchema} from "graphql-tools";
import Message from './message';
import Player from './player';
import resolvers from './../resolvers';


const Query = `
type Query {
    players: [Player]
}

type Mutation {
    createPlayer(name: String!): Player
}

type Subscription {
    newPlayerJoined: Player
}
`;

export default makeExecutableSchema({
    typeDefs: [Query, Message, Player],
    resolvers,
});
