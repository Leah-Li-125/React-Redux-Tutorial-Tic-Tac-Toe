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
      return （
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
      )
    }
  }
export default Board;

*/

/*
Step 9: lift state up (cont'd)

9.1 给Class Board初始化State：用constructor
其中this.state是子级Square的9个格子的state集，所以应该是一个9个空值的数组：
    constructor(props) {
      super(props);  
      this.state = {
            squares: Array(9).fill(null)       //9.1
        };
    }
9.2 那如何把这个在父级初始化的state传到子级Square comp上面呢？

（回到Square.js继续...）

9.3 那我们现在这里的Square的value要传什么进去呢？
因为我们把Square的state都存在了squares这个数组里了，
那我们就用this.state.squares[index]来取每一个square的state：
  renderSquare(index) {
    return <Square value={this.state.squares[index]} />       //9.3 
  }	

（回到Square.js继续...9.4）

9.4 （cont'd）
这里要注意：要改Board的state，首先不能在除了initialize state的地方，更改state的值
所以需要先浅拷贝squares这个存state初始值的array，
由于这个array里面要存的每一个item都是一个string：‘’ 或者 ‘X’
string是parameters type，还有number或者null，
浅拷贝深拷贝对parameters type items来说没有什么区别，都是完整的拷贝了一个新的item。

这样浅拷贝后的squares，就不是一个state了，那么就可以用拷贝的squares[i] = 'X'的方法来改变它的值了，
然后再把浅拷贝的squares这个array直接传到setState里，那就代表我这个新的squares的数组，会把之前的squares的数组替换掉，
  this.setState({ squares })
这样就达成了通过点击改变Board里state数组的任务。现在Board里每一个Square的state都从‘’变成了‘X’。代码如下：
  handleClick = (i) => {
      const squares = [...this.state.squares];            //9.4 浅拷贝过了，所以下方是可以改它的state
      squares[i] = 'X';
      this.setState({ squares })
  }
这里要留心：如果，我们的array里放的不是parameters type的items，而是objects，就不可以通过浅拷贝的方法来改里面的值，
因为它拷贝过来的object指向的还是原来作为state的squares，而不是拷贝后的squares，
那如果还像刚刚改parameters type那样浅拷贝然后更改，就相当于还是改了原state的值，就是不可以的！
那要怎么办呢？需要把浅拷贝后的array里的object再拷贝一次，才能如上面的方法去改里面的值。

9.5
那么现在我把handleClick（）这个function写好了，但是写在了父级Board，但却需要在子级Square里运行，
也就是我点击Square comp时，如何运行Board里的function呢？
我们可以在renderSquare（）这个function里把刚刚的那个handleClick（）作为一个props传过去：
  renderSquare(index) {
      return <Square value={this.state.squares[index]} handleClick={this.handleClick} />        
  }
这里可见，props可以为任何东西，数值也好，funciton也好，object也好，都可以传。
这里我们就是个Square传了一个叫做handleClick的prop，这个prop的内容就是Board里的handleClick function

那么我们怎么去Square里使用这个传过来的funciton呢？（回到Square.js继续...9.6）

9.6（cont'd）解决如何把传过去的function所需要的index也传过去：
我们可以把index作为另一个prop传过去,如下：
  renderSquare(index) {
      return <Square index={index} value={this.state.squares[index]} handleClick={this.handleClick} />        
  }
但更好的办法，是用closure这个概念来解决：
closure就是，一个function可以access他被定义时候的scope。
演示一下：
我们在这里是名为handleClick这个prop需要一个有index为参数的function，
那我就在定义这个prop的时候，给它一个有参数的function，
现造一个有参数传入的function给它，这样就能保证它的scope:
  renderSquare(index) {
      return <Square value={this.state.squares[index]} handleClick={()=>this.handleClick(index)} />        //9.6
  }
因为closure就是，一个function可以access他被定义时候的scope，那么这个现造的function定义的地方就在renderSquare()里，
而这个renderSquare（）的scope里是有index传入的。
所以这个现造的function在定义的时候，是可以access到index的！
不同的index都会通过renderSquare传给它里面的handleClick，这就是closure的作用！
那么他被传到Square comp里时，点击就会运行这个名为handleClick的function。（回到Square.js继续...9.6）
*/

