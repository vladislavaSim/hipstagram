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

export const actionFullLogin = (login, password) =>
    async (dispatch) => {
        let token = await dispatch(actionLogin(login, password));
        if (token) {
            dispatch(actionAuthLogin(token))
            dispatch(actionAboutMe())
        } else {
            // dispatch(actionClearPromise('login'));
        }
    };
export const actionFullRegister = (login, password) => (
    async (dispatch) => {
        let registerId = await dispatch(actionRegister(login, password))

        if (registerId) {
            dispatch(actionFullLogin(login, password))
        }
    }
)

export const actionUploadFile = (file) => {
    let formData = new FormData();
    formData.append('photo', file);
    for (const value of formData.entries()) {
        console.log(value);
    }
    return actionPromise(
        'uploadFile',
        fetch('http://hipstagram.node.ed.asmer.org.ua/upload', {
            method: 'POST',
            headers: localStorage.authToken
                ? { Authorization: 'Bearer ' + localStorage.authToken }
                : {},
            body: formData,
        }).then((res) => res.json()).then(json => console.log('UPLOAD RESULT', json))
    );
};

export const actionAboutMe = () => {
    return async (dispatch, getState) => {
        let id = getState().auth?.payload?.sub?.id
        await dispatch(actionUserById(id, 'me'))
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
    );
    dispatch(actionAboutMe());
    dispatch(actionUserById(idUser));
};
