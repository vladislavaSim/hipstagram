import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {actionFullSubscribe, actionFullUnSubscribe,} from '../../redux/actions/actionSubscribe'
import ScrollUpButton from "react-scroll-up-button";
import Avatar from "../../components/avatar/Avatar";
import DefaultAvatar from "../../components/avatar/DefaultAvatar";
import Button from "../../components/buttons/Button";
import {Link} from "react-router-dom";
import {CPreloaded} from "../../helpers/Preloader";
import {queryPostById} from "../../graphql/queryPost";
import {CPostPreview} from "../post/PostPreview";
import {actionClearPromiseByName} from "../../redux/actions/actionPromise";

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
                         myId}) => {

    function getLengthNum (array, text) {
        let num = !array ? '0' : array.length
        return num + ' ' + text
    }

    useEffect(() => {
        if(userId) {
            getPostById(userId)
        }
    }, [userId])

    useEffect(() => {
       clearPromise('postByIdUser')
    }, [])

    return (
        <>
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
           <>
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
           </>
        </>
    );
};

export const CUserProfile = connect((state) => ({
    userId: state?.promise?.userById?.payload?._id,
    userFollowing: state?.promise?.userById?.payload?.following,
    userFollowers: state?.promise?.userById?.payload?.followers,
    userAvatar: state?.promise?.userById?.payload?.avatar?.url,
    userLogin: state?.promise?.userById?.payload?.login,
    userPosts: state?.promise?.postByIdUser?.payload,
}), {
    onFollow: actionFullSubscribe,
    onUnfollow: actionFullUnSubscribe,
    getPostById: queryPostById,
    clearPromise: actionClearPromiseByName
})(UserProfile);