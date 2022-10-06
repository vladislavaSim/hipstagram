import {gql} from "./getgql";
import {actionPromise} from "../redux/reducers/promiseReducer";

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
