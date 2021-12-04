import React, { Component } from "react";
import "./navbar.css";

const brand = window.innerWidth > 600 ? "Algorithme Dijkstra" : "Dijkstra";

class NavBar extends Component {
    state = {
        algorithm: "Algorithm Acting",
        pathState: false,
        speedState: "Speed",
    };

    selectAlgorithm(selection) {
        if (this.props.visualizingAlgorithm) {
            return;
        }
        if (
            selection === this.state.algorithm ||
            this.state.algorithm === "Acting Algorithm" ||
            this.state.algorithm === "Select an Algorithm!"
        ) {
            this.setState({ algorithm: selection });
        } else if (this.state.pathState) {
            this.setState({ algorithm: selection });
        } else {
            this.setState({ algorithm: selection });
        }
    }



    visualizeAlgorithm() {
        if (this.props.visualizingAlgorithm ) {
            return;
        }
        if (
            this.state.algorithm === "ActingAlgorithm" ||
            this.state.algorithm === "Select an Algorithm!"
        ) {
            this.setState({ algorithm: "Select an Algorithm!" });
        } else {
            this.setState({ pathState: true });
            if (this.state.algorithm === "See Dijkstra")
                this.props.visualizeDijkstra();
        }
    }


    render() {
        return (
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <a
                    className="navbar-brand h1 mb-0"
                    href="https://github.com/ingadnen/projetsfinal.git"
                >
                    {brand}
                </a>
                <div className="navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            <div className="dropdown">
                                <button
                                    className="btn btn-light dropdown-toggle"
                                    type="button"
                                    id="dropdownMenu1"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    Algorithms
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenu1">
                                    <button
                                        className="dropdown-item btn-light"
                                        type="button"
                                        onClick={() => this.selectAlgorithm("See Dijkstra")}
                                    >
                                        Dijkstra's Algorithm
                                    </button>

                                </div>
                            </div>{" "}
                        </li>
                        <li>
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={() => this.visualizeAlgorithm()}
                            >
                                {this.state.algorithm}
                            </button>
                        </li>

                    </ul>
                </div>
            </nav>
        );
    }
}
export default NavBar;
