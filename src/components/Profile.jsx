import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {queryUserById} from "../graphql/queryUserById";
import {useParams} from 'react-router-dom'
import {CMyProfile} from "./MyProfile";
import {CUserProfile} from "./UserProfile";
import {actionClearPromiseByName} from "../redux/actions/actionPromise";
import {CPreloaded} from "./Preloader";


const Profile = ({onUserById, myId, myFollowing, promise}) => {

    const {_id} = useParams()
    console.log(promise)
    useEffect(() => {
        if(_id) {
            onUserById(_id)
        }
    }, [_id])

    const doIFollow = (myFollowing || []).find((item) => item._id === _id);

    return (
        <CPreloaded promiseName='userById'>
            {
                _id === myId
                    ? <CMyProfile />
                    : <CUserProfile
                        doIFollow={doIFollow}
                        myId={myId}
                        />
            }
        </CPreloaded>
    );
}

export const CProfile = connect((state) => ({
    promise: state?.promise,
    myId: state?.promise?.me?.payload?._id,
    myFollowing: state?.promise?.me?.payload?.following,
}), {
    onUserById: queryUserById,
    clearPromise: actionClearPromiseByName
})(Profile);

