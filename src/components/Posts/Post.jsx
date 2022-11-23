import React, {useEffect, useState} from 'react';
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
import {useNavigate} from "react-router";

const style = {
    flexDirection: 'unset',
    width: '100%'
};


const Post = ({post, onGetPostById, myId, promise, postsArr}) => {
    const {_id} = useParams()
    let [currentIndex, setCurrentIndex] = useState(postsArr.findIndex((item) => item._id === _id)) //from opened post using url id

    const navigate = useNavigate()

    const toPrev = () => {
        setCurrentIndex(--currentIndex)
        navigate(`/post/` + postsArr[--currentIndex]._id);
    }
    const toNext = () => {
        setCurrentIndex(++currentIndex)
        navigate(`/post/` + postsArr[++currentIndex]._id);  //making link path to the next post
    }

    useEffect(() => {
        onGetPostById(_id)
        onGetPostById(postsArr[currentIndex]._id)
        // setCurrentIndex(currentIndex)
        console.log(post)
    }, [_id])

    console.log(currentIndex)



    // console.log(nextImg())
    // function getTime(time) {
    //     let timestamp
    //     let date = new Date(+timestamp);
    //     timestamp = time;
    //     return date = date.getDate()+
    //         "/"+(date.getMonth()+1)+
    //         "/"+date.getFullYear()+
    //         " "+date.getHours()+
    //         ":"+date.getMinutes()
    // }

    return (
        <CPreloaded promiseName='postById'>
            {postsArr && post?.images?.[0]?.url ?
                (
                    <div>
                        <button onClick={toPrev}>prev</button>
                        <Card
                            style={style}
                            id='card'
                        >
                            <div className='modal-image-box'>
                                {post?.images.length === 1 ? (
                                    <CardMedia
                                        component="img"
                                        image={`${backendUrl + post?.images[0]?.url}`}
                                        alt="post-picture"
                                        className='gallery-image'
                                    />) : (
                                    <ImagesSlider images={post?.images} key={post?._id} className='gallery-image'/>
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
                                    <div style={{color: '#959292', fontSize: '18px'}}>
                                        1111111
                                    </div>
                                </header>

                                <CardContent>
                                    <Typography className='post-title'>
                                        {post?.title}
                                    </Typography>
                                    <Typography variant="body2" className='post-text'>
                                        {post?.text}
                                    </Typography>
                                </CardContent>
                                <div className="card-bottom">
                                    <CLike post={post} postId={post?._id} />
                                </div>
                            </div>
                        </Card>
                        {/*<button onClick={toNext}>next</button>*/}
                    </div>
                ) : null
            }
            <button onClick={toNext}>
                next
            </button>
        </CPreloaded>
    );
}

export const CPost = connect((state) => ({
    myId: state?.promise?.me?.payload?._id,
    post: state?.promise?.postById?.payload,
    promise: state?.promise,
    postsArr: state?.promise?.postByIdUser?.payload
    // feedPosts: state?.feed?.feedPosts,
    // feed: state?.feed
}), {
    onGetPostById: actionGetPostById
})(Post);
