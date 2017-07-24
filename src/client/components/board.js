import React, {Component} from "react";
import Raphael from 'raphael';
import {hexBoardSVG} from '../helpers/board-svg';


export class GameBoardComponent extends Component {

    constructor(props) {
        super(props);

        this.start = { startX: 10, startY: 10 };
        this.edgeSize = 25;
        this.boardSize = 15;
        this.hexWidth = this.edgeSize * Math.sqrt(3);
    }

    componentDidMount() {
        const paper = new Raphael(document.getElementById('board'), 1000, 1000);

        const redPlayerColor = '#fd0006';
        const bluePlayerColor = '#1533ad';

        const start = this.start;

        const board = hexBoardSVG(this.boardSize, this.edgeSize);


        for (let i=0; i < this.boardSize; i++) {
            for (let j=0; j < this.boardSize; j++) {
                const tile = paper.path(board.hexagon({
                    startX: start.startX + (this.hexWidth * j) + (this.hexWidth/2 * i),
                    startY: start.startY + (3/2 * this.edgeSize * i)
                })).attr({fill: '#fff'});
                tile.click(
                    function () {
                        this.attr({"fill": bluePlayerColor});
                    }
                )
            }
        }

        for (let i=1; i < this.boardSize; i++) {
            const topStartX = start.startX + this.hexWidth/2;

            const bottomStartX = start.startX + (this.hexWidth/2 * this.boardSize);
            const bottomStartY = start.startY + 3/2 * this.edgeSize * this.boardSize;

            const rightStart = start.startX + this.boardSize * this.hexWidth;
            const rightStartY = start.startY;

            paper.path(board.leftEdge({
                startX: start.startX + this.hexWidth/2 * (i-2),
                startY: start.startY + 3/2 * this.edgeSize * i
            })).attr({fill: redPlayerColor});

            paper.path(board.rightEdge({
                startX: rightStart + (this.hexWidth/2 * (i - 1)),
                startY: rightStartY + (i - 1) * 3/2 * this.edgeSize
            })).attr({fill: redPlayerColor});

            paper.path(board.topEdge({
                startX: topStartX + (i - 1) * this.hexWidth,
                startY: start.startY - 3/2 * this.edgeSize
            })).attr({fill: bluePlayerColor});

            paper.path(board.bottomEdge({
                startX: bottomStartX + (i-1) * this.hexWidth,
                startY: bottomStartY
            })).attr({fill: bluePlayerColor});
        }
    }

    render() {
        return <div>
            <div id="board"/>
        </div>
    }

}