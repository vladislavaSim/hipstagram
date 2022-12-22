import React, {useEffect} from 'react';
import {connect} from "react-redux";
import Card from "@material-ui/core/Card"
import {CardActions, CardContent, CardMedia, IconButton, Typography} from "@material-ui/core";
import {backendUrl} from "../../helpers/BackendUrl";
import {actionFullAddLike, actionFullRemoveLike} from "../../redux/actions/actionsLike";
import Avatar from "../../components/avatar/Avatar";
import DefaultAvatar from "../../components/avatar/DefaultAvatar";
import {Link, useParams} from "react-router-dom";
import {ImagesSlider} from "../post/Slider";
import {CLike} from "../../components/like/Like";
import {actionGetPostById} from "../../graphql/queryPost";
import {CPreloaded} from "../../helpers/Preloader";

const style = {
    flexDirection: 'unset',
    width: '100%'
};
const FeedPost = ({post = []}) => {

    const timestamp = post?.createdAt;
    let date = new Date(+timestamp)
    date = date.getDate()+
        "/"+(date.getMonth()+1)+
        "/"+date.getFullYear()+
        " "+date.getHours()+
        ":"+date.getMinutes()

    return (
        <CPreloaded promiseName='allPosts'>
            {post?.images?.[0]?.url ?
                (
                    <Card sx={{maxWidth: 345}}
                          style={{boxShadow: '1px 2px 4px #0000008c', marginBottom: '10px', paddingBottom: '10px', height: '700px'}}
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
                            <div style={{color: '#959292'}}>{date}</div>
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
                                <span style={{fontWeight: '600'}}>{'@' + post?.owner.login + ':  '}</span>
                                {post?.title.length > 50 ? post?.title.slice(0, 50) + '...' : post?.title}
                            </Typography>
                        </CardContent>
                    </Card>
                ) : null
            }
        </CPreloaded>
    );
}

export const CFeedPost = connect((state) => ({
    feedPosts: state?.feed?.feedPosts,
    feed: state?.feed
}), null
)(FeedPost);