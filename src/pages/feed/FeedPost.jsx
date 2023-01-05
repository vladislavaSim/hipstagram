import React from 'react';
import {connect} from "react-redux";
import Card from "@material-ui/core/Card"
import {CardContent, Typography} from "@material-ui/core";
import {backendUrl} from "../../helpers/BackendUrl";
import Avatar from "../../components/avatar/Avatar";
import DefaultAvatar from "../../components/avatar/DefaultAvatar";
import {Link} from "react-router-dom";
import {ImagesSlider} from "../post/Slider";
import {CLike} from "../../components/like/Like";
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';import {CPreloaded} from "../../helpers/Preloader";
import ModalBox from "../../components/main/ModalBox";
import {getDate} from "../../helpers/DateFormating";
import {CNewComment} from "../../components/comments/NewComment";

const FeedPost = ({post = []}) => {
    console.log(post?._id)
    return (
        <CPreloaded promiseName='allPosts'>
            {post?.images?.[0]?.url ?
                (
                    <Card sx={{maxWidth: 345}}
                          style={{boxShadow: '1px 2px 4px #0000008c', marginBottom: '10px', paddingBottom: '10px', height: '730px'}}
                    >
                        <header className='card-header'>
                            <div className='card-author-box'>
                                <Link to={`/profile/${post?.owner?._id}`}>
                                    {post?.owner?.avatar === null ? (
                                        <DefaultAvatar className='small-ava avatarPic'/>
                                    ) : (
                                        <Avatar url={post?.owner?.avatar?.url} className='small-ava avatarPic'/>
                                    )}
                                    <h4>{'@' + post?.owner.login}</h4>
                                </Link>

                            </div>
                            <div style={{color: '#959292'}}>{getDate(post?.createdAt)}</div>
                        </header>

                        <CardContent>
                            <div>
                            {post?.images.length === 1 ? (
                                <img
                                    height="580"
                                    src={`${backendUrl + post?.images[0]?.url}`}
                                    alt="post-picture"
                                    className='feed-post-img'
                                />) : (
                                <ImagesSlider images={post?.images} key={Math.random() * 1000} className='feed-post-img'/>
                            )
                            }

                                <CLike post={post} postId={post?._id} likeClass='feed-post-like-box' likeInfoClass='feed-post-like-info'/>
                            </div>
                            <Typography
                                style={{fontSize: '18px', textAlignLast: 'start'}}>
                                <span style={{fontWeight: '600', marginLeft: '15px'}}>{'@' + post?.owner.login + ':  '}</span>
                                {post?.title.length > 50 ? post?.title.slice(0, 50) + '...' : post?.title}
                            </Typography>
                            {post?.comments ?
                                <ModalBox comments={post?.comments} postId={post?._id}>
                                        <ChatBubbleOutlineOutlinedIcon style={{position: 'relative', top: '5px'}}/>
                                        <span className='ordinaryBtn'>
                                            {post?.comments.length > 1 ? `SHOW ALL ${post?.comments.length} COMMENTS` : 'SHOW A COMMENT'}
                                        </span>
                                </ModalBox>
                                : <CNewComment postId={post?._id}/>
                            }
                        </CardContent>
                    </Card> ) : null
            }
        </CPreloaded>
    );
}

export const CFeedPost = connect((state) => ({
    feedPosts: state?.feed?.feedPosts,
    feed: state?.feed
}), null
)(FeedPost);