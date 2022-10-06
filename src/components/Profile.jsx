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


const Profile = ({onUserById, myId, myFollowing}) => {

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
    myId: state?.promise?.me?.payload?._id,
    myFollowing: state?.promise?.me?.payload?.following,
}), {
    onUserById: actionUserById,
})(Profile);