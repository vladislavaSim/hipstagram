import React from 'react';
import { connect } from 'react-redux';
import {OneUserInList} from "./OneUserInList";

const Followers = ({ users }) => {
    console.log(users)
    return (
        <>
            {users ? (
                <>
                    <h3>Followers </h3>
                    {(users || []).map((user) => {
                        console.log(user)
                        return <OneUserInList key={user._id} user={user} />;
                    })}
                </>
            ) : (
                <h2>Followers 0</h2>
            )}
        </>
    );
};

export const CFollowers = connect((state) => ({
    users: state?.promise?.userById?.payload?.followers,
}))(Followers);