import React from 'react';
import './App.css';
import Board from './Board';

//3. 在UI的最高父节点调用Board component。这样就setup好了。现在去Squarejs进行下一个step。
function App() {
  return (
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
