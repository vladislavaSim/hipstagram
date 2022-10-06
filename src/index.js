import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import {CApp} from './App';
import reportWebVitals from "./reportWebVitals";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {authReducer} from "./redux/reducers/authReducer";
import {promiseReducer} from "./redux/reducers/promiseReducer";
import {feedReducer} from "./redux/reducers/FeedReducer";
import thunk from "redux-thunk";
import {actionAboutMe} from "./redux/actions/actions";

export const store = createStore(
    combineReducers({
        auth: authReducer,
        promise: promiseReducer,
        feed: feedReducer
    }),
    applyMiddleware(thunk)
)
store.dispatch(actionAboutMe)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Provider store={store}>
        <CApp />
    </Provider>
);

reportWebVitals()