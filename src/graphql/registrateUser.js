
import {gql} from "./getgql";
import {actionPromise} from "../redux/reducers/promiseReducer";

export const actionRegister = (login, password) => (
    actionPromise(  'register',
        gql(
            `mutation reg($login: String!, $password: String!) {
        createUser(login: $login, password: $password)
        {
          _id
          login
          
        }
    }`, { login: login, password: password })
    )
)