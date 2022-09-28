import React from 'react';
import defaultAva from '../img/default-avatar.png'

const DefaultAvatar = ({className = 'avatarPic'}) => {
    return (
        <div>
            <img src={defaultAva}
                 alt="ava"
                 className={className} />
        </div>
    );
};

export default DefaultAvatar;