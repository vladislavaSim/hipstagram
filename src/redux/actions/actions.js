import * as actions from '../actionTypes'
import {actionLogin} from "../../graphql/actionLogin";

import {store} from "../store";

export const registrateUser = token => ({
    type: actions.AUTH_REGISTRATION,
    payload:  token
})

export const actionAuthLogin = (token) => ({type: 'AUTH_LOGIN', token})
export const logoutUser = () => ({
    type: actions.AUTH_LOGOUT
})

export const actionFullLogin = (login, password) =>
    async (dispatch) => {
        let token = await dispatch(actionLogin(login, password));
        if (token) {
            dispatch(actionAuthLogin(token))
            // await dispatch(actionAboutMe());
            // await dispatch(actionFullAllGetPosts());
            console.log(token);
        } else {
            // dispatch(actionClearPromise('login'));
        }
        console.log(token)
    };
// console.log(store.dispatch(actionFullLogin('vsim', '123')));
// const actionFullLogin = (login, password) => (
//     async (dispatch) => {
//         let token = await dispatch(actionLogin(login, password))
//         if (token) {
//             dispatch(actionAuthLogin(token))
//             location.hash = '#/category'
//         } else {
//             showErrorMessage('please, enter correct login and password', main)
//         }
//     }
// )
