import React from 'react';

//4.1用square component里增加它的props来使原本square里只能显示静态S，改为显示变量。更改如下：
// const Square = () => {
//     return <button className = "square">
//         S
//     </button>;
// };

//4.1 传入参数props - props是一个普通的js  object.那下面显示的props.value就是props里一个名字叫value这个key的内容，props到底有什么key，都是由你自己定义的. 那如何传进来这个value呢，那就看我们在哪里使用这个component，我们是在Board里使用了我的square component，所以去Board.js去定义props的key.

//4.4 在下方就传入了props.value这个参数，但注意：你可以传参数的值，但props object里的任何值都不可以被更改。props是read-only！！！

//5. 给Square添加event handler，使点击的时候触发变化。这里就在button里添加onClick这个eventhandler的callback function。这里注意：这里的onClick（）也属于传进去的一个default prop，所以记得使用calmelCase！！如果使用的是纯小写的，react就不能识别，也就不会把它作为一个default prop来进行功能处理，而是直接当作一个html attribute写进里html element里。这里一定要避免纯小写，因为那就意味这你没有使用react，而是直接和它底下的dom打交道，进行了直接real dom改写。

//6. 我们最终的目的是把我们Square里的内容改成X或O，如果继续使用刚刚在Square那个dumb functional component里写的onClick的话，它是还是不知道自己显示的内容是什么的，它只能通过它的parent：Board这个Class Component来告诉它，它当前显示的是什么。那么这里就需要把Square这个functional comp改写成Class Component，然后用state去保存component本身的一个状态，从而使它可以自己决定自己要显示什么

//  functional comp
// const Square = (props) => {
//     return(
//         <button onClick = { () => { alert(props.value) }} className = "square">
//         {props.value}
//         </button>
//     )
// }；

// -> class comp
//6.1 这时候的props从哪里来呢？因为这里不能像functional那样传入一个props的参数。这里用this.props.value。如果你是个class comp，它的class就会绑定在它的instance上面，那么如何去取class的instance？this！！！所以以后class里取props，就用this.props, 这个props object是react自带的一个空的object，但里面具体传的内容是什么，还是需要去parent Board里定义props.value的内容，然后传回来。

/*6.2 那么现在来给它加一个state。初始的state可以用constructor来定义。这里注意：只要写constructor，就一定要加入一个props,并在里面用super（props）来继承parents的constructor，固定格式。但如果不写constructor的话，就不用了。

然后用this.state={}去自定义一个初始的state,比如这里给一个initial state为value：‘X’。这里要注意，constructor是comp里唯一一个可以assign东西给state的地方，即直接给this.state赋值。其他任何地方都不可以直接给它赋值。

那么怎么用这个inital state呢？直接access 也就是取值就好了。也就是在其他任何地方你用this.state.value来取它的值都没有关系，但是不能再别的地方给它赋值！！！那么就去改写下方，来让Square comp去取它的初始state值并render出来。
*/
class Square extends React.Component {
    
    //这是没有建constructor没有initial state之前用this.props.value来给comp赋值的方法（6.1）
    // render() {
    //     return(
    //             <button onClick = { () => { alert(this.props.value) }} className = "square">
    //                 {this.props.value}
    //                 </button>
    //             )
    // }

    //下面是6.2：用inital state来让初始化comp的方法：加上constructor是state initialize，并将所有的this.props.value改为this.state.value。这里就是让最初comp里面render的内容是空的。从而可以使之后每次点击comp改变成X或O。这里initalize state的方法还有一种，就是不写constructor，直接写state = {value: ''}也可以，这只是语法不同而已，功能和constructor给initial state赋值是一样的，但也是唯一可以赋值给state的地方，这两个任选其一即可。都是instance的variable：state，在最初得到一个初始值而已。

    /*6.3 现在就来处理，点击后会改变state从而改变rendering的部分。首先，如果我们把这部分逻辑写在onClick里，会很长，所以提出来，在render（）之前写一个handleClick（），然后把这个handleClick传到onClick（）里, 如下: 
    onClick = { this.handleClick }
    */

    /*
    6.4 那么handleClick（）里逻辑就是把this.state改为X或O，但记住，this.state不可以赋值！所以，要用this.setState来改变state的值。传给它一个object，这个object就是你想让这个state改变成的样子。这里就可以改成：
    this.setState({ value: 'X'});
    也就是点击会使Square comp的state由初始的‘’变成‘X’。

    但去browser run start后，发现有error：
    TypeError: Cannot read property 'setState' of undefined

    这就代表，this是undefined。那为什么呢？
    这里是自己定义的一个function，那this是什么，与我们在哪里call它以及如何call它有关。我们是在onClick（）里call的，但由于onClick（）是react的一个default的prop，所以他到底怎么call的只有react自己知道，那么这里this为undefined，说明它没有做this的绑定。如果是native的js，click handler里的this指向的一定是它绑定的element，即被点击的element。
    
    但这里是react的onClick（），它的this没有绑定被click的comp，所以我们可以在constructor里去用bind去把this强行绑定到Square comp上，但是这种强行绑定的方法有点ugly。推荐：用arrow function来自定义handleClick（），由于arrow function是没有自己的this的，那它的this就是它定义的时候的上一层函数的this。这里handleClick（）定义的时候，没有上一级函数，那么this就在它定义的时候，指向了Square instance。所以无论handleClick（）这个函数在哪里call，它的this都不会变，就是Square instance。之前的写法，是instance method，改完arrow funciton后，是一个instance variable，这个varibale储存的是一个arrow funciton
    */ 

