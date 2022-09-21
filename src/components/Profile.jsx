import React, {useEffect, useState} from 'react';
import Button from "./Button";
import {CFileUploader} from "./FileUploader";
import {connect} from "react-redux";
import {useNavigate} from "react-router";
import {actionAboutMe, actionSetAvatar} from "../redux/actions/actions";
import defaultAvatar from "../img/default-avatar.png"
import DragNDrop from "./DragNDrop";
import {actionUserById} from "../graphql/userById";

const meObj = {

}

const Profile = ({
                     match: _id,
    promise,
                     onUserById,
                     onPostsById,
                     onSubscribe,
                     onUnSubscribe,
                     myId,
    me,
    avatar,
    nick,
                     myFollowing,
                     userAvatar,
                     userLogin,
                     userId,
                     followers,
                     following,
                     posts,
                 }) => {
    console.log(me)
    const [newPost, setNewPost] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [nickname, setNickname] = useState(nick)

    console.log( myId, following)
    const navigate = useNavigate()
    // useEffect(() => {
    //     onUserById(_id);
    // }, [_id]);


    useEffect(() => {
        if(!localStorage.authToken){
            navigate('/login');
        }
    },[localStorage,navigate])

    function newPostToggle() {
        return setNewPost(!newPost)
    }

    function isEditingToggle() {
        setIsEditing(!isEditing)
        if(isEditing) {
            changeNick()
        }
    }

    function changeNick() {
        if(!nickname) {
            return <input value={nickname} onChange={(e) => setNickname(e.target.value)}/>
        }
    }

    function getLengthNum (array, text) {
       let num = !array ? '0' : array.length
       return num + ' ' + text
    }

    // console.log(userAvatar)
    // console.log(avatar)
    console.log(promise)
    return (
        <div>
            <div className='profile-info-box'>
                <div className="avatar">
                    {avatar?.url === null ? (
                        <img src={defaultAvatar} alt="avatar" className='avatarPic'/>
                    ) : (
                        <img
                            src={`http://hipstagram.asmer.fs.a-level.com.ua/${userAvatar?.url}`}
                            alt="avatar"
                        />
                    )}
                </div>
                <h4> <span>{`${userLogin ? userLogin : 'no name'}`}</span></h4>
            </div>
            {isEditing ? <CFileUploader isActive={true}/> : null}
            {newPost ? <CFileUploader isActive={false}/> : null}

            <Button children={isEditing ? 'Cancel' : 'Edit profile'}
                    className='primeBtn'
                    onClick={() => isEditingToggle()}/>
            <div>
                <p>{getLengthNum(followers,'followers')}</p>
                <p>{getLengthNum(following,'followings')}</p>
            </div>

            {/*<Button children={newPost ? 'Cancel' : '+ post'} */}
            {/*        onClick={() => newPostToggle()}/>*/}
        </div>
    );
};

export const CProfile = connect((state) => ({
    promise: state.promise,
    me: state.promise?.me,
    myId: state?.promise?.me?.payload?._id,
    avatar: state.promise?.me?.payload?.avatar,
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
})(Profile);