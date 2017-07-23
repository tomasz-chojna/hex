import {ApolloClient, ApolloProvider, createNetworkInterface} from "react-apollo";
import React from "react";
import ReactDOM from "react-dom";
import {LoginComponentWithCreatingPlayer} from "./components/login";
import {BrowserRouter, Route} from "react-router-dom";
import {ActivePlayersListComponent} from "./components/players";
import {addGraphQLSubscriptions, SubscriptionClient} from "subscriptions-transport-ws";

class App extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        <LoginComponentWithCreatingPlayer nextState="/players"/>
                    </div>
                </div>
            </div>
        )
    }
};


const client = new ApolloClient({
    networkInterface: addGraphQLSubscriptions(
        createNetworkInterface({ uri: '/graphql' }),
        new SubscriptionClient(`ws://localhost:8000/subscriptions`, {
            reconnect: true
        })
    )
});
ReactDOM.render(
    <ApolloProvider client={client}>
        <BrowserRouter>
            <div>
                <Route exact path="/" component={App}/>
                <Route path="/players" component={ActivePlayersListComponent}/>
                <Route exact path="/session/:sessionId"/>
                <Route exact path="/session/:sessionId/winner"/>
            </div>
        </BrowserRouter>
    </ApolloProvider>,
    document.getElementById('root')
);
