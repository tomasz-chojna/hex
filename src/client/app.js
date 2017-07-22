import { ApolloClient, ApolloProvider, gql, graphql } from 'react-apollo';
import React from 'react';
import ReactDOM from 'react-dom';
import {LoginComponent} from "./components/login";
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import {HelloWorldComponent} from "./components/hello";


class App extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        <LoginComponent nextState="/players"/>
                    </div>
                </div>
            </div>
        )
    }
};


const client = new ApolloClient();
ReactDOM.render(
    <ApolloProvider client={client}>
        <BrowserRouter>
            <div>
                <Route exact path="/" component={App}/>
                <Route path="/players" component={HelloWorldComponent}/>
                <Route exact path="/session/:sessionId"/>
                <Route exact path="/session/:sessionId/winner"/>
            </div>
        </BrowserRouter>
    </ApolloProvider>,
    document.getElementById('root')
);
