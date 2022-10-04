import React from 'react';
import { connect } from 'react-redux';
import {OneUserInList} from "./OneUserInList";
import Button from "./Button";
import {useNavigate} from "react-router";

const Followers = ({ userFollowers, myId, myFollowers }) => {
    const history = useNavigate()
    let id = window.location.pathname.replace('/followers/', '')

    function getFollowersArray() {
        return id === myId ? myFollowers : userFollowers
    }

    console.log(id)
    console.log(getFollowersArray())
    return (
        <>
            <h2>Followers</h2>
            <Button className='ordinaryBtn'
                    onClick={() => history(-1)}>go back</Button>
            {getFollowersArray() ? (
                <>
                    {(getFollowersArray() || []).map((user) => {
                        console.log(user)
                        return <OneUserInList key={user._id} user={user} />;
                    })}
                </>
            ) : (
                <h3>The list is empty</h3>
            )}
        </>
    );
};

export const CFollowers = connect((state) => ({
    userFollowers: state?.promise?.userById?.payload?.followers,
    myFollowers: state?.promise?.me?.payload?.followers,
    myId: state?.promise?.me?.payload?._id
}))(Followers);