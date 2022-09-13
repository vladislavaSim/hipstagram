import {actionPromise} from '../promises/promises.js'
import {gql} from "./getgql";

export const actionRegister = (login, password) => (
    actionPromise(  'register',
        gql(
            `mutation register($login: String!, $password: String!) {
        createUser (login: $login, password: $password) {
                  _id login
                }
              }`, {user: {login, password}})
    )
)