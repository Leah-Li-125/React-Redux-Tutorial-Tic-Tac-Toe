import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import reducers from './redux/reducers'
import { Provider } from 'react-redux';

/*
Step3:
import createStore fn from redux.
this createStore fn will return a store object.
Store dispatchs actions and each action will go through all reducers, the returned value of reducers will change the previous store state
so the store need to know all reducers. Thus, this fn need to receive reducers as parameters.
normally, we will not do import reducers from each js file under reducers folder; we will combine all reducers into an index.js under reducers folder
(go to create an index.js under reducers folder and go to step 3.5 there)

(get back from step 3.5)
import reducers first. here ./redux/reducers default go to the index.js in the folder

now the store has been created, so next is to let store to notisfy its observer - React when the store is update.
so we need to import an React comp - Provider from react-redux library.
this special react comp uses a contest principal(will be explained later)
the Provider comp will receive a prop - store,
and then we need to let this Provider comp be outside of the top comp - App 
so that every comp in App is able to get access to the store in Provider - making the store globally

now the store is globle state, then how to use it to notify comps to update state? 
go to the Board comp then find a way to connect the comp to the Redux store -> go to step 4 in Board.js
*/
const store = createStore(reducers);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
