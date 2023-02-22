import React, { useEffect, useState } from 'react';
import './GameBoard.css';


const GameBoard = (props) => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isYourTurn, setIsYourTurn] = useState(false);
  const { room, socket } = props.serverDetails;
  const [symbol, setSymbol] = useState("O");

  // Receiving information from the server
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

  // Sending information to the server
  const sendUpdatedBoard = (squares) => {
    socket.emit("send_move", {squares, room})
  }

  /**
   * Displays the correct value on a square in the game board.
   */
  const renderSquare = (index) => {
    return (
      <button className = "boardSquare" onClick={() => handleClickedSquare(index)}>
        {squares[index]}
      </button>
    );
  };

  /**
   * Handles a click on a square in the game board.
   */
  const handleClickedSquare = (index) => {
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

  /**
   * Determines the winner based on the squares array.
   * @param {Array} squares - An array of squares.
   * @returns {string|null} The symbol of the winner (X or O) or null if there is no winner.
   */
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

  /**
   * Returns a string describing the status of a square.
   * @param {number} index - The index of the square.
   * @returns {string} A string describing the status of the square.
   */
  const describeSquare = (index) => {
    if (squares[index]) {
      return `square ${index + 1} which is marked with ${squares[index]}`
    } else {
      return `square ${index + 1} which is empty`
    }
  }

  /**
   * A button component that resets the board and allows the user to play again.
   */
  const PlayAgainButton = ({ onClick }) => (
    <button 
    className="play-again-button"
    aria-label = {"Click this button to play again!"} 
    onClick={() => resetBoard()}>
      Play Again
    </button>
  );

  /**
   * Resets the board to its initial state.
   */
  const resetBoard = () => {
    setSquares(Array(9).fill(null));
    sendUpdatedBoard(Array(9).fill(null));
  };

  // Changes the status displayed according to game conditions
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

  return (
    <div>
      <header aria-live = "polite" className="status">{status}</header>
      <div className = "board">
        <div className="board-row">
            <div aria-label={describeSquare(0)}>{renderSquare(0)}</div>
            <div aria-label={describeSquare(1)}>{renderSquare(1)}</div>
            <div aria-label={describeSquare(2)}>{renderSquare(2)}</div>
        </div>
        <div className="board-row">
            <div aria-label={describeSquare(3)}>{renderSquare(3)}</div>
            <div aria-label={describeSquare(4)}>{renderSquare(4)}</div>
            <div aria-label={describeSquare(5)}>{renderSquare(5)}</div>
        </div>
        <div className="board-row">
            <div aria-label={describeSquare(6)}>{renderSquare(6)}</div>
            <div aria-label={describeSquare(7)}>{renderSquare(7)}</div>
            <div aria-label={describeSquare(8)}>{renderSquare(8)}</div>
        </div>
      </div>
      <PlayAgainButton/>
    </div>
  );
};

export default GameBoard;