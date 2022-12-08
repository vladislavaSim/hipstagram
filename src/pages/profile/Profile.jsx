import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {queryUserById} from "../../graphql/queryUserById";
import {useParams} from 'react-router-dom'
import {CMyProfile} from "./MyProfile";
import {CUserProfile} from "./UserProfile";
import {actionClearPromiseByName} from "../../redux/actions/actionPromise";
import {queryPostById} from "../../graphql/queryPost";

const Profile = ({onUserById, myId, myFollowing, userId, clearPromise, getPostById}) => {

    const {_id} = useParams()

    useEffect(() => {
        if(_id) {
            onUserById(_id)
            getPostById(_id)
        }
    }, [_id])

    useEffect(() => {
        clearPromise('postById')
        clearPromise('postByIdUser')
    }, [])

    const doIFollow = (myFollowing || []).find((item) => item._id === _id);

    return (
        <>
            {
                _id === myId
                    ? <CMyProfile />
                    : <CUserProfile
                        userId={userId}
                        doIFollow={doIFollow}
                        myId={myId}
                        />
            }
        </>
    );
}

export const CProfile = connect((state) => ({
    promise: state?.promise,
    userId: state?.promise?.userById?.payload?._id,
    myId: state?.promise?.me?.payload?._id,
    myFollowing: state?.promise?.me?.payload?.following,
}), {
    onUserById: queryUserById,
    getPostById: queryPostById,
    clearPromise: actionClearPromiseByName
})(Profile);

