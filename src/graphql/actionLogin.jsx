import {actionPromise} from '../promises/promises.js'
import {gql} from "./getgql";

export const actionLogin = (login, password) => {
    return actionPromise(
        'login',
        gql(
            `query login($login:String!, $password:String!) {
        login(login: $login, password: $password)
      }`,
            { login: login, password: password }
        )
    );
};