/*
Step 11: Take turns
11.1 
这里可以在initial state里，用一个true/false的flag，来代表下一个是不是X：
  constructor(props) {
    super(props);

    this.state = {
      squares: Array(9).fill(null),
      isXNext: true                     //11.1
    };
  }

11.2
然后，用这个判断T/F的state，将在点击的时候进行判断，
11.2.1
首先就是在handleClick function里改变array squares里每一个index的值，不能只是变为X,
而是应该在这里检查this.state.isXNext: 
如果下一个是X的话，state改为X，否则改为O
11.2.2
同时要将其setState里的状态取反：就是将下方的this.setState()里添加与上面相反的判断：
isXNext: !this.state.isXNext 
还有就是setState是异步函数，所以需要加上一个state的参数在前面，
来将上一次的state传入function，然后function返回的是个object，这个object就是下个state
同时养成好习惯：
用setState就传个function进去，然后用function给你的state来改，也就是不用再用this.state了。
完整代码更改如下：
没改前：
  squares[index] = 'X';
  this.setState({ squares });
改之后：
	squares[index] = this.state.isXNext ? 'X' : 'O';            //11.2.1
  this.setState(state => ({
    isXNext: !state.isXNext,                                  //11.2.2
    squares,
  }));

11.3
接下来还有个需要改进的地方：Next player不能一直是个静态的X，
也应该Square下一个显示X的时候，显示下个player也为X
就在render（）下面，把status改为用isXNext做判断
这里需要用ES6里的string literal，如下：
${this.state.isXNext ? 'X' : 'O'}
注意：这里${}里可以是任何可以运行的东西，如function call，variable，expression..
如上面这一段${}里的表达式，会被替换成它运行完（这里就是判断后）输出的内容（这里就是X或O）。
这一部分整体代码如下：
  const status = `Next player: ${this.state.isXNext ? 'X' : 'O'}`;       //11.3

11.4
上面的代码完成后去测试没有问题，
但是发现当你点击同一个Square两次时，
它会继续改，这是不对的，应该只显示第一次点击后改的state，
怎么办？
应该去handleClick（）里，做任何的操作之前做一个判断：
如果squares[index]里已经有值了，就直接返回，不再执行下面有关state更改的任何操作。
这里注意有一个best practice：
就是不要把一堆判断全部放在if后面的condition里，太复杂很难明白。
建议在if之前，可以创建一个const canClick = !this.state.squares[i],
这代表只有当它没有值的时候才可以点击，逻辑就很清楚：
const canClick = !this.state.squares[i];
if(canClick) {
  才能执行接下来的所有操作，否则直接返回。
}
改后的这部分代码如下：
  handleClick = (index) => {
    const canClick = !this.state.squares[index];  
    if(canClick) {                                   //11.4
      const squares = [...this.state.squares];            
      squares[index] = this.state.isXNext ? 'X' : 'O';
      this.setState(state => ({
          squares,
          isXNext: !state.isXNext
      }));
    };
  }
也可以写成,这样return后面的也不会运行：
  if (!canClick) return;                             //11.4
  const squares = [...this.state.squares];            
  squares[index] = this.state.isXNext ? 'X' : 'O';
  this.setState(state => ({
      squares,
      isXNext: !state.isXNext
  }));
然后去测试，就不存在刚刚那个再点击又改变state的问题了
*/

