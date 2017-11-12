import {ApolloClient, ApolloProvider, createNetworkInterface} from 'react-apollo';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import {WaitingRoomComponent} from './components/waiting_room';
import {addGraphQLSubscriptions, SubscriptionClient} from 'subscriptions-transport-ws';
import {GameSessionComponent} from './components/session';
import {LoginComponent} from './login/LoginComponent';


class Navbar extends React.Component {
    render() {
        return <nav className="navbar navbar-dark bg-primary navbar-expand-lg">
            <a className="navbar-brand" href="#">HEX</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
                    aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"/>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <a className="nav-item nav-link active" href="#">Home <span
                        className="sr-only">(current)</span></a>
                    <a className="nav-item nav-link" href="#">Scoreboard</a>
                </div>
            </div>
        </nav>
    }
}

class Jumbotron extends React.Component {
    render() {
        const styles = {width: '100%'};
        return <div className="jumbotron">
            <div className="row">
                <div className="col-md-4">
                    <img src="/img/winner_algorithm.png" style={styles} alt="" className="img-responsive"/>
                </div>
                <div className="col-md-8">
                    <h1 className="display-3">Ready to play?</h1>
                    <p className="lead">Simply <a className="btn btn-primary btn-lg" href="#" role="button">Login
                        with Facebook</a> and start competing with other players</p>
                    <hr className="my-4"/>

                    <form className="form-inline">
                        <div className="form-group">
                            <label for="staticEmail2" className="sr-only">Email</label>
                            <input type="text" className="form-control" id="staticEmail2" placeholder="Email"/>
                        </div>
                        <div className="form-group mx-sm-3">
                            <label for="inputPassword2" className="sr-only">Password</label>
                            <input type="password" className="form-control" id="inputPassword2"
                                   placeholder="Password"/>
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>

                    <br/>
                    <p>
                        <a href="#">Don't have an account yet?</a>
                    </p>
                </div>
            </div>
        </div>
    }
}

class FeatureList extends React.Component {
    render() {
        return <ul className="list-unstyled">
            <li className="media">
                <img className="mr-3" src="..." alt=""/>
                <div className="media-body">
                    <h5 className="mt-0 mb-1">Invite available player</h5>
                    The first view you will be presented with is the list of online players.
                </div>
            </li>
            <li className="media my-4">
                <img className="mr-3" src="..." alt=""/>
                <div className="media-body">
                    <h5 className="mt-0 mb-1">Send & Receive game invitations</h5>
                    The game starts only when game invitation is accepted. You can also enable accepting invitations automatically.
                </div>
            </li>
            <li className="media my-4">
                <img className="mr-3" src="..." alt=""/>
                <div className="media-body">
                    <h5 className="mt-0 mb-1">Compete on 11x11 board with selected player in real-time</h5>
                    Hex board is moved online to a nice interactive interface, which allows you to comfortably play on your device.
                </div>
            </li>
            <li className="media">
                <img className="mr-3" src="..." alt=""/>
                <div className="media-body">
                    <h5 className="mt-0 mb-1">Top the scoreboard</h5>
                    We players love competing with others, so with every session you move up on the Scoreboard.
                </div>
            </li>
        </ul>
    }
}

class App extends React.Component {
    render() {
        return (
            <div>
                <Navbar/>
                <Jumbotron/>
                <FeatureList/>
            </div>
        )
    }
};


const client = new ApolloClient({
    networkInterface: addGraphQLSubscriptions(
        createNetworkInterface({uri: '/graphql'}),
        new SubscriptionClient(`ws://${window.location.host}/subscriptions`, {
            reconnect: true,
        }),
    ),
});
ReactDOM.render(
    <ApolloProvider client={client}>
        <BrowserRouter>
            <div className="container app-container">
                <Route exact path="/" component={App}/>
            </div>
        </BrowserRouter>
    </ApolloProvider>
    ,
    document.getElementById('root'),
);
