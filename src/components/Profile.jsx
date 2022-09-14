import React, {useEffect, useState} from 'react';
import Button from "./Button";
import CreatePost from "./CreatePost";
import {connect} from "react-redux";
import {actionAuthLogout} from "../redux/reducers/authReducer";
import {store} from "../redux/store";
import {useNavigate} from "react-router";

const Profile = ({onLogout}) => {
    let [newPost, setNewPost] = useState(false)
    const navigate = useNavigate()
    useEffect(()=>{
        console.log(localStorage)

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
            <Button children={newPost ? 'Cancel' : 'New Post'} onClick={() => newPostToggle()}/>
            {/*<Post />*/}
            {newPost ? <CreatePost /> : null}
            <Button
                children={
                    <span className="mdc-button__label">
                    Log out
                    </span>}
                onClick={() => onLogout()}
            />
        </div>
    );
};

export  const CProfile = connect(null, {
    onLogout: actionAuthLogout
})(Profile);