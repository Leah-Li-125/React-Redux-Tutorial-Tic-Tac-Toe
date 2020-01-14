/*
Step1 2 3: setup
0. 这个class render了一个div，这个div下面有四个div，第一个是它的status，其他三个就是它三个squares组成的一个row，共三个row div
1.1 在render（）里新建一个status变量：
1.2 调用上面新建的变量status：
2.0 新建Square.js，在里面新建一个comp：Square，让它作为一个button，上面可以显示静态的S（见Square.js头部）
2.1 在class定义一个renderSquare（）的funciton，使Square这个component可以被返回：
2.2 function call expression，调用renderSquare（），来在board-row这个div里显示出三个squares，总共显示三行board-row。
  class Board extends React.Component {
    renderSquare() {                              //2.1
      return <Square />
    }
    render() {
      const status = 'Next player: X';    //1.1
      return （
      <div>
        <div className="status">{status}</div>    //1.2
        <div className="board-row">
          {this.renderSquare(0)}                  //2.2
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
      )
    }
  }
(然后转到App.js，step3)
*/

/*
4.1（cont'd） 
在使用Square component的地方定义Square props里的value，如下：value={}
{}里的内容就是你要传的value的内容。这里就是给renderSquare（）传一个参数index，把index的值赋给value
每一个functional componenet都能接受无数个参数，就如value={}这样传入。
然后这些参数汇总起来，就是一个props object，被传入funcitonal component，比如这里的Square component
    renderSquare(index) {
      return <Square value={index} />             //4.1
    }	
4.2 在其下方render（）里调用renderSquare（）时传入参数，从而把不同的值赋给9个Square components9 （代码和上方2.2一样）
*/

/*
！！！step1-4: Board.js 最终代码如下：！！！

import React from 'react';
import Square from './Square';

  class Board extends React.Component {
    renderSquare(index) {
      return <Square value={index} />        
    }	
    render() {
      const status = 'Next player: X';
      return (
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
      )
    }
  }
export default Board;

*/
import React from 'react';
import Square from './Square';

  class Board extends React.Component {
    renderSquare(index) {
      return <Square value={index} />        
    }	
    render() {
      const status = 'Next player: X';
      return (
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
      )
    }
  }
export default Board;