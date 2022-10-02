import React, {useEffect, useState} from 'react';
import Button from "./Button";
import {CFileUploader} from "./FileUploader";
import {connect} from "react-redux";
import {useNavigate} from "react-router";
import {
    actionAboutMe,
    actionFullSubscribe, actionFullUnSubscribe,
    actionSetAvatar,
    actionSubscribe,
    actionUnSubscribe
} from "../redux/actions/actions";
import defaultAvatar from "../img/default-avatar.png"
import DragNDrop from "./DragNDrop";
import {actionUserById} from "../graphql/userById";
import {Link, useParams} from 'react-router-dom'
import {store} from "../redux/store";
import {CDropzoneAvatar} from "./AvatarDrop";
import {NotFound} from "./NotFound";
import {CPost} from "./Posts/Post";
import Avatar from "./Avatar";
import DefaultAvatar from "./DefaultAvatar";


const Profile = ({
                    promise,
                     onUserById,
                     onFollow,
                     myId,
                     myFollowing,
                     userAvatar,
                     userLogin,
                     userId,
                     followers,
                     following,
                     posts,
                    onUnfollow
                 }) => {

    const {_id} = useParams()
    const [isEditing, setIsEditing] = useState(false);

    const navigate = useNavigate()

    useEffect(() => {
        onUserById(_id);
        console.log(_id)
    }, [_id]);

    useEffect(() => {
        setIsEditing(false)
    }, [userAvatar?.url])

    function isEditingToggle() {
        setIsEditing(!isEditing)
    }

    function getLengthNum (array, text) {
       let num = !array ? '0' : array.length
       return num + ' ' + text
    }

    function setOrShowAvatar(){
        if(isEditing) {
            return <CDropzoneAvatar/>
        } else {
            if(userAvatar) {
                return <Avatar url={userAvatar.url} className='avatarPic'/>
            } else {
                return <DefaultAvatar/>
            }
        }
    }

    console.log(isEditing)
    console.log(promise)
    // console.log(posts)
    const doIFollow = (myFollowing || []).find((item) => item._id === _id);

    return (
        <div>
            <div className='profile-info-box'>
                <div className="avatar">
                    {setOrShowAvatar()}
                    {/*{isEditing && <CDropzoneAvatar/>}*/}
                    {/*{userAvatar ?*/}
                    {/*<Avatar url={userAvatar.url} className='avatarPic'/>*/}
                    {/*    : <DefaultAvatar/>*/}
                    {/*}*/}
                </div>
                <h4> <span>{`${userLogin ? userLogin : 'no name'}`}</span></h4>
            </div>
            <div>

            </div>
           <div className='profile-buttons'>
               {myId === userId &&
                <Button children={isEditing ? 'Cancel' : 'Edit profile'}
                        className='primeBtn'
                        onClick={() => isEditingToggle()}/>}

               {myId !== userId &&
               (!doIFollow ? (
                   <Button onClick={() => onFollow(myId, _id)} className='primeBtn' children='Follow'/>
               ) : (
                   <Button onClick={() => onUnfollow(myId, _id)} className='primeBtn' children='Unfollow'/>
               ))}
           </div>

            <div>
                <Link to={`/followers/${_id}`}>
                    <p>{getLengthNum(followers,'followers')}</p>
                </Link>
                <Link to={`/followings/${_id}`}>
                    <p>{getLengthNum(following,'followings')}</p>
                </Link>
                <p>{getLengthNum(posts,'posts')}</p>
            </div>
            <div className='gallery'>
                {(posts || []).map((post) => {
                    console.log(post)
                    return <CPost key={post._id} post={post} className='gallery-item'/>;
                })}
            </div>

        </div>
    );
};

export const CProfile = connect((state) => ({
    promise: state.promise,
    auth: state.auth,
    me: state.promise?.me,
    myId: state?.promise?.me?.payload?._id,
    myFollowing: state?.promise?.me?.payload?.following,
    nick: state.promise?.me?.payload?.nick,
    userAvatar: state?.promise?.userById?.payload?.avatar,
    userLogin: state?.promise?.userById?.payload?.login,
    userId: state?.promise?.userById?.payload?._id,
    followers: state?.promise?.userById?.payload?.followers,
    following: state?.promise?.userById?.payload?.following,
    posts: state?.promise?.postByIdUser?.payload,

}), {
    getAboutMe: actionAboutMe,
    setAvatar: actionSetAvatar,
    onUserById: actionUserById,
    onFollow: actionFullSubscribe,
    onUnfollow: actionFullUnSubscribe
})(Profile);