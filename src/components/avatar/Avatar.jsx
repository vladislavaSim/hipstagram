import React from 'react';
import {backendUrl} from "../../helpers/BackendUrl";
import def from "../../img/default-avatar.png";

const Avatar = ({url, className = 'avatarPic'}) => {

    function handleImageError(e) {
        e.target.onError = null
        e.target.src = def
    }

    return (
        <>
            <img src={`${backendUrl + url}`}
                 alt="ava"
                 onError={handleImageError}
                 className={className} />
        </>
    );
};

export default Avatar;