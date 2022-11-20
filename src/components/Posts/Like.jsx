import React, {useEffect, useState} from 'react';
import {IconButton} from "@material-ui/core";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import FavoriteBorderTwoToneIcon from "@mui/icons-material/FavoriteBorderTwoTone";
import {connect} from "react-redux";
import {actionFullAddLike, actionFullRemoveLike} from "../../redux/actions/actionsLike";
import ModalLikes from "./ModalLikes";
import {Link} from "react-router-dom";

const Like = ({postId, post, onLike, onDeleteLike, myId, likes = []}) => {
    const [liked, setLiked] = useState(post?.likes.filter((like) => like.owner._id === myId))
    const scale = {
        transform: 'scale(1.4)'
    }


    function likeToggle() {
        setLiked(liked.length !== 0 ? onDeleteLike(liked[0]._id) : onLike(post._id))
    }

    function getLikesInfo() {
        if(likes.length) {
            if(likes.length > 1) {
                return <div className='like-brief-info'>
                    <span style={{fontSize: '18px'}}>LIKED BY</span>
                    <Link to={`/profile/${likes[0].owner._id}`}
                          className='ordinaryBtn'>
                        <b>{likes[0].owner.login}</b>
                    </Link>
                    <span className='ordinaryBtn'>{`and ${likes.length - 1} others`}</span>
                </div>
            } else {
                return <div className='like-brief-info'>
                    <span style={{fontSize: '18px'}}>LIKED BY</span>
                    <Link to={`/profile/${likes[0].owner._id}`}
                          className='ordinaryBtn'>
                        <b>{likes[0].owner.login}</b>
                    </Link>
                    <span className='ordinaryBtn'>{`and ${likes.length - 1} others`}</span>
                </div>
            }
        }
    }
        return (
            <>
                <ModalLikes likes={likes} myId={myId}
                            children={likes.length > 0 &&
                            <div className='like-brief-info'>
                                <span style={{fontSize: '18px'}}>LIKED BY</span>
                                <Link to={`/profile/${likes[0].owner._id}`}
                                      className='ordinaryBtn'>
                                    <b>{likes[0].owner.login}</b>
                                </Link>
                                {likes.length > 1 &&
                                <span className='ordinaryBtn'>{`and ${likes.length - 1} others`}</span>
                                }
                            </div>
                            } />
                <IconButton onClick={likeToggle}
                            aria-label="add to favorites">
                    <div
                        className="like-button">
                        {liked.length !== 0 ? (
                            <FavoriteTwoToneIcon className='red' style={scale}/>
                        ) : (
                            <FavoriteBorderTwoToneIcon style={scale}/>
                        )}
                        {post?.likes && (
                            <p className="like-count">
                                {post?.likes.length === 0 ? 0 : post?.likes.length}
                            </p>
                        )}
                    </div>
                </IconButton>
            </>
        );
    };

    export const CLike = connect((state) => ({
        myId: state?.promise?.me?.payload?._id,
        feedPosts: state?.feed?.feedPosts,
        feed: state?.feed,
        post: state?.promise?.postById?.payload
    }), {
        onLike: actionFullAddLike,
        onDeleteLike: actionFullRemoveLike
    })(Like);
