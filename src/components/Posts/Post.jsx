import React from 'react';
import {connect} from "react-redux";
import Card from "@material-ui/core/Card"
import {CardActions, CardContent, CardMedia, IconButton, Typography} from "@material-ui/core";
import defaultAva from '../../img/default-avatar.png'
import {backendUrl} from "../../graphql/BackendUrl";
import FavoriteBorderTwoToneIcon from '@mui/icons-material/FavoriteBorderTwoTone';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import {actionFullAddLike, actionFullRemoveLike, logoutUser} from "../../redux/actions/actions";
import Avatar from "../Avatar";
import DefaultAvatar from "../DefaultAvatar";
import {Link} from "react-router-dom";

const Post = ({post = [], myId, onLike, onDeleteLike, className}) => {

    const timestamp = post?.createdAt;
    let date = new Date(+timestamp)
        date = date.getDate()+
        "/"+(date.getMonth()+1)+
        "/"+date.getFullYear()+
        " "+date.getHours()+
        ":"+date.getMinutes()
    // console.log(post.likes)
    let isLiked = post.likes.filter((like) => like.owner._id === myId)
    // console.log(isLiked)
    return (
        <div>
            {post?.images?.[0]?.url ?
                         (
                                <Card className={className}
                                    sx={{maxWidth: 345}}>
                                    <header className='card-header' onClick={() => console.log(post?.owner?._id)}>
                                        <div className='card-author-box'>
                                            <Link to={`/profile/${post?.owner?._id}`}>
                                                {post?.owner?.avatar === null ? (
                                                    <DefaultAvatar className='small-ava avatarPic'/>
                                                ) : (
                                                    <Avatar url={post?.owner?.avatar?.url} className='small-ava avatarPic'/>
                                                )}
                                            </Link>
                                             <h4>{'@' + post?.owner.login}</h4>
                                        </div>
                                        <div style={{color: '#959292'}}>{date}</div>
                                    </header>
                                    {post?.images[1] ? (
                                        <CardMedia
                                            component="img"
                                            height="580"
                                            image={`${backendUrl + post?.images[0]?.url}`}
                                            alt="post-picture"
                                            className='gallery-image'
                                        />) : (
                                        <CardMedia
                                            component="img"
                                            height="580"
                                            image={`${backendUrl + post?.images?.[0]?.url}`}
                                            alt="post-picture"
                                            className='gallery-image'
                                        />)
                                    }
                                    <CardContent>
                                        <Typography className='post-title'>
                                            {post?.title}
                                        </Typography>
                                        <Typography variant="body2" className='post-text'>
                                            {post?.text}
                                        </Typography>
                                    </CardContent>
                                    <CardActions disableSpacing>
                                        <IconButton aria-label="add to favorites">
                                            <div
                                                className="like-button"
                                                onClick={() => {
                                                    isLiked.length !== 0 ? onDeleteLike(isLiked[0]._id) : onLike(post._id);
                                                }}
                                            >
                                                {isLiked.length !== 0 ? (
                                                    <FavoriteTwoToneIcon className='red'/>
                                                ) : (
                                                    <FavoriteBorderTwoToneIcon />
                                                )}
                                                {post?.likes && (
                                                    <p className="like-count">
                                                        {post.likes.length === 0 ? 0 : post.likes.length}
                                                    </p>
                                                )}
                                            </div>
                                        </IconButton>
                                    </CardActions>
                                </Card>
                    ) : null
            }
        </div>
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