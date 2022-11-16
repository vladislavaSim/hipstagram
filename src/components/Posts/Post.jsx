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

const Post = ({post = [], onGetPostById, myId, promise}) => {

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

    console.log(promise)


    const {_id} = useParams()

    useEffect(() => {
        onGetPostById(_id)
        console.log(post)
        if(post?._id) {


            getTime(post?.createdAt)
        }
    }, [_id])


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
                                           <div style={{color: '#959292', fontSize: '18px'}}>{() => getTime(post?.createdAt)}</div>
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
                                                    style={{bottom: '0'}}>

                                           <CLike postId={post?._id} />
                                       </CardActions>
                                    </div>
                                </Card>
                    ) : null
            }
        </>
    );
}

export const CPost = connect((state) => ({
    myId: state?.promise?.me?.payload?._id,
    promise: state?.promise,
    feedPosts: state?.feed?.feedPosts,
    feed: state?.feed,
    post: state?.promise?.postById?.payload
}), {
    onGetPostById: actionGetPostById
})(Post);