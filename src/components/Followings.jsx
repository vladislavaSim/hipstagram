import React from 'react';
import { connect } from 'react-redux';
import {OneUserInList} from "./OneUserInList";
import Button from "./Button";
import {useNavigate} from "react-router";

const Followings = ({ userFollowing, myId, myFollowing }) => {
    const history = useNavigate()
    let id = window.location.pathname.replace('/following/', '')

    function getFollowersArray() {
        return id === myId ? myFollowing : userFollowing
    }
    return (
        <>
            <h2>Following</h2>
            <Button className='ordinaryBtn'
                    onClick={() => history(-1)}>go back</Button>
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

