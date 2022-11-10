import React from 'react';
import {backendUrl} from "../graphql/BackendUrl";
import def from "../img/default-avatar.png";

const Avatar = ({url, className = 'avatarPic'}) => {

    function handleImageError(e) {
        e.target.onError = null
        e.target.src = def
    }

    console.log(url)
    return (
        <div>
            <img src={`${backendUrl + url}`}
                 alt="ava"
                 onError={handleImageError}
                 className={className} />
        </div>
    );
};

export default Avatar;