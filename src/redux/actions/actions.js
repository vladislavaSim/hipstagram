import * as actions from '../actionTypes'
import {actionLogin} from "../../graphql/actionLogin";
import {actionRegister} from "../../graphql/registrateUser";
import {actionPromise} from "../../promises/promises";
import {actionUserById} from "../../graphql/userById";
import {gql} from "../../graphql/getgql";
import {actionAddPosts, actionAddUsers, actionUpdatePosts} from "../reducers/FeedReducer";
import {backendUrl} from "../../graphql/BackendUrl";

export const actionAuthLogin = (token) => ({type: 'AUTH_LOGIN', token})
export const logoutUser = () => ({
    type: actions.AUTH_LOGOUT
})

export const actionFullLogin = (login, password) => (
    async (dispatch, getState) => {
        // console.log(getState().auth?.payload)
        // let idUser = getState().auth?.payload?.sub?.id;
        // console.log(idUser)
        let token = await dispatch(actionLogin(login, password));
        if (token) {
            dispatch(actionAuthLogin(token))
            dispatch(actionAboutMe());
            // dispatch(actionUserById(idUser));
            dispatch(actionFullGetAllPosts());
        }
    }
)

export const actionFullRegister = (login, password) => (
    async (dispatch) => {
        console.log(password)
        let registerId = await dispatch(actionRegister(login, password))

        if (registerId) {
            dispatch(actionFullLogin(login, password))
        }
    }
)

export const actionUploadFile = (file) => {
    console.log(file)
    let formdata = new FormData();
    formdata.append('photo', file);
    // for(let i of formdata) {
    //     console.log(i)
    // }
    return actionPromise(
        'uploadFile',
        fetch(backendUrl + 'upload', {
        method: "POST",
        headers: localStorage.authToken
            ? {Authorization: 'Bearer ' + localStorage.authToken}
            : {},
        body: formdata
    }).then(res => res.json()))
};
export const actionUploadFiles = (files) => {
    let promiseResult = [];

    for (let i = 0; i < files.length; i++) {
        let formdata = new FormData();
        formdata.append('photo', files[i]);
        let oneRes = fetch(backendUrl +'upload', {
            method: 'POST',
            headers: localStorage.authToken
                ? { Authorization: 'Bearer ' + localStorage.authToken }
                : {},
            body: formdata,
        });
        promiseResult.push(oneRes);
    }
    return actionPromise(
        'uploadFile',
        Promise.all(promiseResult)
            .then((res) => res.map((item) => item.json()))
            .then((res) => Promise.all(res))
    );
};
export const actionAboutMe = () => {
    return async (dispatch, getState) => {
        let id = getState().auth?.payload?.sub?.id
        await dispatch(actionUserById(id, 'me'))
        await dispatch(actionPostById(id));
        // await dispatch(actionFullGetAllPosts())
    }
}
export const actionSetAvatar = (file) => async (dispatch, getState) => {
    await dispatch(actionUploadFile(file));
    let idImg = getState().promise?.uploadFile?.payload?._id;
    let idUser = getState().auth?.payload?.sub?.id;
    await dispatch(
        actionPromise(
            'setAvatar',

            gql(
                `mutation setAvatar($avatar:UserInput){
    UserUpsert(user:$avatar){
        _id, avatar{
            _id
        }
    }
}`,
                { avatar: { _id: idUser, avatar: { _id: idImg } } }
            )
        )
    )
    console.log(idImg + ' idImg')
    await dispatch(actionAboutMe());
    await dispatch(actionUserById(idUser));
    await dispatch(actionPostById(idUser));
};

export const actionSubscribe = (id, userId, prevFollowing) =>
    actionPromise(
        'subscribe',
        gql(
            `mutation following($user:UserInput){
        UserUpsert( user:$user){
            following{_id}
        }
      }`,
            { user: { _id: id, following: [...(prevFollowing || []), { _id: userId }] } }
        )
    );
export const actionFullSubscribe = (id, userId) => async (dispatch, getState) => {
    let prevFollowers = (getState().promise?.me?.payload?.following || []).map((item) => ({
        _id: item._id,
    }));

    let followingId = await dispatch(actionSubscribe(id, userId, prevFollowers));

    if (followingId) {
        await Promise.all([dispatch(actionUserById(userId)), dispatch(actionAboutMe())]);
    }
};
export const actionUnSubscribe = (id, prevFollowing) =>
    actionPromise(
        'unSubscribe',
        gql(
            `mutation unSubscribe($user:UserInput){
      UserUpsert( user:$user){
          following{_id}
      }
    }`,
            { user: { _id: id, following: [...prevFollowing] } }
        )
    );

