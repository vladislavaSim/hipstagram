import {applyMiddleware, combineReducers, createStore} from "redux";
import {promiseReducer} from "./reducers/promiseReducer";
import thunk from "redux-thunk";
import {authReducer} from "./reducers/authReducer";
import {feedReducer} from "./reducers/FeedReducer";
import {actionAboutMe} from "./actions/actions";

const store = createStore(
    combineReducers({
        auth: authReducer,
        promise: promiseReducer,
        feed: feedReducer
    }),
    applyMiddleware(thunk)
)
store.dispatch(actionAboutMe)

export default store