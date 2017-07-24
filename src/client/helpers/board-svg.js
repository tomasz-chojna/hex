export function hexBoardSVG(boardSize, edgeSize) {
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
        return moveToSVG(startFrom(startX, startY)) + points.map((vertex) => lineToSVG(vertex(startX, startY))).join('');
    };

    return {
        hexagon({startX, startY}) {
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

        leftEdge({startX, startY}) {
            const vertices = [
                topCenter,
                topRight,
                bottomRight,
                topCenter
            ];
            return buildSVGPathString(vertices, {startX, startY});
        },

        rightEdge({startX, startY}) {
            const vertices = [
                topLeft,
                bottomLeft,
                bottomCenter,
                topLeft
            ];
            return buildSVGPathString(vertices, {startX, startY});
        },

        topEdge({startX, startY}) {
            const vertices = [
                bottomLeft,
                bottomCenter,
                bottomRight,
                bottomLeft
            ];
            return buildSVGPathString(vertices, {startX, startY});
        },

        bottomEdge({startX, startY}) {
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