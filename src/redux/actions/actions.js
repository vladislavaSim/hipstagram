import * as actions from '../actionTypes'
import {actionLogin} from "../../graphql/actionLogin";

import {store} from "../store";

export const registrateUser = token => ({
    type: actions.AUTH_REGISTRATION,
    payload:  token
})

export const loginAuthUser = token => ({
    type: actions.AUTH_LOGIN,
    payload: token
})
export const logoutUser = () => ({
    type: actions.AUTH_LOGOUT
})

export const actionFullLogin = (login, password) =>
    async (dispatch) => {
        let token = await dispatch(actionLogin(login, password));
        if (token) {
            dispatch(loginAuthUser(token));
            // await dispatch(actionAboutMe());
            // await dispatch(actionFullAllGetPosts());
            console.log(token);
        } else {
            // dispatch(actionClearPromise('login'));
            // console.log('no token')
        }
        console.log(token)
    };
// console.log(store.dispatch(actionFullLogin('vsim', '123')));
