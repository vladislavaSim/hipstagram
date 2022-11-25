import React, {useEffect} from 'react';
import {connect} from "react-redux";
import Card from "@material-ui/core/Card"
import {CardActions, CardContent, CardMedia, IconButton, Typography} from "@material-ui/core";
import {backendUrl} from "../../graphql/BackendUrl";
import {actionFullAddLike, actionFullRemoveLike} from "../../redux/actions/actionsLike";
import Avatar from "../Avatar";
import DefaultAvatar from "../DefaultAvatar";
import {Link, useParams} from "react-router-dom";
import {ImagesSlider} from "./Slider";
import {CLike} from "./Like";
import {actionGetPostById} from "../../graphql/queryPost";
import {CPreloaded} from "../Preloader";

const style = {
    flexDirection: 'unset',
    width: '100%'
};
const FeedPost = ({post = [], onGetPostById, myId, promise}) => {

    function getTime(time) {
        let timestamp
        let date = new Date(+timestamp);
        timestamp = time;

        return date = date.getDate()+
            "/"+(date.getMonth()+1)+
            "/"+date.getFullYear()+
            " "+date.getHours()+
            ":"+date.getMinutes()
    }


    return (
        <CPreloaded promiseName='postById'>
            {post?.images?.[0]?.url ?
                (
                    <Card sx={{maxWidth: 345}}
                          style={{boxShadow: '1px 2px 4px #0000008c', position: 'relative'}}
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
                            <div style={{color: '#959292'}}>{() => getTime(post?.createdAt)}</div>
                        </header>
                        {post?.images.length === 1 ? (
                            <CardMedia
                                component="img"
                                height="580"
                                image={`${backendUrl + post?.images[0]?.url}`}
                                alt="post-picture"
                                className='gallery-image'
                            />) : (
                            <ImagesSlider images={post?.images} key={Math.random() * 1000}/>
                        )
                        }
                        <CardContent>
                            <Typography className='post-title'>
                                {post?.title}
                            </Typography>
                            <Typography variant="body2" className='post-text'>
                                {post?.text}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing className='card-bottom'
                                     style={{position: 'absolute', bottom: '0'}}>
                            <CLike post={post} postId={post?._id} />

                        </CardActions>
                    </Card>
                ) : null
            }
        </CPreloaded>
    );
}

export const CFeedPost = connect((state) => ({
    myId: state?.promise?.me?.payload?._id,
    promise: state?.promise,
    feedPosts: state?.feed?.feedPosts,
    feed: state?.feed,
    // post: state?.promise?.postById?.payload
}), {
    onGetPostById: actionGetPostById
})(FeedPost);