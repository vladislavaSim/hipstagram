import React from 'react';
import { Link } from 'react-router-dom';
import defaultAva from '../img/default-avatar.png';
import Avatar from "./Avatar";
import DefaultAvatar from "./DefaultAvatar";

export const UserCardFromSearch = ({ user }) => {
    return (
        <div className="wrapper">
            <div className="user-search">
                <Link to={`/user/${user?._id}`}>
                    {user?.avatar === null ? (
                        <DefaultAvatar className='small-ava'/>
                    ) : (
                        <Avatar
                            className='small-ava'
                            url={user?.avatar?.url}
                        />
                    )}
                </Link>
                <Link to={`/user/${user?._id}`}>
                    <div>{user?.login ? user.login : 'anon'}</div>
                </Link>
            </div>
        </div>
    );
};