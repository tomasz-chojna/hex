import {makeExecutableSchema} from "graphql-tools";
import Player from './player';
import resolvers from './../resolvers';
import GameSession from './game_session';


const Query = `
type Query {
    players: [Player]
    session(sessionId: ID): GameSession
    currentSession: CurrentGameSession
}

type Mutation {
    createPlayer(name: String!): Player
    startGameSession(playerA: ID!, playerB: ID!): GameSession
    makeMove(sessionId: ID!, playerId: ID!, x: Int, y: Int): GameMove
}

type Subscription {
    playersListUpdates: Player
    gameSessionStarted(playerId: ID): GameSession
    gameSessionUpdates(sessionId: ID!): GameSession
}
`;

export default makeExecutableSchema({
    typeDefs: [Query, Player, GameSession],
    resolvers,
});
