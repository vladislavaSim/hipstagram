import React from 'react';
import {OneUserInList} from "../like/OneUserInList";
import Comment from "./Comment";

const CommentList = ({comments}) => {
    console.log(comments)
    return (
        <div className='comments-box'>
            {comments &&
                comments.map(item => {
                    return <Comment key={item._id} text={item.text} createdAt={item.createdAt} owner={item.owner}/>
                })
            }
        </div>
    );
};

export default CommentList;