import React from 'react';
import {connect} from "react-redux";
import Card from "@material-ui/core/Card"
import {CardActions, CardContent, CardMedia, IconButton, Typography} from "@material-ui/core";
import {backendUrl} from "../../graphql/BackendUrl";
import FavoriteBorderTwoToneIcon from '@mui/icons-material/FavoriteBorderTwoTone';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import {actionFullAddLike, actionFullRemoveLike} from "../../redux/actions/actionsLike";
import Avatar from "../Avatar";
import DefaultAvatar from "../DefaultAvatar";
import {Link} from "react-router-dom";
import {ImagesSlider} from "./Slider";

const Post = ({post = [], myId, onLike, onDeleteLike}) => {

    const style = {
        position: 'absolute',
        display: 'flex',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '70%',
        bgcolor: 'background.paper',
        boxShadow: '1px 2px 24px #0000008c',
        flexDirection: 'unset',
    };

    const scale = {
        transform: 'scale(1.4)'
    }

    const timestamp = post?.createdAt;
    let date = new Date(+timestamp)
        date = date.getDate()+
        "/"+(date.getMonth()+1)+
        "/"+date.getFullYear()+
        " "+date.getHours()+
        ":"+date.getMinutes()


    let isLiked = post.likes.filter((like) => like.owner._id === myId)
    return (
        <>
            {post?.images?.[0]?.url ?
                         (
                                <Card sx={{maxWidth: 345}}
                                      style={style}
                                      id='card'
                                >
                                    <div className='modal-image-box'>
                                        {post?.images.length === 1 ? (
                                            <CardMedia
                                                component="img"
                                                // height="580"
                                                image={`${backendUrl + post?.images[0]?.url}`}
                                                alt="post-picture"
                                                className='gallery-image'
                                            />) : (
                                            <ImagesSlider images={post?.images} key={post?._id}/>
                                        )
                                        }
                                    </div>
                                    <div className='modal-info-box'>
                                       <header className='card-header'>
                                           <div className='card-author-box'>
                                               <Link to={`/profile/${post?.owner?._id}`}>
                                                   {post?.owner?.avatar === null ? (
                                                       <DefaultAvatar className='small-ava avatarPic'/>
                                                   ) : (
                                                       <Avatar url={post?.owner?.avatar?.url} className='small-ava avatarPic'/>
                                                   )}
                                                   <h3>{'@' + post?.owner.login}</h3>
                                               </Link>
                                           </div>
                                           <div style={{color: '#959292', fontSize: '18px'}}>{date}</div>
                                       </header>

                                       <CardContent>
                                           <Typography className='post-title'>
                                               {post?.title}
                                           </Typography>
                                           <Typography variant="body2" className='post-text'>
                                               {post?.text}
                                           </Typography>
                                       </CardContent>
                                       <CardActions disableSpacing
                                                    className='card-bottom'
                                                    style={{position: 'absolute', bottom: '0'}}>
                                           <IconButton onClick={() => {
                                               isLiked.length !== 0 ? onDeleteLike(isLiked[0]._id) : onLike(post._id);
                                           }}
                                                       aria-label="add to favorites">
                                               <div
                                                   className="like-button">
                                                   {isLiked.length !== 0 ? (
                                                       <FavoriteTwoToneIcon className='red' style={scale}/>
                                                   ) : (
                                                       <FavoriteBorderTwoToneIcon style={scale}/>
                                                   )}
                                                   {post?.likes && (
                                                       <p className="like-count">
                                                           {post.likes.length === 0 ? 0 : post.likes.length}
                                                       </p>
                                                   )}
                                               </div>
                                           </IconButton>
                                       </CardActions>
                                    </div>
                                </Card>
                    ) : null
            }
        </>
    );
};

export const CPost = connect((state) => ({
    myId: state?.promise?.me?.payload?._id,
    feedPosts: state?.feed?.feedPosts,
    feed: state?.feed
}), {
    onLike: actionFullAddLike,
    onDeleteLike: actionFullRemoveLike
})(Post);