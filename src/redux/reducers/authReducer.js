function jwtDecode(token){
    try {
        return JSON.parse(atob(token.split('.')[1]))
    }
    catch(e){
    }
}

export function authReducer(state = {}, {type, token}) {
    if (!state) {
        if (localStorage.authToken) {
            token = localStorage.authToken
            type = 'AUTH_LOGIN'
        } else {
            return state
        }
    }
    if (type === 'AUTH_LOGIN') {
        let payload = jwtDecode(token)
        if (typeof payload === 'object') {
            localStorage.authToken = token
            return {
                ...state,
                token,
                payload
            }
        } else {
            return state
        }
    }
    if (type === 'AUTH_LOGOUT') {
        delete localStorage.authToken
        window.location.reload()
        return {}
    }
    return state
}

export const actionAuthLogin = (token) => ({type: 'AUTH_LOGIN', token})
export const actionAuthLogout = () => ({type: 'AUTH_LOGOUT'})
