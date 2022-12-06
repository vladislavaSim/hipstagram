import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {queryUserById} from "../../graphql/queryUserById";
import {useParams} from 'react-router-dom'
import {CMyProfile} from "./MyProfile";
import {CUserProfile} from "./UserProfile";
import {actionClearPromiseByName} from "../../redux/actions/actionPromise";

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
}

export const CProfile = connect((state) => ({
    myId: state?.promise?.me?.payload?._id,
    myFollowing: state?.promise?.me?.payload?.following,
}), {
    onUserById: queryUserById,
    clearPromise: actionClearPromiseByName
})(Profile);

