import React, {Component} from "react";
import {GameBoardComponent} from "./board";


export class GameSessionComponent extends Component {
    render() {
        return (
            <div>
                <GameBoardComponent/>
            </div>
        )
    }
}