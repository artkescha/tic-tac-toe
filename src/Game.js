import React from 'react';
import Board from './Board';
import './css/index.css';

class Game extends React.Component {
    state = {
        history: [{
                        squares: Array(9).fill(null),
                    }],
        IsNext: true,
        stepNumber: 0
    };

    handleClick=(i) => {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (this.calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    };

    calculateWinner = (squares) => {
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
                return {winner:squares[a], index:[a, b, c]};
            }
        }
        return null;
    };

isWar = (squares) => {
    return squares.every((element, index, array) => element!=null)
};

restart = () => {
    this.setState({
        history: [{
            squares: Array(9).fill(null),
        }],
        xIsNext: true,
        stepNumber: 0

    });
};


renderHistory =  () => {
    const history = this.state.history.slice(1, this.state.history.length);
    return(
    history.map((n, i) =>
        <div>
        <button key={i} onClick={()=> {this.jumpToStep(i)}}>
            {'Back to step ' + (i+1)}
        </button>
        </div>
    ))
};

jumpToStep = (step) => {
    this.setState( {
        history: this.state.history,
        stepNumber: step,
        xIsNext: (step % 2) === 0,
        })
};

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = this.calculateWinner(current.squares);
        const isWar = this.isWar(current.squares);
        const gameIsOver  = winner || isWar
        let status;
        winner ? status ='Game is over! Winner is ' + (this.state.xIsNext ? 'O' : 'X') :
            status = 'Next player: '+ (this.state.xIsNext ? 'X' : 'O');
        if (!winner && isWar){
            status ='is Draw X and O'
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        winnerIndex={(winner) ? winner.index: []}
                        onClick={this.handleClick}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    {
                        (gameIsOver) ?
                         <div className="restart">
                            <button className="again" onClick={this.restart}>
                                {'Restart Game'}
                             </button>
                         </div>: null
                    }

                    {
                        (!gameIsOver) ?
                            <div className="history">
                                {'Game history:'}
                                {this.renderHistory()}
                            </div> : null
                    }
                </div>
            </div>
        );
    }

}

export default Game;