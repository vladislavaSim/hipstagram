
import {gql} from "./getgql";
import {actionPromise} from "../redux/reducers/promiseReducer";


export const actionUserById = (id, name = 'userById') =>
    actionPromise(
        name,
        gql(
            `query UserById($_id:String) {
        UserFindOne(query: $_id){
          _id, nick, login, createdAt, avatar {url}
          followers {_id, nick, login, avatar{url}},
          following {_id, nick, login, avatar{url}}
          likes { _id owner {_id login, avatar{url}}}
          } 
        }`,
            { _id: JSON.stringify([{ _id: id }]) }
        )
    );