import React, {useState} from 'react';
import {backendUrl} from "../../graphql/BackendUrl";
import FavoriteIcon from '@mui/icons-material/Favorite';
import BurstModeIcon from '@mui/icons-material/BurstMode';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {actionGetPostById} from "../../graphql/queryPost";

const multiIcon = {
    position: 'absolute',
    top: '5%',
    right: '5%',
    transform: 'scale(1.4)'
};

const scale = {
    transform: 'scale(1.4)',
    marginRight: '15px'
}

const PreviewPost = ({post, getPostById, promise}) => {
    const [open, setOpen] = useState(false)
    // console.log(promise)
    return (
       <Link key={post?._id} to={`/post/${post?._id}`}>
           <div onClick={() => getPostById(post?._id)}>
               {
                   post?.images?.[0]?.url
                && <div className='gallery-item'>
                   <>
                       <img src={backendUrl + post.images?.[0]?.url}
                            alt={'post-pic'}
                            className='gallery-img' />
                       {
                           post?.images.length > 1
                       && <BurstModeIcon style={multiIcon}/>
                       }

                   </>
                   <div className="gallery-item-info">
                       <div className="gallery-item-likes">
                           <FavoriteIcon style={scale}/>
                           {post?.likes?.length}
                       </div>
                   </div>
               </div>
               }
           </div>
       </Link>
    );
}

export const CPostPreview = connect((state) => ({
    promise: state?.promise
}), {
    getPostById: actionGetPostById
})(PreviewPost)

