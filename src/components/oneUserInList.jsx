import React from 'react';
import { Link } from 'react-router-dom';
import defaultAvatar from '../img/default-avatar.png';

export const OneUserInList = ({ user }) => {

    console.log(user)
    return (
        <div className="wrapper">
            <div className="list-user">
                <Link to={`/profile/${user?._id}`}>
                    {user?.avatar === null ? (
                        <img src={defaultAvatar} alt="avatar" style={{width: '50px'}}/>
                    ) : (
                        <img
                            src={`http://hipstagram.asmer.fs.a-level.com.ua/${user?.avatar?.url}`}
                            alt="avatar"
                        />
                    )}
                </Link>
                <Link to={`/profile/${user?._id}`}>
                    <div>{user?.login ? user.login : 'no name'}</div>
                </Link>
            </div>
        </div>
    );
};