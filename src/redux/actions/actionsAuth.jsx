import {AUTH_LOGIN, AUTH_LOGOUT} from "../actionTypes";
import * as actions from "../actionTypes";
import {queryLogin} from "../../graphql/queryLogin";
import {queryRegistration} from "../../graphql/queryRegistration";
import {actionAboutMe} from "./actionsMe";

export const actionAuthLogin = (token) => ({type: AUTH_LOGIN, token})
export const actionAuthLogout = () => ({type: AUTH_LOGOUT})

export const actionFullLogin = (login, password) => (
    async (dispatch) => {
        let token = await dispatch(queryLogin(login, password));
        if (token) {
            await dispatch(actionAuthLogin(token))
            await dispatch(actionAboutMe());
        }
    }
)

export const actionFullRegister = (login, password) => (
    async (dispatch) => {
        let registerId = await dispatch(queryRegistration(login, password))
        if (registerId) {
            await dispatch(actionFullLogin(login, password))
        }
    }
)

