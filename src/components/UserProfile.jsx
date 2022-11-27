import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {actionFullSubscribe, actionFullUnSubscribe,} from '../redux/actions/actionSubscribe'
import {queryUserById} from "../graphql/queryUserById";
import ScrollUpButton from "react-scroll-up-button";
import Avatar from "./Avatar";
import DefaultAvatar from "./DefaultAvatar";
import Button from "./Button";
import {Link} from "react-router-dom";
import {CPreloaded} from "./Preloader";
import {queryPostById} from "../graphql/queryPost";
import {CPostPreview} from "./Posts/PostPreview";
import {actionClearPromiseByName} from "../redux/actions/actionPromise";
import {useParams} from "react-router";

const UserProfile = ({   userId,
                         userFollowing,
                         userFollowers,
                         userAvatar,
                         userLogin,
                         userPosts = [],
                         doIFollow,
                         onFollow,
                         onUnfollow,
                         getPostById,
                         clearPromise,
                         onUserById,
                        promise,
                         myId}) => {

    const {_id} = useParams()

    function getLengthNum (array, text) {
        let num = !array ? '0' : array.length
        return num + ' ' + text
    }

    console.log('rerender')
    useEffect(() => {

        console.log(1)
        console.log(userId)
        if(userId) {
            console.log(2)
            console.log(userId)
            getPostById(userId)
            // getPostById(userId, 'usersPost')
        }
        return () => {
            // clearPromise('userById')
            clearPromise('postByIdUser')
            console.log(userPosts)
            console.log('user unmount')
        }
    }, [userId])
    // useEffect(() => {
    //     clearPromise
    //     clearPromise('postByIdUser')
    // }, [])
    // console.log(promise)
    // useEffect(() => {
    //     clearPromise('postByIdUser')
    //     clearPromise('userById')
    //     onUserById(_id)
    // }, [])
    // console.log(promise)
    // console.log(userPosts)
    return (
        <CPreloaded promiseName='userById'>
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
           <CPreloaded promiseName='postByIdUser'>
               <div className='gallery'>
                   {(userPosts || []).map((post) => {
                       return <CPostPreview post={post}
                                            key={post._id + Math.random() * 100}
                                            className='gallery-item'
                       />
                   })
                   }
               </div>
           </CPreloaded>
        </CPreloaded>
    );
};

export const CUserProfile = connect((state) => ({
    // auth: state.auth,
    // me: state.promise?.me,
    promise: state?.promise,
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
    getPostById: queryPostById,
    clearPromise: actionClearPromiseByName
})(UserProfile);