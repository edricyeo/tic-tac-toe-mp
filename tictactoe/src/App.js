import React, { useState } from 'react'
import './App.css';

function App() {
  const [room, setRoom] = useState('');

  const enterRoom = () => {}

  return (
    <div className="App">
      <div className = "joinRoom">
            <input placeholder='Enter Room Number' 
            onChange={(event)=>{
                setRoom(event.target.value);
            }}/>
            <button onClick={enterRoom}> Join Room </button>
      </div>
    </div>
  );
}

export default App;
