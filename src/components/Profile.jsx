import React, {useEffect, useState} from 'react';
import Button from "./Button";
import {CCreatePost} from "./CreatePost";
import {connect} from "react-redux";
import {actionAuthLogout} from "../redux/reducers/authReducer";
import {store} from "../redux/store";
import {useNavigate} from "react-router";
import {actionAboutMe} from "../redux/actions/actions";

const meObj = {

}

const Profile = ({getAboutMe, me, avatar, login, nick}) => {
    const [newPost, setNewPost] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    // const [me, setMe] = useState(meObj)
    console.log(me.payload)
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
        console.log('?')
        return setIsEditing(!isEditing)
    }

    console.log(avatar, login, nick)
    return (
        <div>

            {newPost ? <CCreatePost /> : null}
            <Button children={'Edit profile'}
                    onClick={() => isEditingToggle()}
            />
            <Button children={newPost ? 'Cancel' : '+ post'} onClick={() => newPostToggle()}/>
            {/*<Button children={'about me'}*/}
            {/*        onClick={() => getAboutMe()} />*/}
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