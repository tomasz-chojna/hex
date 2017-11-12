import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, gql } from 'react-apollo';


class GameStatus extends Component {
    static propTypes = {
        sessionId: PropTypes.string.isRequired,
        playerAColor: PropTypes.string.isRequired,
        playerBColor: PropTypes.string.isRequired,
    }

    render() {
        if (this.props.data.loading) {
            return <p>Loading...</p>
        }

        const currentMove = this.props.data.session.currentMove;
        const players = this.props.data.session.players;

        const badge = <span className="badge">Current move</span>;
        const playerABadge = (this.props.data.session.currentMove === players[0].id) ? badge : null;
        const playerBBadge = (this.props.data.session.currentMove === players[1].id) ? badge : null;

        return <div className="row game-status-component">
            <div className="col-md-6">
                <ul className="list-group">
                    <li className="list-group-item">
                        {playerABadge}
                        <span style={{color: this.props.playerAColor}}>{players[0].name}</span>
                    </li>
                    <li className="list-group-item">
                        {playerBBadge}
                        <span style={{color: this.props.playerBColor}}>{players[1].name}</span>
                    </li>
                </ul>
            </div>
        </div>
    }
}

export const GameStatusComponent = graphql(gql`
query session($sessionId: ID!) {
    session(sessionId: $sessionId) {
          id
          start
          startingPlayer
          currentMove
          status
          winner
          boardSize
          players {
            id
            name
          }
          moves {
            playerId
            x
            y
          }
    }
}
`, {
    options: (ownProps) => {
        return {
            variables: {
                sessionId: ownProps.sessionId
            }
        }
    }
})(GameStatus);
