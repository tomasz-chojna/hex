import React, {Component} from "react";
import Raphael from 'raphael';
import PropTypes from 'prop-types';
import {hexBoardSVG} from '../helpers/board-svg';
import {gql, graphql, compose} from "react-apollo";


export class GameBoard extends Component {

    static propTypes = {
        playerId: PropTypes.string.isRequired,
        boardSize: PropTypes.number.isRequired,
        playerAColor: PropTypes.string.isRequired,
        playerBColor: PropTypes.string.isRequired,
        tileBackground: PropTypes.string.isRequired,
        tileOutline: PropTypes.string.isRequired,
        tileHoverColor: PropTypes.string.isRequired
    };

    definePlayersColor() {
        const availableColors = [this.props.playerAColor, this.props.playerBColor];
        const playerAColorIndex = Math.floor(Math.random() * 2);
        const playerBColorIndex = (playerAColorIndex === 0) ? 1 : 0;

        this.playersColors = new Map();
        this.playersColors.set(this.state.data.session.players[0].id, availableColors[playerAColorIndex]);
        this.playersColors.set(this.state.data.session.players[1].id, availableColors[playerBColorIndex]);
    }

    constructor(props) {
        super(props);

        this.start = { startX: 10, startY: 10 };
        this.state = {};
        this.state.data = {
            session: {
                players: [{
                    id: 'uuid1'
                }, {
                    id: 'uuid2'
                }],
                moves: [
                    {x: 0, y: 0, playerId: 'uuid1'},
                    {x: 1, y: 1, playerId: 'uuid2'},
                    {x: 2, y: 2, playerId: 'uuid1'}
                ],
                currentMove: 'uuid1'
            }
        };

        this.paper = null;
        this.definePlayersColor();
    }

    tileClickHandler(x, y) {
        return function () {
            if (this.state.data.session.currentMove !== this.props.playerId) {
                console.log('Could not handle this move, opponent is making his move at the moment');
                return;
            }

            if (this.getBoardTile(x, y).isOccupied) {
                console.log('Could not handle this move, this field is already occupied choose another one');
                return;
            }

            this.props.mutate({ variables: { x, y } });
        }
    }

    tileHoverInHandler(x, y) {
        const tile = this.getBoardTile(x, y);
        return function () {
            if (tile.isOccupied) {
                return;
            }

            tile.tile.attr({fill: this.props.tileHoverColor});
        }
    }

    tileHoverOutHandler(x, y) {
        const tile = this.getBoardTile(x, y);
        return function () {
            if (tile.isOccupied) {
                return;
            }

            tile.tile.attr({fill: this.props.tileBackground});
        }
    }

    getBoardTileKey(x, y) {
        return `${x}_${y}`;
    }

    getBoardTile(x, y) {
        return this.boardTiles.get(this.getBoardTileKey(x, y));
    }

    fillBoardTile(x, y, playerId) {
        const playerColor = this.playersColors.get(playerId);
        const boardTile = this.getBoardTile(x, y);

        boardTile.tile.attr({
            fill: playerColor
        });
        boardTile.isOccupied = true;

        console.log(`Filled ${this.getBoardTileKey(x, y)} tile for ${playerId} with color ${playerColor}`);
    }

    componentDidMount() {
        this.props.data.subscribeToMore({
            document: gql`
            subscription gameSessionUpdates($sessionId: ID) {
                gameSessionUpdates(sessionId: $sessionId) {
                    moves {
                        x
                        y
                        playerId
                    }
                }
            }
            `,
            variables: {
                sessionId: 'session-1'
            },
            updateQuery: (previousState, {subscriptionData}) => {
                let session = {};
                if (previousState.session) {
                    session = previousState.session;
                }

                const newSession = Object.assign({}, session, subscriptionData.data.gameSessionUpdates);
                return {session: newSession};
            }
        });
    }

    componentDidUpdate() {
        if (this.props.data.loading) {
            return;
        }

        if (this.paper) {
            this.paper.remove();
        }

        const maxWidth = parseInt(getComputedStyle(this.boardDiv).width);
        const paper = new Raphael(this.boardDiv, maxWidth, maxWidth);
        this.paper = paper;

        this.boardTiles = new Map();
        this.boardSize = this.props.boardSize;
        this.edgeSize = parseInt(2/3 * (maxWidth) / (Math.sqrt(3) * this.boardSize));

        const board = hexBoardSVG(this.boardSize, this.edgeSize);
        const tiles = board.drawOn(paper, this.start, [this.props.playerAColor, this.props.playerBColor]);

        tiles.forEach(({tile, x, y}) => {
            this.boardTiles.set(this.getBoardTileKey(x, y), {tile: tile, isOccupied: false});

            tile.attr({
                fill: this.props.tileBackground,
                stroke: this.props.tileOutline
            });
            tile.hover(
                this.tileHoverInHandler(x, y).bind(this),
                this.tileHoverOutHandler(x, y).bind(this)
            );
            tile.click(this.tileClickHandler(x, y).bind(this));
        });

        this.renderMoves();
    }

    renderMoves() {
        this.props.data.session.moves.forEach(move => this.fillBoardTile(move.x, move.y, move.playerId));
    }

    render() {
        if (this.props.data.loading) {
            return <h1>Loading board...</h1>
        }

        const session = this.props.data.session;
        console.log(session);

        return <div>
            <div id="board" ref={(div) => this.boardDiv = div} />
        </div>
    }

}

export const GameBoardComponent = compose(
    graphql(gql`
      query {
        session(sessionId: "abcd") {
          id
          start
          startingPlayer
          currentMove
          status
          winner
          boardSize
          players
          moves {
            playerId
            x
            y
          }
        }
      }
    `),
    graphql(gql`
    mutation makeMove($x: Int!, $y: Int!) {
        makeMove(x: $x, y: $y) {
            x
            y
            playerId
        }
      }
    `)
)(GameBoard);