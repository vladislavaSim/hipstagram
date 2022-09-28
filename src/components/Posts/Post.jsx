import React from 'react';
import {connect} from "react-redux";
import Card from "@material-ui/core/Card"
import {CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography} from "@material-ui/core";
import FavoriteIcon from '@mui/icons-material/Favorite';
import defaultAva from '../../img/default-avatar.png'

const Post = ({post, feed, feedPosts}) => {
    const timestamp = post?.createdAt;
    let date = new Date(+timestamp)
        date = date.getDate()+
        "/"+(date.getMonth()+1)+
        "/"+date.getFullYear()+
        " "+date.getHours()+
        ":"+date.getMinutes()
    console.log(feedPosts)
    return (
        <div>
            {feedPosts.map(({title, text, owner, likesCount, createdAt}) => {
                console.log(date)
                return (
                <div style={{border: "1px solid"}}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardHeader
                            avatar={
                                <img src={defaultAva} aria-label="recipe" className='avatarPic small-ava'/>
                            }
                            title={owner.login}
                            subheader={date}
                            className='post-owner'
                        />
                        {/*<CardMedia*/}
                        {/*    component="img"*/}
                        {/*    height="194"*/}
                        {/*    image="/static/images/cards/paella.jpg"*/}
                        {/*    alt="Paella dish"*/}
                        {/*/>*/}
                        <CardContent>
                            <Typography variant="body2" color="text.primary" className='post-title'>
                                {title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" className='post-text'>
                                {text}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites">
                                {likesCount ? likesCount : '0 '}
                                <FavoriteIcon />
                            </IconButton>
                        </CardActions>
                    </Card>
                    {/*<p>{title}</p>*/}
                    {/*<p>{text}</p>*/}
                    {/*<p></p>*/}
                    {/*<p></p>*/}
                </div>
            )
            })}
        </div>
    );
};

export const CPost = connect((state) => ({
    feedPosts: state?.feed?.feedPosts,
    feed: state?.feed
    })
, {})(Post);