import {ApolloClient, ApolloProvider, createNetworkInterface} from "react-apollo";
import React from "react";
import ReactDOM from "react-dom";
import {LoginComponentWithCreatingPlayer} from "./components/login";
import {BrowserRouter, Route} from "react-router-dom";
import {WaitingRoomComponent} from "./components/waiting_room";
import {addGraphQLSubscriptions, SubscriptionClient} from "subscriptions-transport-ws";
import {GameSessionComponent} from "./components/session";

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
            reconnect: true,
        })
    )
});
ReactDOM.render(
    <ApolloProvider client={client}>
        <BrowserRouter>
            <div className="container">
                <Route exact path="/" component={App}/>
                <Route path="/players" component={WaitingRoomComponent}/>
                <Route exact path="/session/:sessionId" component={GameSessionComponent}/>
                <Route exact path="/session/:sessionId/winner"/>
            </div>
        </BrowserRouter>
    </ApolloProvider>,
    document.getElementById('root')
);
