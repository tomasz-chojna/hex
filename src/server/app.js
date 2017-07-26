import express from "express";
import {createServer} from "http";
import graphqlHTTP from "express-graphql";
import schema from "./schema";
import {execute, subscribe} from "graphql";
import {SubscriptionServer} from "subscriptions-transport-ws";


const WS_GQL_PATH = '/subscriptions';
const PORT = 8000;

const app = express();
const server = createServer(app);

new SubscriptionServer({ schema, execute, subscribe }, { server, path: WS_GQL_PATH });

app.use(express.static('public'));
app.set('view engine', 'pug');
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
}));
app.get('*', (req, res) => res.render('index', {}));

server.listen(PORT, () => {
    console.log(`Server is now listening at ${PORT}`);
});
