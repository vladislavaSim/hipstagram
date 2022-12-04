import {PROMISE, PROMISE_CLEAR} from "../actionTypes";

export function promiseReducer(state={}, {type, status, payload, error, name}) {
    if (!state) {
        return {}
    }
    if (type === PROMISE) {
            console.log('gitgods code worked')
            return {
                ...state, [name]: {status, payload: (status === 'PENDING' && state[name] && state[name].payload) || payload, error}
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
