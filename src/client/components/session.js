import React, {Component} from "react";
import {GameBoardComponent} from "./board";
import Cookie from 'js-cookie';
import {GameStatusComponent} from "./status";


export class GameSessionComponent extends Component {
    render() {
        return (
            <div>
                <GameStatusComponent
                    sessionId={this.props.match.params.sessionId}
                    playerId={Cookie.get('authToken')}
                    playerAColor={'#fd0006'}
                    playerBColor={'#1533ad'} />
                <GameBoardComponent
                    sessionId={this.props.match.params.sessionId}
                    playerId={Cookie.get('authToken')}
                    boardSize={7}
                    tileOutline={'#000'}
                    tileBackground={'#fff'}
                    tileHoverColor={'#ddd'}
                    playerAColor={'#fd0006'}
                    playerBColor={'#1533ad'}/>
            </div>
        )
    }
}