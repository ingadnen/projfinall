export function dijkstra(grid, startPoint, endPoint) {
    if (!startPoint || !endPoint || startPoint === endPoint) {
        return false;
    }
    startPoint.distance = 0;
    let uncheckedPoints = getPoints(grid);
    let checkedPointsInOrder = [];
    while (uncheckedPoints.length !== 0) {
        uncheckedPoints.sort((a, b) => a.distance - b.distance);
        let nearestPoint = uncheckedPoints.shift();
        if (nearestPoint.distance === Infinity) return checkedPointsInOrder;
        if (nearestPoint === endPoint) return checkedPointsInOrder;
        nearestPoint.isChecked = true;
        checkedPointsInOrder.push(nearestPoint);
        updateUncheckedNeighbours(nearestPoint, grid);
    }
}

function getPoints(grid) {
    let points = [];
    for (let row of grid) {
        for (let point of row) {
            points.push(point);
        }
    }
    return points;
}

function updateUncheckedNeighbours(point, grid) {
    let uncheckedNeighbours = getUncheckedNeighbours(point, grid);
    for (let uncheckedNeighbour of uncheckedNeighbours) {
        uncheckedNeighbour.distance = point.distance + 1;
        uncheckedNeighbour.previousPoint = point;
    }
}

function getUncheckedNeighbours(point, grid) {
    let neighbours = [];
    let { row, col } = point;
    if (row !== 0) neighbours.push(grid[row - 1][col]);
    if (col !== grid[0].length - 1) neighbours.push(grid[row][col + 1]);
    if (row !== grid.length - 1) neighbours.push(grid[row + 1][col]);
    if (col !== 0) neighbours.push(grid[row][col - 1]);
    return neighbours
        .filter((neighbour) => !neighbour.isChecked);
}

export function getPointsInShortestPathOrderDijkstra(endPoint) {
    let pointsInShortestPathOrder = [];
    let currentPoint = endPoint;
    while (currentPoint !== null) {
        pointsInShortestPathOrder.unshift(currentPoint);
        currentPoint = currentPoint.previousPoint;
    }
    return pointsInShortestPathOrder;
}
