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
            console.log(111)
            dispatch(actionAuthLogin(token))
            dispatch(actionAboutMe())
            dispatch(actionAboutMe())
        }
    }
)

export const actionFullRegister = (login, password) => (
    async (dispatch) => {
        console.log(login, password)
        let registerId = await dispatch(actionRegister(login, password))

        if (registerId) {
            console.log('okay')
            dispatch(actionFullLogin(login, password))
        }
    }
)

export const actionUploadFile = (file) => {
    console.log(file)
    let fd = new FormData();
    fd.append('photo', file);
    return actionPromise(
        'uploadFile',
        fetch('/upload', {
            method: 'POST',
            headers: localStorage.authToken
                ? { Authorization: 'Bearer ' + localStorage.authToken }
                : {},
            body: fd,
        }).then((res) => res.json())
    );
};

export const actionAboutMe = () => {
    return async (dispatch, getState) => {
        let id = getState().auth?.payload?.sub?.id
        await dispatch(actionUserById(id, 'me'))
    }
}
export const actionSetAvatar = (file) => async (dispatch, getState) => {
    let data = await dispatch(actionUploadFile(file));
    console.log(data)
    let idImg = getState().promise?.uploadFile?.payload?._id;
    let idUser = getState().auth?.payload?.sub?.id;
    await dispatch(
        actionPromise(
            'setAvatar',

            gql(
                `mutation setAvatar($avatar:ImageInput){
    UserInput(user:$avatar){
        _id, avatar{
            _id
        }
    }
}`,
                { avatar: { _id: idUser, avatar: { _id: idImg } } }
            )
        )
    );
    dispatch(actionAboutMe());
    dispatch(actionUserById(idUser));
};

export const actionSubscribe = (id, userId, oldFollowing) =>
    actionPromise(
        'subscribe',
        gql(
            `mutation following($user:UserInput){
        UserUpsert( user:$user){
            following{_id}
        }
      }`,
            { user: { _id: id, following: [...(oldFollowing || []), { _id: userId }] } }
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
