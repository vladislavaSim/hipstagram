import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import Card from "@material-ui/core/Card"
import {CardContent, CardMedia, Typography} from "@material-ui/core";
import {backendUrl} from "../../graphql/BackendUrl";
import Avatar from "../Avatar";
import DefaultAvatar from "../DefaultAvatar";
import {Link, useParams} from "react-router-dom";
import {ImagesSlider} from "./Slider";
import {CLike} from "./Like";
import {actionGetPostById, queryPostById} from "../../graphql/queryPost";
import {CPreloaded} from "../Preloader";
import {useNavigate} from "react-router";
import BackButton from "../BackButton";
import {queryUserById} from "../../graphql/queryUserById";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {getTime} from "../../helpers";
const style = {
    flexDirection: 'unset',
    width: '100%'
};

const Post = ({post, onGetPostById, onUserById, promise, postsArr = [], getPostsByUserId}) => {
    const {_id} = useParams()
    let [currentIndex, setCurrentIndex] = useState(postsArr.findIndex((item) => item._id === _id)) //from opened post using url id
    console.log(`current index is ${currentIndex}`)
    const navigate = useNavigate()
    // console.log(post?.owner?._id + ' post owner`s id')
    useEffect(() => {
        if(postsArr.length) {
            onGetPostById(_id)
            onGetPostById(postsArr[currentIndex]._id)
        }
    }, [_id])

    useEffect(() => {
        if(_id) {
            console.log('post by id from params')
            onGetPostById(_id)
            getPostsByUserId(post?.owner?._id)
        }
    }, [_id])

     useEffect(() => {
        // onUserById(post?.owner?._id)
        getPostsByUserId(post?.owner?._id)
        setCurrentIndex(postsArr.findIndex((item) => item._id === _id))
}, [])

    console.log(postsArr)
    const toPrev = () => {
        setCurrentIndex((currentIndex) => --currentIndex)
        console.log(currentIndex)
        postsArr.length && navigate(`/post/` + postsArr[--currentIndex]._id);
    }
    const toNext = () => {
        setCurrentIndex((currentIndex) => ++currentIndex)
        console.log(currentIndex)
        postsArr.length && navigate(`/post/` + postsArr[++currentIndex]._id);  //making link path to the next post
    }
    // console.log(_id + 'post id')
    // console.log(postsArr)
    //  console.log('rerender')
    useEffect(() => {
        console.log(currentIndex)
        getPostsByUserId(post?.owner?._id)
        console.log(post)
    }, [])

    return (
        <CPreloaded promiseName='postById'>
            {postsArr.length && post?.images?.[0]?.url ?
                (
                    <div className='post-holder'>
                        <button
                            disabled={currentIndex < 1}
                            className='unstyledBtn'
                            onClick={toPrev}>
                                <ChevronLeftIcon/>
                        </button>
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
                                        {() => getTime(post?.createdAt)}
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
                        <button
                            disabled={currentIndex > postsArr.length - 2}
                            className='unstyledBtn'
                            onClick={toNext}>
                                <ChevronRightIcon />
                        </button>
                    </div>
                ) : null
            }

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
    onUserById: queryUserById, // get user by user id (userById)
    onGetPostById: actionGetPostById, // get post by its id (from useParams)
    getPostsByUserId: queryPostById // get postsArr from one user by id
})(Post);
