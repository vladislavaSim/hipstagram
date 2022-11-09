import {PROMISE, PROMISE_CLEAR} from "../actionTypes";

export function promiseReducer(state={}, {type, status, payload, error, name}) {
    if (!state) {
        return {}
    }
    if (type === PROMISE) {
        return {
            ...state,
            [name]: {
                status: status,
                payload : payload,
                error: error,
            }
        }
    }
    if (type === PROMISE_CLEAR) {
        return {
            ...state,
            [name]: null,
        };
    }
    return state
}
