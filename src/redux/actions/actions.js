import * as actions from '../actionTypes'
import {actionLogin} from "../../graphql/actionLogin";

import {store} from "../store";
import {actionRegister} from "../../graphql/registrateUser";

export const actionAuthRegistration = token => ({
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
            console.log(token);
        } else {

            // dispatch(actionClearPromise('login'));
        }
    };
export const actionFullRegister = (login, password) => (
    async (dispatch) => {
        let registerId = await dispatch(actionRegister(login, password))

        if (registerId) {
            dispatch(actionFullLogin(login, password))
        }
    }
)