/*
Step12: winner
现在我们很接近完成了，我们还需要进行winner的判断。
react tutorial给我们提供了一个calculate winner的function，
我们可以直接拿来用，直接copy到Board.js里最下方的位置，export defalt Board之后。
正常情况不能这么直接写在Board comp的js里，而是应该新建一个helper的文件夹，来放类似这样的functions
这些functions可以和comps没有任何的关系，他们只是些utility functions
像这里，它就可以帮忙计算winner，但不一定要放在comp里面。
这里为了方便，就放在这个comp后面了。
那我们要在哪里使用这个function呢？
在Board comp里，每次点击的时候，使用这个function进行winner计算：
先看看这个function做的是什么：他返回的要么是null，要么返回的是squares array里某一个index的值，
如果返回null，说明没有winner；如果返回的是某个值的话，说明返回的那个X或O是winner。
所以我们在handleClick（）的时候，每一次点击我们都要检查一下，有没有人赢了。
那我就直接创建一个varibale const winner 
然后call这个calculate winner的functionn,并同时把现在Board comp上的状态this.state.squares作为参数传进去,
这样它就会计算，当我点击这个Square的时候，有没有winner：
const winner = !!calculateWinner(this.state.squares)
但这里有个tricky的问题：到底应该是点击之前设置winner还是点之后？
这里涉及下一步要讲的lifecycle问题，
所以我们暂时先把它设为点击之前计算winner。
并且将winner的返回结果（null 或者 squares里某个index的state值）放入if判断里，如下：
  if (!canClick || winner) return;  
但这里觉得canClick的语义不够准确，改为：
  const hasValue = !!this.state.squares[i];
这里两次取反，是因为要把this.state.squares[i]这个state的string值boolean化。
这样改完，语义更明确：如果点击的Square的state值已经有了，那hasValue的判断即为true，从而直接return。
同样winner也是一样的道理，如果winner的返回结果为null，即false，则说明这次没有winner，继续进行下面的state相关操作，
但如果winner的返回结果是一个值，则不为false，即有了winner，直接return，跳过之后所有操作。
这部分整体代码如下：
  handleClick = (index) => {
    const hasValue = !!this.state.squares[index];
    const winner = !!calculateWinner(this.state.squares);
    if (hasValue || winner) return;                      
    const squares = [...this.state.squares];            
    squares[index] = this.state.isXNext ? 'X' : 'O';
    this.setState(state => ({
        squares,
        isXNext: !state.isXNext
    }));
  }
测试下，发现当有三个一样的相连的时候，的确点任何Square都没有反应了，但是还没有显示winner是谁的信息。
要改UI里的status，需要去render（）里，进行以下更新，
这样我每一次render的时候，就会把winner计算一下，
如果有winner，status就不显示Next Player是X或O，而是显示Winner是X或O,
即winner判断为true即有值时，显示Winner是winner这个值：即当前Board上被点击这个index的state值。
(由于这里要取winner里的值，所以这里的winner没有两次取反使更加语义化，而是直接用有值来判断true，然后为true时，取winner里的值作为显示结果)
如果winner判断为false即null时，还是显示之前的Next Play是X或O：
  const status = winner ? `Winner: ${winner}` : `Next player: ${this.state.isXNext ? 'X' : 'O'}`;
测试没有问题！这部分完工！
*/

