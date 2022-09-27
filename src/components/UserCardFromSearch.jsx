import React from 'react';
import { Link } from 'react-router-dom';
import defaultAva from '../img/default-avatar.png';

export const UserCardFromSearch = ({ user }) => {
    return (
        <div className="wrapper">
            <div className="user-search">
                <Link to={`/user/${user?._id}`}>
                    {user?.avatar === null ? (
                        <img src={defaultAva} alt="avatar" />
                    ) : (
                        <img
                            src={`http://hipstagram.node.ed.asmer.org.ua/${user?.avatar?.url}`}
                            alt="avatar"
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