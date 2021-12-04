import React, { Component } from "react";
import "./App.css";
import Point from "./point";
import NavBar from "./navbar";


import {
  dijkstra,
  getPointsInShortestPathOrderDijkstra,
} from "./Algorithm/dijkstra";


const initialNum = getInitialNum(window.innerWidth, window.innerHeight);
const initialNumRows = initialNum[0];
const initialNumColumns = initialNum[1];

const startEndPoint = getStartEndPoint(initialNumRows, initialNumColumns);
const startPointRow = startEndPoint[0];
const startPointCol = startEndPoint[1];
const endPointRow = startEndPoint[2];
const endPointCol = startEndPoint[3];

class App extends Component {
  state = {
    grid: [],
    visualizingAlgorithm: false,
    width: window.innerWidth,
    height: window.innerHeight,
    numRows: initialNumRows,
    numColumns: initialNumColumns,
    speed: 0.9,
  };

  updateDimensions = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };
  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
    const grid = getInitialGrid(this.state.numRows, this.state.numColumns);
    this.setState({ grid });
  }


  animateShortestPath = (pointsInShortestPathOrder, checkedPointsInOrder) => {
    if (pointsInShortestPathOrder.length === 1)
      this.setState({ visualizingAlgorithm: false });
    for (let i = 1; i < pointsInShortestPathOrder.length; i++) {
      if (i === pointsInShortestPathOrder.length - 1) {
        setTimeout(() => {
          let newGrid = updatePointsForRender(
              this.state.grid,
              pointsInShortestPathOrder,
              checkedPointsInOrder
          );
          this.setState({ grid: newGrid, visualizingAlgorithm: false });
        }, i * (3 * this.state.speed));
        return;
      }
      let point = pointsInShortestPathOrder[i];
      setTimeout(() => {
        //shortest path point
        document.getElementById(`point-${point.row}-${point.col}`).className =
            "point point-shortest-path";
      }, i * (3 * this.state.speed));
    }
  };

  animateAlgorithm = (checkedPointsInOrder, pointsInShortestPathOrder) => {
    let newGrid = this.state.grid.slice();
    for (let row of newGrid) {
      for (let point of row) {
        let newPoint = {
          ...point,
          isChecked: false,
        };
        newGrid[point.row][point.col] = newPoint;
      }
    }
    this.setState({ grid: newGrid });
    for (let i = 1; i <= checkedPointsInOrder.length; i++) {
      let point = checkedPointsInOrder[i];
      if (i === checkedPointsInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(
              pointsInShortestPathOrder,
              checkedPointsInOrder
          );
        }, i * this.state.speed);
        return;
      }
      setTimeout(() => {
        //checked point
        document.getElementById(`point-${point.row}-${point.col}`).className =
            "point point-visited";
      }, i * this.state.speed);
    }
  };


  visualizeDijkstra() {
    if (this.state.visualizingAlgorithm ) {
      return;
    }
    this.setState({ visualizingAlgorithm: true });
    setTimeout(() => {
      const { grid } = this.state;
      const startPoint = grid[startPointRow][startPointCol];
      const endPoint = grid[endPointRow][endPointCol];
      const checkedPointsInOrder = dijkstra(grid, startPoint, endPoint);
      const pointsInShortestPathOrder = getPointsInShortestPathOrderDijkstra(
          endPoint
      );
      this.animateAlgorithm(checkedPointsInOrder, pointsInShortestPathOrder);
    }, this.state.speed);
  }



  render() {
    let { grid } = this.state;
    return (
        <React.Fragment>
          <NavBar
              visualizingAlgorithm={this.state.visualizingAlgorithm}
              visualizeDijkstra={this.visualizeDijkstra.bind(this)}
          />
          <div
              className={
                this.state.visualizingAlgorithm
                    ? "grid-see"
                    : "grid"
              }
          >
            {grid.map((row, rowId) => {
              return (
                  <div key={rowId}>
                    {row.map((point, pointId) => {
                      const {
                        row,
                        col,
                        isStart,
                        isEnd,
                        isChecked,
                        isShortest,
                      } = point;
                      return (
                          <Point
                              key={pointId}
                              row={row}
                              col={col}
                              isStart={isStart}
                              isEnd={isEnd}
                              isChecked={isChecked}
                              isShortest={isShortest}
                              width={this.state.width}
                              height={this.state.height}
                              numRows={this.state.numRows}
                              numColumns={this.state.numColumns}
                          ></Point>
                      );
                    })}
                  </div>
              );
            })}
          </div>
        </React.Fragment>
    );
  }
}

