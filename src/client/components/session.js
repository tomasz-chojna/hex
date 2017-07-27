import React, {Component} from "react";
import {GameBoardComponent} from "./board";


export class GameSessionComponent extends Component {
    render() {
        return (
            <div>
                <GameBoardComponent
                    sessionId={this.props.match.params.sessionId}
                    playerId={'uuid1'}
                    boardSize={11}
                    tileOutline={'#000'}
                    tileBackground={'#fff'}
                    tileHoverColor={'#ddd'}
                    playerAColor={'#fd0006'}
                    playerBColor={'#1533ad'}/>
            </div>
        )
    }
}