/*
/----  lifecycle  ----/
那为什么它会显示winner是X或O呢？这就涉及到lifecycle的问题。
最后讲一下什么是lifecycle：
每一个react comp的挂载或者更新都是属于这个react comp的lifecycle
/----  mount  ----/
比如我们这个Board comp，我先刷新页面：
然后去页面上inspect-Network-all-localhost里去看它的reponse，
发现在root这个div里是什么都没有的。
首先当他第一次执行的时候，
react回来找这个Board会要显示什么东西（因为index.js -> App.js -> 出现第一个不明物体：Board?）
当它第一次执行的时候，我们称他为mount，
再具体些：
也就是react第一次找到Board这个comp时，它会看到render里面有什么东西，
然后他发现render（）里返回了以下内容：
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
然后它就会把以上这些东西，render到页面上。
这个从没有到有的、第一次render comp的过程，我们称他为mount。

/----  componentDidMount()  ----/
这个mount，react给我们提供了一个lifecycle method -
也就是一个lifecyce hook：
叫做 componentDidMount()
它是个class method，要写在Board comp这个class comp里面，
用这个componentDidMount()的话，react就知道，
你在这个里面写的内容，它会帮你在comp第一次render完成后运行！

  /-- 再具体演示下render以及第一次render也就是mount的全过程：--/
  找root，第一次什么都没有->因为index.js，去找root里插入的App
  ->在App.js里发现，有一个Board Comp
  ->去Board.js找它render（）里要return的内容
  ->然后把return（）里的内容render到什么都没有的root div里
  以上这个流程我们叫做render，
  而第一次render comp的过程，就是我们一直说的mount。

那么componentDidMount()里的内容，
顾名思义，就是在第一次render后，也就是mount这个过程完成后要运行的代码！

/----   componentDidUpdate()   ----/
还有mount相关的另一个lifecyle method，
叫做componentDidUpdate().
什么时候会用这个componentDidUpdate()呢？
  /--  先回顾两种comp会update的情况： --/
  当你的comp自身的state的改变的时候，这个comp会update。
  或者说你的这个comp的parent comp，它传进来的props改变的话，这个comp也会update。
  当comp update的时候，它就会重新run这个comp里的render（），
  那么render里return（）出来的value，就会根据你最新的state来。
  也就是你state update了，你render时输出的内容，也会反映你state的更改。
  这就是我们所谓的comp update。

那么update完了之后，react就会call另外一个lifecycle method：
componentDidUpdate()
在这里，就是每当我点击Square时，就会改变Board里state array里的某一个state，
然后就会重新render Board comp，并在页面显示出state更改后的内容，
再然后react就会call componentDidUpdate()并执行里面的代码。
所以除了第一次render，你的这个comp被重新render几次，componentDidUpdate()就会被react call几次。

/--  那这里Board里的子元素Square会不会跟着重新render呢？ --/
会～！因为当父级comp每一次render时，子级comp就会render，
而且是所有的9个子级comp都会render，但只有被点击的Square comp对应的state array里的index的state会改变，
更值得注意的是，Square comps的render，是发生在Board render的过程中的，
也就是当render Board时，发现了有Square这个子级comp需要render，才能完成父级的render，
react就会在父级（最顶层）render的过程中，先去找子级（一层层往下找，直到最底层）Square comp render完，再回来完成父级（最顶层）的render。
那在这个过程中，如果Square是class comp并有componentDidUpdate()在它的class里的话，
那么9个Square comps的update会先于父级Board里的update出现。
也就是父级（最顶层）的comp update的完成，是基于它底下子级（一层层往下找，直到最底层）的update完成才能完成的
（这里要注意的是：只有class comp有lifecycle！functionnal comp没有lifecycle！！！）

/-- 举例说明下前两个最常用的lifecycle methods的best practice --/
比较常见的用法有：向API取数据，就可以放在componentDidMount()里。
api取数据的是不能放在render里的，否则每一次render也就是每一次update的时候都会发一次请求，
那会有多慢，所以best pratice：把api请求数据的内容，放在componentDidMount()里。
只在第一次render后执行一次。
这就是一个要保证render（）pure的一个实例，不要在render里面做一些会影响到别的东西的事情，
比如像发api请求，就会有side effect（影响到别的东西），不要在render（）里做side effect的事情，
就去componentDidMount()或者componentDidUpdate()里做有side effect的事情。

但这里要注意：在componentDidUpdate()里有个坑：
不要在componentDidUpdate()里用this.setState({...}),因为会发生死循环！
因为你是state update之后来run componentDidUpdate()，
你要再在这里update state，就又要run componentDidUpdate()...这就变成了死循环
这种情况下，你的页面会发生nothing，也就是什么update都不会显示出来，
然后console里也不会有任何更新操作，还没有error
这时候你就要查一下，是不是在componentDidUpdate()做了个死循环操作。
所以一定不要在componentDidUpdate() 里做会导致再次componentDidUpdate() 的事情！！！
可以用if condition去定义某个update后的情况，然后下次update的时候可能就不符合，这就没事了。

/----   componentWillUnmount()   ----/
除了以上这两个最常用的lifecycle method之外，还有一个比较常用的：
componentWillUnmount() 
我们这里在Board render的return里使用一下：
把那九个renderSquare的div包在一个{}里，并在render他们之前做一个判断：
  {
    !winner && (
      <>
        九个renderSquare divs
      </>
    )
  }
注意到在判断下面我还用一个<> </>包住了那9个div，
因为jsx放在一个expression里的话，如果有多个comps，就要包在一个fragment里面。
<> </>就是fragmnet的一个简写，不简写的话可以包个<div> </div>.
上一段代码的意思是一个conditional rendering，
就是check下有没有winner：
如果有winner，!winner这个boolean就是false，如果没有winner就是true，
而js里&&判断的话，它是需要circuit的，
也就是如果&&之前的如果是false的话，&&后面的是不会执行的。
所以如果react看到是!winner是false的话，它就什么都不render，
那如果没有winner的时候，后面的部分就render，
有winner的话，就不render了。
这就是我们做了一个unmount.
现在去页面测试的时候发现，当有了winner后，9个Square的render就不见了，
这个从有到没有的render过程，就是unmount了，
那么在这9个comp是被去掉之前，react会call componentWillUnmount()，
那我如果把componentWillUnmount()写在class Square comp里（render之前），
(去Square.js里render上面加一下componentWillUnmount())
当我们最后产生winner后，即！winner为false，每一个Square都call了一遍will unmount,
之后页面将所有Squares的render unmount了。
这里是因为9个Square的render都会unmount,所以9个Square在render前都会call一次will unmount,

/---- 那一般什么时候会使用componentWillUnmount()呢？best practice ---/
比如你自己在componentDidMount()里加了this.count = setInterval(() => console.log('Counting'),1000)
即在第一次render的时候，也就是这个comp第一次出现在页面的时候，setInterval，然后使之后每一秒log出一次Counting，
然后再在这个comp不在这个页面的时候，componentWillUnmount()里clearInterval(this.count)，把interval卸载掉.
所以他就是做清理工作的，当有winner产生后就不会在继续interval了，因为已经被componentWillUnmount()清理掉了。
也可以remove你在mount时候添加的一些非react的那些event handlers，
比如document.addEventListener()，在componentWillUnmount()里就可以document.removeEventListener()

而如果是react自己的event handler，它是不需要解绑的，你如果想让它的某个comp的click disable，
就在handClick（）里写一个逻辑，让它不要运行state的更新就行，
比如之前做过的那个如果state已经有值，就直接return，不执行下方有关state更新的操作
*/

