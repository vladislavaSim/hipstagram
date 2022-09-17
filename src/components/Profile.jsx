import React, {useEffect, useState} from 'react';
import Button from "./Button";
import {CCreatePost} from "./CreatePost";
import {connect} from "react-redux";
import {actionAuthLogout} from "../redux/reducers/authReducer";
import {store} from "../redux/store";
import {useNavigate} from "react-router";
import {actionAboutMe} from "../redux/actions/actions";

const Profile = ({getAboutMe}) => {
    let [newPost, setNewPost] = useState(false)

    const navigate = useNavigate()

    useEffect(()=>{
        // console.log(localStorage)
        if(!localStorage.authToken){
            navigate('/login');
        }
    },[localStorage,navigate])

    function newPostToggle() {
        return setNewPost(!newPost)
    }

    return (
        <div>
            profile
            {newPost ? <CCreatePost /> : null}
            <Button children={newPost ? 'Cancel' : 'New Post'} onClick={() => newPostToggle()}/>
            <Button children={'about me'}
                    onClick={() => getAboutMe()} />
            </div>
    );
};

export const CProfile = connect(null, {
    getAboutMe: actionAboutMe
})(Profile);