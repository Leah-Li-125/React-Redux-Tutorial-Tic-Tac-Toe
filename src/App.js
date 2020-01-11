import React from 'react';
import './App.css';
import Board from './Board';

function App() {
  return (
	//3. 在UI的最高父节点调用Board component
    <div className="game">
		<div className= "game-board">
			<Board />
		</div>
		<div className= "game-info">
			<div>Game info goes here</div>
			<ol></ol>
		</div>
    </div>
  );
}

export default App;
