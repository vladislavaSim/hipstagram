import React, {useEffect, useState} from 'react';
import {connect, useDispatch} from "react-redux";
import {useNavigate} from "react-router";
import {
    actionAboutMe,
    actionFullSubscribe, actionFullUnSubscribe,
    actionSetAvatar,
} from "../redux/actions/actions";
import {actionUserById} from "../graphql/userById";
import {Link, useParams} from 'react-router-dom'
import {CMyProfile} from "./MyProfile";
import {CUserProfile} from "./UserProfile";


const Profile = ({promise,
                    onUserById,
                     myId,
                     myFollowing,

                 }) => {

    const {_id} = useParams()

    useEffect(() => {
        if(_id) {
        onUserById(_id)
        }
    }, [_id])

    const doIFollow = (myFollowing || []).find((item) => item._id === _id);

    return (
        <>
            {
                _id === myId
                    ? <CMyProfile />
                    : <CUserProfile
                        doIFollow={doIFollow}
                        myId={myId}
                        />
            }
        </>
    );
};

export const CProfile = connect((state) => ({
    promise: state.promise,
    auth: state.auth,
    me: state.promise?.me,
    myId: state?.promise?.me?.payload?._id,
    myFollowing: state?.promise?.me?.payload?.following,
    nick: state.promise?.me?.payload?.nick,
    userAvatar: state?.promise?.userById?.payload?.avatar,
    userLogin: state?.promise?.userById?.payload?.login,
    userId: state?.promise?.userById?.payload?._id,
    followers: state?.promise?.userById?.payload?.followers,
    following: state?.promise?.userById?.payload?.following,


}), {
    getAboutMe: actionAboutMe,
    setAvatar: actionSetAvatar,
    onUserById: actionUserById,
    onFollow: actionFullSubscribe,
    onUnfollow: actionFullUnSubscribe
})(Profile);