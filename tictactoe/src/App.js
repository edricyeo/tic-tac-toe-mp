import React, { useState, useEffect } from 'react'
import './App.css';
import GameBoard from './components/GameBoard';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3001');

function App() {
  const [room, setRoom] = useState('');

  useEffect(() => {
    document.title = "Tic Tac Toe";
  }, []);

  const enterRoom = () => {
    if (room !== "") {
        socket.emit("join_room", room);
    }
  }

  return (
    <div className="App">
      <div className = "join-room" aria-label = 'Component to allow players to join the same room'>
            <input 
            type = "text" 
            placeholder = 'Room Number'
            aria-label='An input field for the Room Number'
            onChange={(event)=>{
                setRoom(event.target.value);
            }}/>
            <button className="join-room-button" onClick={enterRoom}> Join Room </button>
      </div>
      <GameBoard serverDetails = {{room, socket}}/>
    </div>
  );
}

export default App;
