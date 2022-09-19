import React, {useEffect, useState} from 'react';
import Button from "./Button";
import {CFileUploader} from "./FileUploader";
import {connect} from "react-redux";
import {actionAuthLogout} from "../redux/reducers/authReducer";
import {store} from "../redux/store";
import {useNavigate} from "react-router";
import {actionAboutMe, actionSetAvatar} from "../redux/actions/actions";
import defaultAvatar from "../img/default-avatar.png"
import DragNDrop from "./DragNDrop";

const meObj = {

}

const Profile = ({getAboutMe, me, avatar, login, nick, myId, following, setAvatar, createdAt, followers}) => {
    const [newPost, setNewPost] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [regDate, setRegDate] = useState(createdAt)
    const [nickname, setNickname] = useState(nick)

    console.log(me, avatar, login, nick, myId, following)
    const navigate = useNavigate()
    // useEffect(() => {
    //     console.log(regDate)
    //
    //
    //
    //
    //  make render posts!!!!!!!!!
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //     let newTime = new Date(+regDate)
    //     console.log(newTime)
    //     setRegDate(newTime.toLocaleString('en-GB'))
    // }, [])

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
            setAvatar()
            changeNick()
        }
    }

    function makeDefaultAvatar() {
        if(!avatar) {
            return <img src={defaultAvatar} className='avatarPic' alt='avatar'/>
        }
    }

    function changeNick() {
        if(!nickname) {
            return <input value={nickname} onChange={(e) => setNickname(e.target.value)}/>
        }
    }

    function getFollowingsNum () {
        return !following ? 0 : following
    }


    console.log(followers)
    console.log(following)
    return (
        <div>
            <div className='profile-info-box'>
                {makeDefaultAvatar()}
                <h4>{login}</h4>
                <p>{'Registration date: ' + regDate}</p>
            </div>
            {isEditing ? <CFileUploader isActive={true}/> : null}
            {newPost ? <CFileUploader isActive={false}/> : null}
            {'Date of registration: ' }
            <Button children={isEditing ? 'Cancel' : 'Edit profile'}
                    onClick={() => isEditingToggle()}/>
            <div>
                <p>{followers.length + ' followers'}</p>
                <p>{getFollowingsNum() + ' followings'}</p>
            </div>

            {/*<Button children={newPost ? 'Cancel' : '+ post'} */}
            {/*        onClick={() => newPostToggle()}/>*/}
        </div>
    );
};

export const CProfile = connect((state) => ({
    me: state.promise?.me,
    myId: state.promise?.me?.id,
    avatar: state.promise?.me?.payload?.avatar,
    login: state.promise?.me?.payload?.login,
    following: state.promise?.me?.payload?.following,
    nick: state.promise?.me?.payload?.nick,
    createdAt: state.promise?.me?.payload?.createdAt,
    followers: state.promise?.me?.payload?.followers,
    following: state.promise?.me?.payload?.following

}), {
    getAboutMe: actionAboutMe,
    setAvatar: actionSetAvatar
})(Profile);