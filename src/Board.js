import React from 'react';
import Square from './Square';

//0. 这个class render了一个div，这个div下面有四个div，第一个是它的status，其他三个就是它三个squares组成的一个row，共三个row div

class Board extends React.Component {
    // 2.1 在class定义一个renderSquare（）的funciton，使Square这个component可以被返回
    renderSquare(index) {
		/*4.2 在使用Square component的地方定义Square props里的value，如下：value={}
		
		{}里的内容就是你要传的value的内容。这里就是给renderSquare（）传一个参数index，把index的值赋给value
		
		每一个functional componenet都能接受无数个参数，就如value={}这样传入。然后这些参数汇总起来，就是一个props object，被传入funcitonal component，比如这里的Square component
		*/

		// return <Square />;
		return <Square value={index} />
    }

    render() {
        const status = 'next player: X';//1.1新建一个status变量
        return (
        //1.2 调用上面新建的变量status
		// 2.2 以下，function call expression，调用renderSquare（），来在board-row这个div里显示出三个squares，总共显示三行board-row。
		// 4.3 在下方调用renderSquare（）时传入参数，从而把不同的值赋给9个Square components
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
export default Board;