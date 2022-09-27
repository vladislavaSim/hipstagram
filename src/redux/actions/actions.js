import * as actions from '../actionTypes'
import {actionLogin} from "../../graphql/actionLogin";
import {actionRegister} from "../../graphql/registrateUser";
import {actionPromise} from "../../promises/promises";
import {actionUserById} from "../../graphql/userById";
import {gql} from "../../graphql/getgql";

export const actionAuthLogin = (token) => ({type: 'AUTH_LOGIN', token})
export const logoutUser = () => ({
    type: actions.AUTH_LOGOUT
})

export const actionFullLogin = (login, password) => (
    async (dispatch) => {
        let token = await dispatch(actionLogin(login, password));
        if (token) {
            console.log('token received from back')
            dispatch(actionAuthLogin(token))
            dispatch(actionAboutMe())
            console.log(login, password)
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
        fetch('http://hipstagram.node.ed.asmer.org.ua' + '/upload', {
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
        let oneRes = fetch('http://hipstagram.node.ed.asmer.org.ua/upload', {
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
    }
}
export const actionSetAvatar = (file) => async (dispatch, getState) => {
    console.log(file)
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
    await dispatch(actionAboutMe());
    await dispatch(actionUserById(idUser));
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

