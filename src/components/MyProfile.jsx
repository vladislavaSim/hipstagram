import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {actionFullSubscribe, actionFullUnSubscribe} from "../redux/actions/actionSubscribe";
import {actionSetAvatar, actionAboutMe} from '../redux/actions/actionsMe'
import {queryUserById} from "../graphql/queryUserById";
import Button from "./Button";
import {Link} from "react-router-dom";
import {CPost} from "./Posts/Post";
import {CDropzoneAvatar} from "./AvatarDrop";
import Avatar from "./Avatar";
import DefaultAvatar from "./DefaultAvatar";
import {CPreloaded} from "./Preloader";
import ScrollUpButton from "react-scroll-up-button";
import {queryPostById} from "../graphql/queryPost";
import {CPostPreview} from "./Posts/PostPreview";
import {CPostsList} from "./Posts/PostsList";

const MyProfile = ({myLogin, myPosts, myAvatar, myFollowing, myFollowers, myId, getPostById}) => {
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if(myId) {
            getPostById(myId)
        }
    }, [])

    function getLengthNum (array, text) {
        let num = !array ? '0' : array.length
        return num + ' ' + text
    }
    function setOrShowAvatar(){
        if(isEditing) {
            return <CDropzoneAvatar/>
        } else {
            if(myAvatar) {
                return <Avatar url={myAvatar} className='avatarPic'/>
            } else {
                return <DefaultAvatar/>
            }
        }
    }

    return (
        <CPreloaded promiseName='postByIdUser'>
            <div className='profile-box'>
                <ScrollUpButton ContainerClassName="up-btn"/>
                <div className="avatar">
                    {setOrShowAvatar()}
                </div>
                <div className='profile-info-box'>
                    <h3> <span>{`${myLogin ? myLogin : 'no name'}`}</span></h3>
                    <div>

                        <div className='profile-nums'>
                            <Button className='ordinaryBtn'>
                                <Link to={`/followers/${myId}`}>
                                    <div>{getLengthNum(myFollowers,'followers')}</div>
                                </Link>
                            </Button>
                            <Button className='ordinaryBtn'>
                                <Link to={`/following/${myId}`}>
                                    <div>{getLengthNum(myFollowing,'followings')}</div>
                                </Link>
                            </Button>
                            <Button className='ordinaryBtn'>
                                <div>{getLengthNum(myPosts,'posts')}</div>
                            </Button>
                        </div>
                        <div className='profile-buttons'>
                            <div>
                                <Button className='primeBtn'>
                                    <Link to='/create'>Add post</Link>
                                </Button>
                            </div>
                            <Button children={isEditing ? 'Cancel' : 'Edit profile'}
                                    className='primeBtn'
                                    onClick={() => setIsEditing(!isEditing)}/>
                        </div>
                    </div>
                </div>
            </div>
            <CPreloaded promiseName='postByIdUser'>
                <div className='gallery'>
                    {(myPosts || []).map((post) => {
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

export const CMyProfile = connect((state) => ({
    myPosts: state?.promise?.postByIdUser?.payload,
    auth: state.auth,
    me: state.promise?.me,
    myId: state?.promise?.me?.payload?._id,
    myFollowing: state?.promise?.me?.payload?.following,
    myFollowers: state?.promise?.me?.payload?.followers,
    myAvatar: state?.promise?.me?.payload?.avatar?.url,
    myLogin: state?.promise?.me?.payload?.login,


}), {
    getAboutMe: actionAboutMe,
    setAvatar: actionSetAvatar,
    onUserById: queryUserById,
    onFollow: actionFullSubscribe,
    onUnfollow: actionFullUnSubscribe,
    getPostById: queryPostById
})(MyProfile);