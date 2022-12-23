import React from 'react';
import {backendUrl} from "../../helpers/BackendUrl";
import {Link} from "react-router-dom";
import DefaultAvatar from "../avatar/DefaultAvatar";
import Avatar from "../avatar/Avatar";

const Comment = ({text, createdAt, owner}) => {
    // console.log(comment)
    const timestamp = createdAt;
    let date = new Date(+timestamp)
    date = date.getDate()+
        "/"+(date.getMonth()+1)+
        "/"+date.getFullYear()+
        " "+date.getHours()+
        ":"+date.getMinutes()

    return (
         <div>
             <div className='comment-info'>
                     <div>
                         <Link to={`/profile/${owner?._id}`}>
                             {owner?.avatar === null ? (
                                 <DefaultAvatar className='small-ava avatarPic'/>
                             ) : (
                                 <Avatar url={owner?.avatar?.url} className='small-ava avatarPic'/>
                             )}
                             <h3>{'@' + owner.login}</h3>
                         </Link>
                     </div>
                     <div style={{color: '#959292', fontSize: '18px'}}>
                         {date}
                     </div>
             </div>
             <p style={{textAlign: 'center'}}>{text}</p>
         </div>
    );
};

export default Comment;