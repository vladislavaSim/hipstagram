import React from 'react';
import { connect } from 'react-redux';
import {OneUserInList} from "./OneUserInList";
import BackButton from "./BackButton";

const Followings = ({ userFollowing, myId, myFollowing }) => {

    let id = window.location.pathname.replace('/following/', '')

    function getFollowersArray() {
        return id === myId ? myFollowing : userFollowing
    }
    return (
        <>
            <h2>Following</h2>
            <BackButton/>
            {getFollowersArray() ? (
                <>
                    {(getFollowersArray() || []).map((user) => {
                        return <OneUserInList key={user._id} user={user} />;
                    })}
                </>
            ) : (
                <h3>The list is empty</h3>
            )}
       </>
    );
};
export const CFollowings = connect((state) => ({
    userFollowing: state?.promise?.userById?.payload?.following,
    myFollowing: state?.promise?.me?.payload?.following,
    myId: state?.promise?.me?.payload?._id
}))(Followings);

