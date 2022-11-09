import {applyMiddleware, combineReducers, createStore} from "redux";
import {authReducer} from "./redux/reducers/authReducer";
import {promiseReducer} from "./redux/reducers/promiseReducer";
import {feedReducer} from "./redux/reducers/feedReducer";
import thunk from "redux-thunk";
import {actionAuthLogin} from './redux/actions/actionsAuth'
import {actionAboutMe} from "./redux/actions/actionsMe";
import {actionFullGetAllPosts} from './redux/actions/actionsPost'

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