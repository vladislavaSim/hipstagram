import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import reportWebVitals from "./reportWebVitals";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {authReducer} from "./redux/reducers/authReducer";
import {promiseReducer} from "./redux/reducers/promiseReducer";
import {feedReducer} from "./redux/reducers/FeedReducer";
import thunk from "redux-thunk";
import {actionAboutMe, actionAuthLogin, actionFullGetAllPosts} from "./redux/actions/actions";

export const store = createStore(
    combineReducers({
        auth: authReducer,
        promise: promiseReducer,
        feed: feedReducer
    }),
    applyMiddleware(thunk)
)
//initial dispatches
if(localStorage.authToken) {
    store.dispatch(actionAboutMe())
    store.dispatch(actionAuthLogin(localStorage.authToken))
    store.dispatch(actionFullGetAllPosts())
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);

reportWebVitals()