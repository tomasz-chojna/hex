import {makeExecutableSchema} from "graphql-tools";
import Message from './message';
import resolvers from './../resolvers';


const Query = `
type Query {
    helloWorld: Message
}
`;

export default makeExecutableSchema({
    typeDefs: [Query, Message],
    resolvers,
});
