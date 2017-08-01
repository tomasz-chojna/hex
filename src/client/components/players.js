import {gql, graphql, compose} from "react-apollo";
import React from 'react';
import {Component} from "react";
import {Redirect} from "react-router";
import Cookie from 'js-cookie';
import PropTypes from 'prop-types';


class ActivePlayersList extends Component {

    static propTypes = {
        history: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {
        this.props.data.subscribeToMore({
            document: gql`
              subscription {
                playersListUpdates {
                  id
                  name
                  availabilityStatus
                }
              }
            `,
            variables: null,
            updateQuery: (previousState, {subscriptionData}) => {
                let players = [];
                if (previousState.players) {
                    players = previousState.players;
                }

                return {players: [
                    ...players,
                    subscriptionData.data.playersListUpdates,
                ]}
            }
        })
    }

    async startGame(player) {
        const playerId = Cookie.get('authToken');
        const result = await this.props.mutate({variables: { playerA: player.id, playerB: playerId }});
        this.props.history.push(`/session/${result.data.startGameSession.id}`);
    }

    renderPlayer(player) {
        return <li key={player.id} className="list-group-item">
            <span className="label label-success">{player.availabilityStatus}</span> - <span>{player.name}</span>
            <a href="#" className="pull-right" onClick={() => this.startGame(player)}>Play</a>
        </li>
    }

    render() {
        if (this.props.data.loading) {
            return <h1>Loading...</h1>;
        }

        return <div className="row">
            <div className="col-md-offset-3 col-md-6">
                <ul className="list-group">
                    { this.props.data.players.map((player) => this.renderPlayer(player)) }
                </ul>
            </div>
        </div>
    }
}

export const ActivePlayersListComponent = compose(
    graphql(gql`
      query {
        players {
          id
          name
          availabilityStatus
        }
      }
    `),
    graphql(gql`
    mutation startGameSession($playerA: ID!, $playerB: ID!) {
        startGameSession(playerA: $playerA, playerB: $playerB) {
            id
        }
    }
    `)
)(ActivePlayersList);