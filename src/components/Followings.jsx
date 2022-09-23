import React from 'react';
import { connect } from 'react-redux';
import {OneUserInList} from "./oneUserInList";

const Followings = ({ users }) => {
    return (
        <>
            {users ? (
                <>
                    <h2>Following </h2>
                    {(users || []).map((user) => {
                        return <OneUserInList key={user._id} user={user} />;
                    })}
                </>
            ) : (
                <h2>Followings 0</h2>
            )}
        </>
    );
};

export const CFollowings = connect((state) => ({
    users: state?.promise?.userById?.payload?.following,
}))(Followings);