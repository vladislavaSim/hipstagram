import {actionPromise} from "../redux/actions/actionPromise";
import {gql} from "./getgql";

export const queryGetUsers = (skip) =>
    actionPromise(
        'allUsers',
        gql(
            `query allUsers($query: String!){
      UserFind(query: $query){
        _id, login, createdAt, nick, avatar 
         {_id, url}
       }
    }`,
            {
                query: JSON.stringify([{}, { sort: [{ login: -1 }], skip: [skip || 0], paginationNumber: [10] }]),
            }
        )
    );