import React from 'react';
import Comment from "./Comment";
import {TextField} from "@mui/material";

const CommentList = ({comments}) => {

    return (
        <div className='comments-box'>
            <div className='flexbox'>
                <TextField id="standard-basic" label="Add a comment" variant="standard" style={{width: '100%', marginRight: '15px'}}/>
                <button className='primeBtn'>Send</button>
            </div>
            {comments &&
                comments.map(item => {
                    return <Comment key={item._id} text={item.text} createdAt={item.createdAt} owner={item.owner}/>
                })
            }
        </div>
    );
};

export default CommentList;