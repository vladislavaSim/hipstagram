import React from 'react';
import {backendUrl} from "../graphql/BackendUrl";

const Avatar = ({url, className = 'avatarPic'}) => {

    return (
        <div>
            <img src={`${backendUrl + url}`}
                 alt="ava"
                 className={className} />
        </div>
    );
};

export default Avatar;