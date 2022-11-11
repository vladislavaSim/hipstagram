import React from 'react';
import {backendUrl} from "../../graphql/BackendUrl";
import FavoriteIcon from '@mui/icons-material/Favorite';

const PostPreview = ({post}) => {

    return (
        <>
            {post?.images?.[0]?.url
                && <div className='gallery-item'>
                <img src={backendUrl + post.images?.[0]?.url}
                     alt={'post-pic'}
                     className='gallery-img' />
                <div className="gallery-item-info">
                    <div className="gallery-item-likes">
                        <FavoriteIcon style={{marginRight: '7px'}}/>
                            {post?.likes?.length}
                    </div>
                </div>
            </div>
            }
        </>
    );
};

export default PostPreview;