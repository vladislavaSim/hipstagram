import React, {useEffect, useState} from 'react';
import Button from "./Button";
import {CCreatePost} from "./CreatePost";
import {connect} from "react-redux";
import {actionAuthLogout} from "../redux/reducers/authReducer";
import {store} from "../redux/store";
import {useNavigate} from "react-router";
import {actionAboutMe} from "../redux/actions/actions";
import defaultAvatar from "../img/default-avatar.png"
import DragNDrop from "./DragNDrop";

const meObj = {

}

const Profile = ({getAboutMe, me, avatar, login, nick}) => {
    const [newPost, setNewPost] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    // const [me, setMe] = useState(meObj)
    // console.log(me.payload)
    const navigate = useNavigate()

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
    }


    function makeAvatar() {
        if(!avatar) {
            return <img src={defaultAvatar} className='avatarPic' alt='avatar'/>
        }
    }
    
    return (
        <div>
            <div className='profile-info-box'>
                {makeAvatar()}
                <h4>{login}</h4>
            </div>
            {isEditing ? <CCreatePost isActive={true}/> : null}
            {newPost ? <CCreatePost isActive={false}/> : null}
            <Button children={isEditing ? 'Cancel' : 'Edit profile'}
                    onClick={() => isEditingToggle()}
            />
            <Button children={newPost ? 'Cancel' : '+ post'} onClick={() => newPostToggle()}/>
        </div>
    );
};

export const CProfile = connect((state) => ({
    me: state.promise?.me,
    avatar: state.promise?.me?.payload?.avatar,
    login: state.promise?.me?.payload?.login,
    nick: state.promise?.me?.payload?.nick,

}), {
    getAboutMe: actionAboutMe
})(Profile);