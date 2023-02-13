import React, { useState } from 'react'
import './App.css';
import GameBoard from './components/GameBoard';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3001');

function App() {
  const [room, setRoom] = useState('');

  const enterRoom = () => {
    if (room !== "") {
        socket.emit("join_room", room);
    }
  }

  return (
    <div className="App">
      <div className = "joinRoom">
            <input placeholder='Enter Room Number' 
            onChange={(event)=>{
                setRoom(event.target.value);
            }}/>
            <button onClick={enterRoom}> Join Room </button>
      </div>
      <GameBoard serverDetails = {{room, socket}}/>
    </div>
  );
}

export default App;
