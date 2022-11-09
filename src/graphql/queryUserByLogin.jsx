import {actionPromise} from "../redux/actions/actionPromise";
import {gql} from "./getgql";

export const queryUserByLogin = (login) =>
    async (dispatch) => {
        let promise = await actionPromise(
            'foundUsers',
            await gql(
                `query UserById($login:String) {
        UserFind(query: $login){
          _id, nick, login, createdAt, avatar {url}
          followers {_id, nick, login},
          following {_id, nick, login}
          } 
        }`,
                {login: JSON.stringify([{login: `/${login}/`}] )
                }
            )
        )
        await dispatch(promise)
    }