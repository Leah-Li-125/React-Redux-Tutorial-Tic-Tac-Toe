import { UPDATE_SQUARE } from '../actions/updateBoardActions';
/*
Step2:
the store will dispatch each action to all reducers and each reducer will decide whether to care this action passed in.
Reducer is a normal function (using switch to check whether this reducer cares the action passed in).
this fuction's returned value will be used to replace the next state value. so this state in globel store will be replaced to the returned value.

so now need to initalize the state just like the react does. and let assign this initial state to the state passed in to the fn:
when first running this app, the redux state, ie store, is an empty object, so if you want to get value of store.boradReducer, that will do sth like: {}.boardReducer. Obviously, this kind of thing will get nothing, ie undefined becuase there is no value in the store object when you first run the app.
so if we don't assign this initialState to the state, 
the state we get here will be undefined because what you are doing is to get a non-existed value for the key boardReducer from an empty object.
so in order to avoid getting an undefined state when you first run the app, it will use the initialState as the state during its first run.
meanwhile, its first run has no action as well, so the switch will go to the default case to return the initialState to the globle store.
thus, next run,the action is dispatched, and the state getting from the globel store will not be undefined, instead, it will get the initialstate as the value of state for this run.
Since the action has been dispatched, the default case will never be run that means the state will never be returned right away after the action dipatched. Thus the initalState will never be used to assign a value to state after the first run.

still remember not to mutate the state! 
we can shallow copy the state value, and then give isXNext an opposite value of last state.
In this way, isXNext state for now will replace the previous isXNext state in the shallow copy of the state

(go to Step3 in index.js)
*/
const initailState = {
    isXNext: true,
    squares: Array(9).fill(null),
};

const boardReducer = (state = initailState, action) => {
    switch (action.type) {
        case UPDATE_SQUARE:
            const squares = [...state.squares];
            squares[action.index] = state.isXNext ? 'X' : 'O';
            return {
                ...state,
                isXNext: !state.isXNext,
                squares
            };

        default:
            return state;
    }
}

export default boardReducer;