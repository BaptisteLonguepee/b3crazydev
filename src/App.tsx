import React from 'react';
import './App.css';
import PhaserGame from './PhaserGame/PhaserGame';

function App() {
  return (
      <div className="App">
        <header className="App-header">
          <p>React + Phaser Demo with TypeScript</p>
          <PhaserGame />
        </header>
      </div>
  );
}

export default App;
