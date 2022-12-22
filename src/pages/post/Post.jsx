import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import Card from "@material-ui/core/Card"
import {CardContent, CardMedia, Typography} from "@material-ui/core";
import {backendUrl} from "../../helpers/BackendUrl";
import Avatar from "../../components/avatar/Avatar";
import DefaultAvatar from "../../components/avatar/DefaultAvatar";
import {Link, useParams} from "react-router-dom";
import {ImagesSlider} from "./Slider";
import {CLike} from "../../components/like/Like";
import {actionGetPostById, queryPostById} from "../../graphql/queryPost";
import {CPreloaded} from "../../helpers/Preloader";
import {useNavigate} from "react-router";
import {queryUserById} from "../../graphql/queryUserById";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {actionClearPromiseByName} from "../../redux/actions/actionPromise";
import EditIcon from '@mui/icons-material/Edit';

const style = {
    flexDirection: 'unset',
    width: '100%'
};

const Post = ({post, onGetPostById, userId, promise, postsArr = [], getPostsByUserId, myId}) => {
    const {_id} = useParams()
    let [currentIndex, setCurrentIndex] = useState(postsArr.findIndex((item) => item._id === _id)) //from opened post using url id
    console.log(promise)
    const navigate = useNavigate()

    useEffect(() => {
        userId && getPostsByUserId(userId)
        if(postsArr.length) {
            onGetPostById(postsArr[currentIndex]._id)
        } else {
            getPostsByUserId(post?.owner?._id)
        }
        setCurrentIndex(postsArr.findIndex((item) => item._id === _id))
    }, [_id])


    const timestamp = post?.createdAt;
    let date = new Date(+timestamp)
    date = date.getDate()+
        "/"+(date.getMonth()+1)+
        "/"+date.getFullYear()+
        " "+date.getHours()+
        ":"+date.getMinutes()

    const toPrev = () => {
        setCurrentIndex((currentIndex) => --currentIndex)
        postsArr.length && navigate(`/post/` + postsArr[--currentIndex]._id);
    }
    const toNext = () => {
        setCurrentIndex((currentIndex) => ++currentIndex)
        postsArr.length && navigate(`/post/` + postsArr[++currentIndex]._id);  //making link path to the next post
    }

    return (
        <CPreloaded promiseName='userById'>
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
                                        {date}
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
                                    <CLike post={post} postId={post?._id} likeClass='like-brief-info'/>
                                    {
                                        post?.owner?._id === myId &&
                                        <Link
                                            onClick={() => onGetPostById(_id, 'editPost')}
                                            to='/create'>
                                            <EditIcon/>
                                        </Link>
                                    }
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
    postsArr: state?.promise?.postByIdUser?.payload,
    userId: state?.promise?.userById?.payload?._id,
    promise: state?.promise
}), {
    onUserById: queryUserById, // get user by user id (userById)
    onGetPostById: actionGetPostById, // get post by its id (from useParams)
    getPostsByUserId: queryPostById, // get postsArr from one user by id
    clearPromise: actionClearPromiseByName
})(Post);
