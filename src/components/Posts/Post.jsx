import React from 'react';
import {connect} from "react-redux";

const Post = ({feed, feedPosts}) => {
    console.log(feedPosts)
    return (
        <div>
            {feedPosts.map(({title, text, owner, likesCount}) => {
                return (
                <div style={{border: "1px solid"}}>
                    <p>{title}</p>
                    <p>{text}</p>
                    <p>{owner.login}</p>
                    <p>{likesCount ? likesCount : '0 likes'}</p>
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