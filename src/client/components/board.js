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

    const buildSVGPathString = (vertices) => vertices.map(([x, y]) => `L${x} ${y}`).join('');

    return {
        generateHexagonSVGPath(startX, startY) {
            const hexString = `M${startX} ${startY + edgeSize/2}`;
            const vertices = [
                bottomLeft(startX, startY),
                bottomCenter(startX, startY),
                bottomRight(startX, startY),
                topRight(startX, startY),
                topCenter(startX, startY),
                topLeft(startX, startY)
            ];
            return hexString + buildSVGPathString(vertices);
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
    
    _buildSVGPathString(vertices) {
        return vertices.map(([x, y]) => `L${x} ${y}`).join('');
    }

    _generateHexagonSVGPath({startX, startY}, edgeSize) {
        return hexBoardSVG(this.boardSize, edgeSize).generateHexagonSVGPath(startX, startY);
    }

    _generateBoardLeftEdgeSVGPath({startX, startY}, edgeSize) {
        let shapeString = `M${startX} ${startY}`;
        const vertices = [
            [startX + this.hexWidth / 2, startY + edgeSize/2],
            [startX + this.hexWidth / 2, startY + 3/2 * edgeSize],
            [startX, startY]
        ];
        return shapeString + this._buildSVGPathString(vertices);
    }

    _generateBoardRightEdgeSVGPath({startX, startY}, edgeSize) {
        let shapeString = `M${startX} ${startY}`;
        const vertices = [
            [startX, startY + edgeSize],
            [startX + this.hexWidth / 2, startY + 3/2 * edgeSize],
            [startX, startY]
        ];
        return shapeString + this._buildSVGPathString(vertices);
    }

    _generateBoardTopEdgeSVGPath({startX, startY}, edgeSize) {
        let shapeString = `M${startX} ${startY}`;
        const vertices = [
            [startX + this.hexWidth / 2, startY + edgeSize/2],
            [startX + this.hexWidth, startY],
            [startX, startY]
        ];
        return shapeString + this._buildSVGPathString(vertices);
    }

    _generateBoardBottomEdgeSVGPath({startX, startY}, edgeSize) {
        let shapeString = `M${startX} ${startY}`;
        const vertices = [
            [startX + this.hexWidth, startY],
            [startX + this.hexWidth/2, startY - edgeSize/2],
            [startX, startY]
        ];
        return shapeString + this._buildSVGPathString(vertices);
    }

    componentDidMount() {
        const paper = new Raphael(document.getElementById('board'), 1000, 1000);

        const redPlayerColor = '#fd0006';
        const bluePlayerColor = '#1533ad';

        const start = this.start;

        for (let i=0; i < this.boardSize; i++) {
            for (let j=0; j < this.boardSize; j++) {
                const tile = paper.path(this._generateHexagonSVGPath({
                    startX: start.startX + (this.hexWidth * j) + (this.hexWidth/2 * i),
                    startY: start.startY + (3/2 * this.edgeSize * i)
                }, this.edgeSize)).attr({fill: '#fff'});
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
            const bottomStartY = start.startY + 3/2 * this.edgeSize * this.boardSize + this.edgeSize/2;

            const rightStart = start.startX + this.boardSize * this.hexWidth;
            const rightStartY = start.startY + this.edgeSize / 2;

            paper.path(this._generateBoardLeftEdgeSVGPath({
                startX: start.startX + this.hexWidth / 2 * (i - 1),
                startY: start.startY + 3/2 * this.edgeSize * i
            }, this.edgeSize)).attr({fill: redPlayerColor});

            paper.path(this._generateBoardRightEdgeSVGPath({
                startX: rightStart + (this.hexWidth/2 * (i - 1)),
                startY: rightStartY + (i - 1) * 3/2 * this.edgeSize
            }, this.edgeSize)).attr({fill: redPlayerColor});

            paper.path(this._generateBoardTopEdgeSVGPath({
                startX: topStartX + (i - 1) * this.hexWidth,
                startY: start.startY
            }, this.edgeSize)).attr({fill: bluePlayerColor});

            paper.path(this._generateBoardBottomEdgeSVGPath({
                startX: bottomStartX + (i-1) * Math.sqrt(3) * this.edgeSize,
                startY: bottomStartY
            }, this.edgeSize)).attr({fill: bluePlayerColor});
        }
    }

    render() {
        return <div>
            <div id="board"/>
        </div>
    }

}