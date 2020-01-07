import React from 'react';
import Square from './Square';

class Board extends React.Component {
    renderSquare = (i) => {
        return(
                <Square
                    value={this.props.squares[i]}
                    isBackground={this.props.winnerIndex.indexOf(i)!==-1}
                    onClick={() => this.props.onClick(i)}
                />
        )
    };

    renderBoard = (n) => {
        let squares = [];
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                squares.push(
                    this.renderSquare(n * j + i)
                )
            }
            squares.push(<div className="board-row"> </div>)
        }
        return squares
    };

    render() {
        return (
            <div>
                    {this.renderBoard(3)}
            </div>
        );

    }
}

  export default Board


