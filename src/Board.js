import React from "react";

function Square(props) {
    return (
        /*gives different colors to X and O*/
        <button className="square" style={{background: props.color}}  onClick={props.onClick}>
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

    renderSquare(i,color) {
        return (
            <Square
                value={this.state.squares[i]}
                color={color}
                onClick={() => this.handleClick(i)}
            />
        );
    }

    createBoxes = () => {
        let boxes = []
        let num = 0;

        let startingBoxes = [1,4,10,13];

        //0=white, 1=red, 2=yellow
        for (let y = 0; y < 15; y++) {
            let children = []
            for (let x = 0; x < 15; x++, num++) {
                if (startingBoxes.includes(x) && startingBoxes.includes(y)) {
                    children.push(this.renderSquare(num,"white"))
                }
                else if (x<6 && y<6) {
                    children.push(this.renderSquare(num,"red"))
                }
                else if (x>8 && y<6){
                    children.push(this.renderSquare(num,"yellow"))
                }
                else
                    children.push(this.renderSquare(num,"white"))
            }
            boxes.push(<div className="board-row">{children}</div>)
            //document.getElementById(1);
            //document.getElementById('square').style.color = 'tomato';
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