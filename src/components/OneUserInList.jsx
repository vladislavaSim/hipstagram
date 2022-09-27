import React from 'react';
import { Link } from 'react-router-dom';
import defaultAvatar from '../img/default-avatar.png';

export const OneUserInList = ({ user }) => {

    console.log(user)
    return (
        <>
            <div className="search-item">
                <Link to={`/profile/${user?._id}`}>
                    {user?.avatar === null ? (
                        <img src={defaultAvatar} alt="avatar" style={{width: '50px', height: '50px'}} className='avatarPic'/>
                    ) : (
                        <img
                            src={`http://hipstagram.node.ed.asmer.org.ua/${user?.avatar?.url}`}
                            style={{width: '50px', height: '50px'}}
                            alt="avatar"
                            className='avatarPic'
                        />
                    )}
                </Link>
                <Link to={`/profile/${user?._id}`}>
                    <div>{user?.login ? user.login : 'anon'}</div>
                </Link>
            </div>
        </>
    );
};