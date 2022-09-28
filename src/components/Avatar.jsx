import React from 'react';

const Avatar = ({url, className = 'avatarPic'}) => {

    return (
        <div>
            <img src={`http://hipstagram.node.ed.asmer.org.ua/${url}`}
                 alt="ava"
                 className={className} />
        </div>
    );
};

export default Avatar;