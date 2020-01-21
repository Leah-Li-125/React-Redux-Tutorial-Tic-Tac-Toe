import { combineReducers } from 'redux';
import boardReducer from './boardReducer';

/*
Step 3.5:
how to use this combineReducers fn?
this fn receive an object as a param, and this object's key best to be same as the reducer's name:
like the boradReducer's key name should be board.
then import boardReducer from boardReducer.js to be the value of the key - board
    store = {
                board: {} //before first run, the state value for board in store object is empty
            }
finally export reducers which returned by the combineReducers fn to const store = createStore(),
then go back to index.js (step 3) to import reducers
*/

const reducers = combineReducers({
    board: boardReducer
})

export default reducers;