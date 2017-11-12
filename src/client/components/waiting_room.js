import { ActivePlayersListComponent } from './players';
import React, { Component } from 'react';
import {graphql, gql} from 'react-apollo';


class WaitingRoom extends Component {

    async componentDidMount() {
        this.props.data.subscribeToMore({
            document: gql`
              subscription {
                gameSessionStarted {
                  id
                }
              }
            `,
            variables: null,
            updateQuery: (previousState, {subscriptionData}) => {
                console.log(subscriptionData);
                return {currentSession: subscriptionData.data.gameSessionStarted}
            }
        })
    }

    render () {
        if (!this.props.data.loading && this.props.data.currentSession.id) {
            this.props.history.push(`/session/${this.props.data.currentSession.id}`);
            return <h1>Loading</h1>;
        }

        return (
            <div>
                <h1 className="text-center">Waiting room</h1>
                <ActivePlayersListComponent history={this.props.history}/>
            </div>
        );
    }
}

export const WaitingRoomComponent = graphql(gql`
  query {
    currentSession {
      id
    }
  }
`)(WaitingRoom);