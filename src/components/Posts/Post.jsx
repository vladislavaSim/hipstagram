import React from 'react';
import {connect} from "react-redux";
import Card from "@material-ui/core/Card"
import {CardActions, CardContent, CardMedia, IconButton, Typography} from "@material-ui/core";
import FavoriteIcon from '@mui/icons-material/Favorite';
import defaultAva from '../../img/default-avatar.png'
import {backendUrl} from "../../graphql/BackendUrl";

const Post = ({post, feed, feedPosts}) => {
    const timestamp = post?.createdAt;
    let date = new Date(+timestamp)
        date = date.getDate()+
        "/"+(date.getMonth()+1)+
        "/"+date.getFullYear()+
        " "+date.getHours()+
        ":"+date.getMinutes()

    return (
        <div>
            {post?.images[0]?.url ?
                (feedPosts.map(({title, text, owner, likesCount, createdAt, images}) => {
                        return (
                                <Card className='card'
                                    sx={{maxWidth: 345}}>
                                    <header className='card-header'>
                                        <div className='card-author-box'>
                                            <img src={defaultAva} aria-label="recipe" className='avatarPic small-ava' style={{marginRight: '10px'}} alt='avatar'/>
                                            <h4>{'@' + owner.login}</h4>
                                        </div>
                                        <div style={{color: '#959292'}}>{date}</div>
                                    </header>
                                    {post?.images[1] ? (
                                        <CardMedia
                                            component="img"
                                            height="580"
                                            image={`${backendUrl + images[0]?.url}`}
                                            alt="post-picture"
                                        />) : (
                                        <CardMedia
                                            component="img"
                                            height="580"
                                            image={`${backendUrl + images[0]?.url}`}
                                            alt="post-picture"
                                        />)
                                    }
                                    <CardContent>
                                        <Typography variant="body2" className='post-title'>
                                            {title}
                                        </Typography>
                                        <Typography variant="body2" className='post-text'>
                                            {text}
                                        </Typography>
                                    </CardContent>
                                    <CardActions disableSpacing>
                                        <IconButton aria-label="add to favorites">
                                            {likesCount ? likesCount : '0 '}
                                            <FavoriteIcon/>
                                        </IconButton>
                                    </CardActions>
                                </Card>
                        )
                    })
                ) : (
                    <div>
                        <h3>Your feed is empty...</h3>
                        <h4>Let`s use search for something interesting!</h4>
                    </div>
                )
            }
        </div>
    );
};

export const CPost = connect((state) => ({
        feedPosts: state?.feed?.feedPosts,
        feed: state?.feed
    })
    , {})(Post);