export const actionFullUnSubscribe = (id, userId) => async (dispatch, getState) => {
    let prevFollowingsFiltered = (getState().promise?.me?.payload?.following || []).filter(
        (item) => item._id !== userId
    );

    let prevFollowings = (prevFollowingsFiltered || []).map((item) => ({
        _id: item._id,
    }));

    if (prevFollowings) {
        await dispatch(actionUnSubscribe(id, prevFollowings));
        Promise.all([dispatch(actionUserById(userId)), dispatch(actionAboutMe())]);
    }
};
export const actionUserByLogin = (login) =>
    async (dispatch) => {
        console.log('user search action test worked')
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

const actionGetUsers = (skip) =>
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


export const actionFullGetUsers = () => async (dispatch, getState) => {
    const {
        feed: { feedUsers = [] },
    } = getState();
    let searchUsers = await dispatch(actionGetUsers(feedUsers?.length));
    if (searchUsers) {
        dispatch(actionAddUsers(searchUsers));
    }
};
export const actionGetAllPosts = (skip, mappedFollowings) =>
    actionPromise(
        'allPosts',
        gql(
            `query allposts($query: String!){
      PostFind(query: $query){
        _id, text, title,
        owner{_id, nick, login, avatar
         {url}
        },
        likes { _id owner {_id login avatar{url}}},
        likesCount,
        images{url},
        comments{text _id owner{login _id avatar{url}} createdAt},
        createdAt
    }
  }`,
            {
                query: JSON.stringify([
                    { ___owner: { $in: mappedFollowings } },
                    { sort: [{ _id: -1 }], skip: [skip || 0], limit: [15] },
                ]),
            }
        )
    );
export const actionFullGetAllPosts = () => async (dispatch, getState) => {
    const {
        feed: {feedPosts = []},
    } = getState();
    let myFollowings = (getState().promise?.me?.payload?.following || []).map(
        (item) => item._id
    );
    let usersPosts = await dispatch(actionGetAllPosts(feedPosts?.length, myFollowings));
    if (usersPosts) {
        dispatch(actionAddPosts(usersPosts));
    }
}

const actionUploadPost = (title, text, photosId, postId = undefined) => {
    return actionPromise(
        'uploadPost',
        gql(
            `mutation newPost($post:PostInput){
    PostUpsert(post:$post){
      _id owner{_id}
    }
  }`,
            { post: { _id: postId, title: title, text: text, images: photosId } }
        )
    );
};

export const actionFullUploadPost = (title, text, photos, postId) => async (dispatch) => {
    let photosId = (photos || []).map((photo) => ({ _id: photo._id }));
    await dispatch(actionUploadPost(title, text, photosId, postId));
};
export const actionPostById = (id, name = 'postByIdUser') =>
    actionPromise(
        name,
        gql(
            `query PostById($_id:String) {
        PostFind(query: $_id){
          _id createdAt title text,
          images {url}, comments{text _id owner{login _id avatar{url}} createdAt},
          owner {login, _id, nick, avatar {url},
          followers {_id, nick, login},
          following {_id, nick, login}},
          likesCount, likes { _id owner {_id login avatar{url}}}
        }
    } `,
            { _id: JSON.stringify([{ ___owner: id }, { sort: [{ _id: -1 }] }]) }
        )
    );

export const actionLike = (id) =>
    actionPromise(
        'likePost',
        gql(
            `mutation likePost($like:LikeInput){
        LikeUpsert( like:$like){
            _id post{_id owner{_id}}
        }
      }`,
            { like: { post: { _id: id } } }
        )
    );

export const actionRemoveLike = (id) =>
    actionPromise(
        'removeLike',
        gql(
            `mutation LikeRemove($like:LikeInput){
          LikeDelete(like:$like){
              _id post{_id owner{_id}} 
          }
      }`,
            { like: { _id: id } }
        )
    );
export const actionGetPostById = (id, name = 'postById') => {
    return actionPromise(
        name,
        gql(
            `query onePost ($id:String!){
        PostFindOne(query:$id){
         _id, text, title,
         owner{_id, nick, login, avatar
        {url}
        },  images{url _id},  createdAt
        likes { _id owner {_id login avatar{url}}}
        comments{text _id owner{login _id avatar{url}}  createdAt}
        }
    }`,
            { id: JSON.stringify([{ _id: id }]) }
        )
    );
};

export const actionFullAddLike = (postId) => async (dispatch, getState) => {
    let likeId = await dispatch(actionLike(postId));
    if (likeId) {
        let likedPost = await dispatch(actionGetPostById(postId));
        let newPosts = (getState().feed?.feedPosts || []).map((item) =>
            item._id === likedPost._id ? likedPost : item
        );

        await dispatch(actionUpdatePosts(newPosts));
        await dispatch(actionPostById(likeId?.post?.owner._id));
    }
};

export const actionFullRemoveLike = (likeId) => async (dispatch, getState) => {
    let response = await dispatch(actionRemoveLike(likeId));
    if (response) {
        let likedRemovePost = await dispatch(actionGetPostById(response?.post?._id));
        let updPosts = (getState().feed?.feedPosts || []).map((item) =>
            item._id === likedRemovePost._id ? likedRemovePost : item
        );
        await dispatch(actionUpdatePosts(updPosts));
        await dispatch(actionPostById(response?.post?.owner._id));
    }
};

const actionChangeLogin = (newLogin) =>
    actionPromise(
        'changeLogin',
        gql(
            `mutation changeLogin($user:UserInput){
                    UserUpsert(user:$user){
                        _id  login                        
                    }
            }`,
            { user: newLogin }
        )
    );

export const actionFullChangeLogin = (login) => async (dispatch, getState) => {
    const _id = getState().auth?.payload?.sub?.id;
    const newData = { _id, login };
    let res = await dispatch(actionChangeLogin(newData));
    if (res) {
        await dispatch(actionAboutMe());
        await dispatch(actionFullGetAllPosts());
    }
};


