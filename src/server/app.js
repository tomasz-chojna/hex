import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './schema';

const app = express();
app.use(express.static('public'));
app.set('view engine', 'pug');
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));
app.get('/', (req, res) => res.render('index', {}));
app.listen(8000);
