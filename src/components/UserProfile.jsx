import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {actionFullSubscribe, actionFullUnSubscribe,} from '../redux/actions/actionSubscribe'
import {queryUserById} from "../graphql/queryUserById";
import ScrollUpButton from "react-scroll-up-button";
import Avatar from "./Avatar";
import DefaultAvatar from "./DefaultAvatar";
import Button from "./Button";
import {Link} from "react-router-dom";
import {CPost} from "./Posts/Post";
import {CPreloaded} from "./Preloader";
import {queryPostById} from "../graphql/queryPost";
import PostPreview from "./Posts/PostPreview";

const UserProfile = ({userId,
                         promise,
                         userFollowing,
                         userFollowers,
                         userAvatar,
                         userLogin,
                         userPosts,
                         doIFollow,
                         onFollow,
                         onUnfollow,
                         getPostById,
                         myId}) => {


    function getLengthNum (array, text) {
        let num = !array ? '0' : array.length
        return num + ' ' + text
    }

    useEffect(() => {
        if(userId) {
            getPostById(userId)
            getPostById(userId, 'usersPost')
        }
    }, [userId])
    return (
        <CPreloaded promiseName='postByIdUser'>
            <div className='profile-box'>
                <ScrollUpButton ContainerClassName="up-btn"/>
                <div className="avatar">
                    {userAvatar ?
                        <Avatar url={userAvatar} className='avatarPic'/>
                        : <DefaultAvatar/>
                    }

                </div>
                <div className='profile-info-box'>
                    <h3> <span>{`${userLogin ? userLogin : 'no name'}`}</span></h3>
                    <div>
                        <div className='profile-nums'>
                            <Button className='ordinaryBtn'>
                                <Link to={`/followers/${userId}`}>
                                    <div>{getLengthNum(userFollowers,'followers')}</div>
                                </Link>
                            </Button>
                            <Button className='ordinaryBtn'>
                                <Link to={`/following/${userId}`}>
                                    <div>{getLengthNum(userFollowing,'followings')}</div>
                                </Link>
                            </Button>
                            <Button className='ordinaryBtn'>
                                <div>{getLengthNum(userPosts,'posts')}</div>
                            </Button>
                        </div>
                        <div className='profile-buttons'>
                            {(!doIFollow ? (
                                <Button onClick={() => onFollow(myId, userId)} className='primeBtn' children='Follow'/>
                            ) : (
                                <Button onClick={() => onUnfollow(myId, userId)} className='primeBtn' children='Unfollow'/>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className='gallery'>
                {(userPosts || []).map((post) => {
                    return <PostPreview post={post} key={post._id} className='gallery-item'/>
                })}
            </div>
        </CPreloaded>
    );
};

export const CUserProfile = connect((state) => ({
    promise: state.promise,
    // auth: state.auth,
    // me: state.promise?.me,
    userId: state?.promise?.userById?.payload?._id,
    userFollowing: state?.promise?.userById?.payload?.following,
    userFollowers: state?.promise?.userById?.payload?.followers,
    userAvatar: state?.promise?.userById?.payload?.avatar?.url,
    userLogin: state?.promise?.userById?.payload?.login,
    userPosts: state?.promise?.postByIdUser?.payload,
}), {
    onUserById: queryUserById,
    onFollow: actionFullSubscribe,
    onUnfollow: actionFullUnSubscribe,
    getPostById: queryPostById
})(UserProfile);