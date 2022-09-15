import {actionPromise} from '../promises/promises.js'
import {gql} from "./getgql";

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