/*
补充一个操作，如果想要在点击一个Square产生赢家的时候，alert出来一个谁赢了，
可以在handleClick（）里的this.setState()里让它接受新的一个function，
这样它就会在执行完state update同时，运行这个function，
也就当点击了能赢的那个Squre时，先跳出alert，因为他和setState是同步进行的，
然后才会通过render显示出来页面上最后一个Square的state update以及Winner：X/O
  this.setState(state => ({
      squares,
      isXNext: !state.isXNext
      }), () => {
          const winner = calculateWinner(this.state.squares); 
          if (winner) alert(`Winner is ${winner}`)
          }
  );
如果想在render后跳出alert，那就把这个部分，写到componentDidUpdate（）里。
*/

import React from 'react';
import Square from './Square';
  class Board extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        squares: Array(9).fill(null),
        isXNext: true
      };
    }
    componentDidUpdate() {console.log('update')};

    componentDidMount() {console.log('mount')};

    handleClick = (index) => {
      const hasValue = !!this.state.squares[index];
      const winner = calculateWinner(this.state.squares);
      if (hasValue || winner) return;                      
      const squares = [...this.state.squares];            
      squares[index] = this.state.isXNext ? 'X' : 'O';
      this.setState(state => ({
          squares,
          isXNext: !state.isXNext
          }), () => {
              const winner = calculateWinner(this.state.squares); 
              if (winner) alert(`Winner is ${winner}`)
              }
      );
    }

    renderSquare(index) {
      return <Square value={this.state.squares[index]} handleClick={()=>this.handleClick(index)} />        
    }	
    render() {
      const winner = calculateWinner(this.state.squares);
      const status = winner ? `Winner: ${winner}` : `Next player: ${this.state.isXNext ? 'X' : 'O'}`;
      return (
      <div>
        <div className="status">{status}</div> 
        {
          !winner && (
            <>
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
            </>
          )
        }  
      </div>
      )
    }
  }
export default Board;

function calculateWinner(squares) {
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
}