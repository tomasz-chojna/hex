import {hexBoardSVG} from '../../../src/client/helpers/board-svg'
import {expect} from 'chai';

describe('GameBoardComponent', () => {
    const boardSize = 11;
    const edgeSize = 25;

    const startPoint = {startX: 10, startY: 10};

    const hexWidth = edgeSize * Math.sqrt(3);

    const topLeft = [startPoint.startX, startPoint.startY + edgeSize/2];
    const topCenter = [startPoint.startX + hexWidth/2, startPoint.startY];
    const topRight = [startPoint.startX + hexWidth, startPoint.startY + edgeSize/2];

    const bottomLeft = [startPoint.startX, startPoint.startY + 3/2 * edgeSize];
    const bottomCenter = [startPoint.startX + hexWidth/2, startPoint.startY + 2 * edgeSize];
    const bottomRight = [startPoint.startX + hexWidth, startPoint.startY + 3/2 * edgeSize];

    const board = hexBoardSVG(boardSize, edgeSize);

    it('should render hexagon - svg path string', () => {
        const vertices = [
            bottomLeft,
            bottomCenter,
            bottomRight,
            topRight,
            topCenter,
            topLeft
        ];

        const svgPath = board.hexagon(startPoint);

        expect(svgPath).to.be.equal(`M${topLeft[0]} ${topLeft[1]}` + vertices.map(vertex => {
            const [x, y] = vertex;
            return `L${x} ${y}`;
        }).join(''));
    });

    it('should render left board edge - svg path', () => {
        const vertices = [
            topRight,
            bottomRight,
            topCenter
        ];

        const svgPath = board.leftEdge(startPoint);

        expect(svgPath).to.be.equal(
            `M${topCenter[0]} ${topCenter[1]}` + vertices.map(vertex => {
                const [x, y] = vertex;
                return `L${x} ${y}`;
            }).join('')
        );
    });

    it('should render right board edge - svg path', () => {
        const vertices = [
            bottomLeft,
            bottomCenter,
            topLeft
        ];

        const svgPath = board.rightEdge(startPoint);

        expect(svgPath).to.be.equal(
            `M${topLeft[0]} ${topLeft[1]}` + vertices.map(vertex => {
                const [x, y] = vertex;
                return `L${x} ${y}`;
            }).join('')
        );
    });

    it('should render top board edge - svg path', () => {
        const vertices = [
            bottomCenter,
            bottomRight,
            bottomLeft
        ];

        const svgPath = board.topEdge(startPoint);

        expect(svgPath).to.be.equal(
            `M${bottomLeft[0]} ${bottomLeft[1]}` + vertices.map(vertex => {
                const [x, y] = vertex;
                return `L${x} ${y}`;
            }).join('')
        );
    });

    it('should render bottom board edge - svg path', () => {
        const vertices = [
            topCenter,
            topRight,
            topLeft
        ];

        const svgPath = board.bottomEdge(startPoint);

        expect(svgPath).to.be.equal(
            `M${topLeft[0]} ${topLeft[1]}` + vertices.map(vertex => {
                const [x, y] = vertex;
                return `L${x} ${y}`;
            }).join('')
        );
    });

});