    //state = { value: ''};
    constructor(props) {
        super(props);
        this.state = { 
            value: '', 
        };
    }
    
    //instance method： this is undefined
    // handleClick() {
    //     this.setState({ value: 'X'});
    // }

    //instance variable = arrow function： 没有this。所以this指向上一层函数，这里没有上一层，就直接指向Square instance。这里绑定的是instance，那么每一个component的instance都有一个它自己的state，所以每点一个Square，它会一个一个的改变它的state。
    
    handleClick = () => {
        // this.setState({ value: 'X'});
        // this.setState({ value: this.state.value === '' ? 'X' : '' }) //6.5 (解释在下方)
        this.setState(
            state => ({ value: state.value === '' ? 'X' : '' }) //6.6
        )
        // console.log('state', this.state.value);
    }

    // 同时要注意：this.setState（）,它是做一个merge，比如现在constructor里我们初始化的state不止value一个，还有个value2：‘123’，那当我call setState的时候，value2是不会被覆盖掉的，hoop会但setState是merge不会覆盖，只会把同样key的值，改为你要改的值。
    //还有个坑：如果在你call setState（）后，不是已经改变了value的值从‘’到‘X'，但在它下方如果console.log('state', this.state.value), 结果为‘’。不是已经改了吗为何为空呢？
    // 但如果把console.log('state', this.state.value)放在render（）里return之前，结果却为‘X’。这里又为何又改了呢？这里是因为lifecycle的原因。
    // 因为setState就像setTimeout一样，它是异步的！也就是当点击也就是call了setState时，它就被交到别的地方等着了，等下一个render了，才会执行它，那在这之前，已经console了，所以结果为‘’，所以要注意在setState之后做的操作，它是取不到最新的state的。它要等到执行到下一个render的时候，它就出来了，所以放在render（）后面是可以显示改变的

    /* 6.5 那我现在还想点击一下改变成X，再点一下，再改回‘’。怎么做？可以用条件语句去取反。即如果是空白的话，变为X，否则，变回空白：
    this.setState({ value: this.state.value === '' ? 'X' : '' })
    代码改在上面了。
    */
    /*
    6.6 但这里又有个坑： 由于setState是异步，那这里的this.state.value的值是上一个render的值，而不是当前应该改变成的值。react帮我们想到了这个问题，setState除了可以接受一个state的object以外，它还可以接受一个参数为上一个state的function，同时把value后面的this.state.value改为state.value。
    即接受一个参数state => 返回一个object，如下：
    this.setState(
        state => ({ value: state.value === '' ? 'X' : '' })
        )
    上面是arrow function的一个syntax：在返回结果外加一个（），就是把结果作为object来返回！！它和正常的：
    state => {return {....}}是一样的，因为返回的只有一行，那就省掉return，和return外面的{}，直接在返回结果外加一个（），返回的就是一个object。必须有这个（），否则的话，返回的这个带着大括号的object，会被认为是function的body。
    那么，这个接收了上一个state参数的funciton，返回的值为下一个state，即当前state。这样做，可以保证，我接受的一定是上一次的state，比如第一次click，我接受的是initial的state，返回的是第一次改完的state；第二次click，我接受的是第一次改完的state，返回的是第二次改完的state；以此类推。
    */
    
    render() {
        // console.log('state', this.state.value);

        return(
                // <button onClick = { () => { alert(this.state.value) }} className = "square">
                //     {this.state.value}
                //     </button>
                // )
                <button onClick = { this.handleClick } className = "square">
                    {this.state.value}
                    </button>
                )
                
    }
}

export default Square;

/*
重要总结！！！！！
在react里，你想要render出一个component的状态的话，只有两个方法：
1 改变它的props：在改变了它的props之后，它的component里回从新render，从而更新component里的内容。
2 改变它本身的state：这样componnet的内容会更新。

区别是：props是parent传给它的，就像这里Square这个component其实还在接受parent Board给它传的props，但是由于他已经不再用props了，而是用了本身的state，所以那个props的值在这里没用了。可见它是state-driven的，总是有一个comp的state改了，或是自己，或是父级改了state然后以props传过来的，总之是肯定有至少一个comp的state改了，才能使内容的更新触发。

props：read-only；
state：一定程度上也是read-only。除了initial state可以赋值以外，其余的必须用setState才能改。

所以当你发现无论怎么点击你都无法改变comp的内容，那就想想：你的点击改了它的state吗？改了它的props吗？如果你的点击这两个都没有改动的话，那它一定不会更新。
*/