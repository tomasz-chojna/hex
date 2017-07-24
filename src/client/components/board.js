import React, {Component} from "react";
import Raphael from 'raphael';


function hexBoardSVG(boardSize, edgeSize) {
    const hexWidth = () => edgeSize * Math.sqrt(3);

    const topLeft = (x, y) => [x, y + edgeSize/2];
    const topCenter = (x, y) => [x + hexWidth()/2, y];
    const topRight = (x, y) => [x + hexWidth(), y + edgeSize/2];

    const bottomLeft = (x, y) => [x, y + 3/2 * edgeSize];
    const bottomCenter = (x, y) => [x + hexWidth()/2, y + 2 * edgeSize];
    const bottomRight = (x, y) => [x + hexWidth(), y + 3/2 * edgeSize];

    const moveToSVG = ([x, y]) => `M${x} ${y}`;
    const lineToSVG = ([x, y]) => `L${x} ${y}`;
    const buildSVGPathString = (vertices, {startX, startY}) => {
        const startFrom = vertices[0];
        const points = vertices.slice(1, vertices.length);
        return moveToSVG(startFrom(startX, startY))
            + points.map((vertex) => lineToSVG(vertex(startX, startY))).join('');
    };

    return {
        generateHexagonSVGPath({startX, startY}) {
            const vertices = [
                topLeft,
                bottomLeft,
                bottomCenter,
                bottomRight,
                topRight,
                topCenter,
                topLeft
            ];
            return buildSVGPathString(vertices, {startX, startY});
        },

        generateBoardLeftEdgeSVGPath({startX, startY}) {
            const vertices = [
                topCenter,
                topRight,
                bottomRight,
                topCenter
            ];
            return buildSVGPathString(vertices, {startX, startY});
        },

        generateBoardRightEdgeSVGPath({startX, startY}) {
            const vertices = [
                topLeft,
                bottomLeft,
                bottomCenter,
                topLeft
            ];
            return buildSVGPathString(vertices, {startX, startY});
        },

        generateBoardTopEdgeSVGPath({startX, startY}) {
            const vertices = [
                bottomLeft,
                bottomCenter,
                bottomRight,
                bottomLeft
            ];
            return buildSVGPathString(vertices, {startX, startY});
        },

        generateBoardBottomEdgeSVGPath({startX, startY}) {
            const vertices = [
                topLeft,
                topCenter,
                topRight,
                topLeft
            ];
            return buildSVGPathString(vertices, {startX, startY});
        }

    }
}


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
                const tile = paper.path(board.generateHexagonSVGPath({
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

            paper.path(board.generateBoardLeftEdgeSVGPath({
                startX: start.startX + this.hexWidth/2 * (i-2),
                startY: start.startY + 3/2 * this.edgeSize * i
            })).attr({fill: redPlayerColor});

            paper.path(board.generateBoardRightEdgeSVGPath({
                startX: rightStart + (this.hexWidth/2 * (i - 1)),
                startY: rightStartY + (i - 1) * 3/2 * this.edgeSize
            })).attr({fill: redPlayerColor});

            paper.path(board.generateBoardTopEdgeSVGPath({
                startX: topStartX + (i - 1) * this.hexWidth,
                startY: start.startY - 3/2 * this.edgeSize
            })).attr({fill: bluePlayerColor});

            paper.path(board.generateBoardBottomEdgeSVGPath({
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