function getInitialNum(width, height) {
  let numColumns;
  if (width > 1500) {
    numColumns = Math.floor(width / 25);
  } else if (width > 1250) {
    numColumns = Math.floor(width / 22.5);
  } else if (width > 1000) {
    numColumns = Math.floor(width / 20);
  } else if (width > 750) {
    numColumns = Math.floor(width / 17.5);
  } else if (width > 500) {
    numColumns = Math.floor(width / 15);
  } else if (width > 250) {
    numColumns = Math.floor(width / 12.5);
  } else if (width > 0) {
    numColumns = Math.floor(width / 10);
  }
  let cercleWidth = Math.floor(width / numColumns);
  let numRows = Math.floor(height / cercleWidth);
  return [numRows, numColumns];
}

function getRandomNums(num) {
  let randomNums1 = [];
  let temp = 2;
  for (let i = 5; i < num / 2; i += 2) {
    randomNums1.push(temp);
    temp += 2;
  }
  let randomNums2 = [];
  temp = -2;
  for (let i = num / 2; i < num - 5; i += 2) {
    randomNums2.push(temp);
    temp -= 2;
  }
  return [randomNums1, randomNums2];
}

function getStartEndPoint(numRows, numColumns) {
  let randomNums;
  let x;
  let y;
  let startPointRow;
  let startPointCol;
  let endPointRow;
  let endPointCol;
  if (numRows < numColumns) {
    randomNums = getRandomNums(numRows);
    x = Math.floor(numRows / 2);
    y = Math.floor(numColumns / 4);
    if (x % 2 !== 0) x -= 1;
    if (y % 2 !== 0) y += 1;
    startPointRow =
        x + randomNums[1][Math.floor(Math.random() * randomNums[1].length)];
    startPointCol = y + [-6, -4, -2, 0][Math.floor(Math.random() * 4)];
    endPointRow =
        x + randomNums[0][Math.floor(Math.random() * randomNums[0].length)];
    endPointCol =
        numColumns - y + [0, 2, 4, 6][Math.floor(Math.random() * 4)];
  } else {
    randomNums = getRandomNums(numColumns);
    x = Math.floor(numRows / 4);
    y = Math.floor(numColumns / 2);
    if (x % 2 !== 0) x -= 1;
    if (y % 2 !== 0) y += 1;
    startPointRow = x + [-6, -4, -2, 0][Math.floor(Math.random() * 4)];
    startPointCol =
        y + randomNums[1][Math.floor(Math.random() * randomNums[1].length)];
    endPointRow = numRows - x + [0, 2, 4, 6][Math.floor(Math.random() * 4)];
    endPointCol =
        y + randomNums[0][Math.floor(Math.random() * randomNums[0].length)];
  }
  return [startPointRow, startPointCol, endPointRow, endPointCol];
}

const getInitialGrid = (numRows, numColumns) => {
  let grid = [];
  for (let row = 0; row < numRows; row++) {
    let currentRow = [];
    for (let col = 0; col < numColumns; col++) {
      currentRow.push(createPoint(row, col));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createPoint = (row, col) => {
  return {
    row,
    col,
    isStart: row === startPointRow && col === startPointCol,
    isEnd: row === endPointRow && col === endPointCol,
    distance: Infinity,
    totalDistance: Infinity,
    isChecked: false,
    isShortest: false,
    previousPoint: null,
  };
};

const updatePointsForRender = (
    grid,
    pointsInShortestPathOrder,
    checkedPointsInOrder
) => {
  let newGrid = grid.slice();
  for (let point of checkedPointsInOrder) {
    if (
        (point.row === startPointRow && point.col === startPointCol) ||
        (point.row === endPointRow && point.col === endPointCol)
    )
      continue;
    let newPoint = {
      ...point,
      isChecked: true,
    };
    newGrid[point.row][point.col] = newPoint;
  }
  for (let point of pointsInShortestPathOrder) {
    if (point.row === endPointRow && point.col === endPointCol) {
      return newGrid;
    }
    let newPoint = {
      ...point,
      isChecked: false,
      isShortest: true,
    };
    newGrid[point.row][point.col] = newPoint;
  }
};


export default App;

