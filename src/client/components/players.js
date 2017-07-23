import {gql, graphql} from "react-apollo";
import React from 'react';
import {Component} from "react";


const subscribeToPlayerJoining = gql`
  subscription {
    newPlayerJoined {
      id
      name
      availabilityStatus
    }
  }
`;

class ActivePlayersList extends Component {

    async componentDidMount() {
        this.props.data.subscribeToMore({
            document: subscribeToPlayerJoining,
            variables: null,
            updateQuery: (previousState, {subscriptionData}) => {
                let players = [];
                if (previousState.players) {
                    players = previousState.players;
                }

                return {players: [
                    ...players,
                    subscriptionData.data.newPlayerJoined,
                ]}
            }
        })
    }

    render() {
        if (this.props.data.loading) {
            return <h1>Loading...</h1>;
        }

        return <ul>{this.props.data.players.map((player) => <li key={player.id}>{player.name}</li>)}</ul>
    }
}

export const ActivePlayersListComponent = graphql(gql`
  query {
    players {
      id
      name
      availabilityStatus
    }
  }
`)(ActivePlayersList);