import React from "react";

function Square(props) {
    return (
        //<button className="square" data-pro={props.value} onClick={props.onClick}> gives different colors to X and O
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

function RedSquare(props) {
    return (
        //<button className="square" data-pro={props.value} onClick={props.onClick}> gives different colors to X and O
        <button className="redSquare" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

function YellowSquare(props) {
    return (
        //<button className="square" data-pro={props.value} onClick={props.onClick}> gives different colors to X and O
        <button className="yellowSquare" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        };
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }

    renderSquare(i) {
        return (
            <Square
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
            />
        );
    }

    renderRedSquare(i) {
        return (
            <RedSquare
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
            />
        );
    }

    renderYellowSquare(i) {
        return (
            <YellowSquare
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
            />
        );
    }


    createBoxes = () => {
        let boxes = []
        let num = 0;

        let startingBoxesX = [1,4,10,13];
        let startingBoxesY = [1,4,10,13];

        for (let y = 0; y < 15; y++) {
            let children = []
            for (let x = 0; x < 15; x++, num++) {
                if (startingBoxesX.includes(x) && startingBoxesY.includes(y)) {
                    children.push(this.renderSquare(num))
                }
                else if (x<6 && y<6) {
                    children.push(this.renderRedSquare(num))
                }
                else if (x>8 && y<6){
                    children.push(this.renderYellowSquare(num))
                }
                else
                    children.push(this.renderSquare(num))
            }
            boxes.push(<div className="board-row">{children}</div>)
        }
        return boxes
    }

    render() {
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div>
                <div className="status">{status}</div>
                {this.createBoxes()}
            </div>
        );
    }
}

function calculateWinner(squares) {
    /*
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
     */
    return null;
}

export default Board;