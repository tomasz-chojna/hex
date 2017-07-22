import { ApolloClient, ApolloProvider, gql, graphql } from 'react-apollo';
import React from 'react';
import ReactDOM from 'react-dom';

const HelloWorld = ({ data: {loading, error, helloWorld }}) => {
    if (loading) {
        return <p>Loading ...</p>;
    }
    if (error) {
        return <p>{error.message}</p>;
    }
    return <h1>{ helloWorld.text }</h1>
};

const HelloWorldComponent = graphql(gql`
    query HelloWorldQuery {
        helloWorld {
            text
        }
    }
`)(HelloWorld);

class App extends React.Component {
    render() {
        return (
            <HelloWorldComponent/>
        )
    }
};

const client = new ApolloClient();
ReactDOM.render(
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>,
    document.getElementById('root')
);
