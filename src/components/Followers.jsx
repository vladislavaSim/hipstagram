import React from 'react';
import { connect } from 'react-redux';
import {OneUserInList} from "./oneUserInList";

const Followers = ({ users }) => {
    console.log(users)
    return (
        <>
            {users ? (
                <>
                    <h2>Followers </h2>
                    {(users || []).map((user) => {
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