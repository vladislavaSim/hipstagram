import React from 'react';
import {backendUrl} from "../../helpers/BackendUrl";

const Comment = ({comment = []}) => {
    // console.log(comment)
    return (
         <div>
             <img src={backendUrl + comment?.owner?.avatar?.url} className='small-ava avatarPic'/>
             <span>
                 <b>{comment?.owner.login}</b>
             </span>
             {comment.text}
        </div>
    );
};

export default Comment;