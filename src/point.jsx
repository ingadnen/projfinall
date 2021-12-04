import React, { Component } from "react";
import "./point.css";

class Point extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {
            row,
            col,
            isStart,
            isEnd,
            isChecked,
            isShortest,
            width,
            height,
            numRows,
            numColumns,
        } = this.props;

        const extraClass = isStart
            ? "point point-start"
            : isEnd
                ? "point point-end"
                    : isShortest
                        ? "point point-shortest-path"
                        : isChecked
                            ? "point point-checked"
                            : "point";

        let cercleWidth = Math.floor((width - 15) / numColumns);
        let cercleHeight;
        if (width > 1500) {
            cercleHeight = Math.floor((height - 70) / numRows);
        } else if (width > 1000) {
            cercleHeight = Math.floor((height - 70) / numRows);
        } else if (width > 500) {
            cercleHeight = Math.floor((height - 60) / numRows);
        } else if (width > 0) {
            cercleHeight = Math.floor((height - 50) / numRows);
        }

        return (
            <div
                id={`point-${row}-${col}`}
                className={`${extraClass}`}
                style={{ "--width": `${cercleWidth}px`, "--height": `${cercleHeight}px` }}
            ></div>
        );
    }
}

export default Point;
