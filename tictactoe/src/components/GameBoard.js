import React, { useEffect, useState } from 'react';
import './GameBoard.css';


const GameBoard = (props) => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isYourTurn, setIsYourTurn] = useState(false);
  const { room, socket } = props.serverDetails;
  const [symbol, setSymbol] = useState("O");

  useEffect( () => {
    socket.on("receive_move", (data) => {
      console.log("client received reply:")
      setSquares(data.squares);
      setIsYourTurn(true);
    });

    socket.on("assignSymbol", (data) => {
      console.log("client received symbol:")
      setSymbol(data.symbol);
      if (data.symbol === 'X') {
        setIsYourTurn(true);
      }
    });
  }, [socket]);

  const sendUpdatedBoard = (squares) => {
    socket.emit("send_move", {squares, room})
  }

  const handleClick = (index) => {
    const newSquares = [...squares];
    if (newSquares[index] || determineWinner(newSquares) || !isYourTurn) {
      return;
    }
    // fill square with X or O respectively, then update squares
    newSquares[index] = symbol;
    setSquares(newSquares);
    setIsYourTurn(false);
    sendUpdatedBoard(newSquares);
  };

  const renderSquare = (index) => {
    return (
      <Square className="square"
        value={squares[index]}
        onClick={() => handleClick(index)}
      />
    );
  };

  const determineWinner = (squares) => {
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
    return null;
  };

  const winner = determineWinner(squares);
  let status;
  if (winner) {
    if (winner === symbol) {
        status = 'You win!';
    } else {
        status = 'You lose!';
    }
  } else {
    if (isYourTurn) {
        status = 'Your turn!';
    } else {
        status = 'Opponent\'s turn!';
    }
  }

  const resetBoard = () => {
    setSquares(Array(9).fill(null));
    sendUpdatedBoard(Array(9).fill(null));
  };

  const PlayAgainButton = ({ onClick }) => (
    <button 
    className="play-again-button"
    aria-label = {"Click this button to play again!"} 
    onClick={() => resetBoard()}>
      Play Again
    </button>
  );

  return (
    <div>
      <div aria-live = "polite" className="status">{status}</div>
      <div className = "board">
        <div className="board-row">
            <div aria-label={`square 1 with value ${squares[0]}`}>{renderSquare(0)}</div>
            <div aria-label={`square 2 with value ${squares[1]}`}>{renderSquare(1)}</div>
            <div aria-label={`square 3 with value ${squares[2]}`}>{renderSquare(2)}</div>
        </div>
        <div className="board-row">
            <div aria-label={`square 4 with value ${squares[3]}`}>{renderSquare(3)}</div>
            <div aria-label={`square 5 with value ${squares[4]}`}>{renderSquare(4)}</div>
            <div aria-label={`square 6 with value ${squares[5]}`}>{renderSquare(5)}</div>
        </div>
        <div className="board-row">
            <div aria-label={`square 7 with value ${squares[6]}`}>{renderSquare(6)}</div>
            <div aria-label={`square 8 with value ${squares[7]}`}>{renderSquare(7)}</div>
            <div aria-label={`square 9 with value ${squares[8]}`}>{renderSquare(8)}</div>
        </div>
      </div>
      <PlayAgainButton/>
    </div>
  );
};

const Square = ({ value, onClick }) => (
  <button className="square" onClick={onClick}>
    {value}
  </button>
);

export default GameBoard;