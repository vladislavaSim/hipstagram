import React from 'react';
import {backendUrl} from "../graphql/BackendUrl";
import def from "../img/default-avatar.png";
import {CPreloaded} from "./Preloader";

const Avatar = ({url, className = 'avatarPic'}) => {

    function handleImageError(e) {
        e.target.onError = null
        e.target.src = def
    }

    // console.log(url)
    return (
        <CPreloaded promiseName='me'>
            <img src={`${backendUrl + url}`}
                 alt="ava"
                 onError={handleImageError}
                 className={className} />
        </CPreloaded>
    );
};

export default Avatar;