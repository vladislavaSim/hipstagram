export const actionPending = (name) =>
    ({type: 'PROMISE', status: 'PENDING', name})

export const actionResolved = (name, payload) =>
    ({type: 'PROMISE', status: 'RESOLVED', name, payload})

export const actionRejected = (name, error) =>
    ({type: 'PROMISE', status: 'REJECTED', name, error})

export const actionPromise = (name, promise) => (
    async (dispatch) => {
        dispatch(actionPending(name))
        try {
            let data = await promise
            dispatch(actionResolved(name, data))
            return data
        }
        catch(error){
            dispatch(actionRejected(name, error))
        }
    }
)


export function promiseReducer(state={}, {type, status, payload, error, name}) {
    if (!state) {
        return {}
    }
    if (type === 'PROMISE') {
        return {
            ...state,
            [name]: {
                status: status,
                payload : payload,
                error: error,
            }
        }
    }
    return state
}
