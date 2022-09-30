import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {actionFullGetAllPosts} from "../../redux/actions/actions";
import {CPost} from "./Post";

const ShowPosts = ({ posts = [], getPosts, feed, state}) => {
    const [flag, setFlag] = useState(true);
    const [flagHandle, setFlagHandle] = useState(true);

    useEffect(() => {
        if (flag && flagHandle) {
            getPosts();
            setFlag(false);
            setFlagHandle(false);
        }
    }, [flag, flagHandle]);

    // console.log(posts)
    // console.log(feed)
    // console.log(state)

    return (
        <div style={{width: '50%'}}>
            {posts.length ?
                (posts || []).map((post) => {
                    return <CPost key={post._id} post={post} className={'card'}/>;
                }) :
                (
                    <div>
                        <h3>Your feed is empty...</h3>
                        <h4>Let`s use search for something interesting!</h4>
                    </div>
                )
            }
        </div>
    );
};

export const CShowPosts = connect(
    (state) => ({
        state: state,
        posts: state?.feed?.feedPosts,
        feed: state?.feed
    }),
    {
        getPosts: actionFullGetAllPosts,
    }
)(ShowPosts);