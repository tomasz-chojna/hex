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

    render() {
        if (this.props.data.loading) {
            return <h1>Loading...</h1>;
        }

        return <ul>
            {this.props.data.players.map((player) => <li key={player.id}>{player.name} - <a href="#" onClick={() => this.startGame(player)}>Play</a></li>)}
            </ul>
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