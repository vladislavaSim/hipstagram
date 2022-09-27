import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {actionFullGetAllPosts} from "../../redux/actions/actions";
import {CPost} from "./Post";

const ShowPosts = ({ posts = [], getPosts, feed, state}) => {
    const [flag, setFlag] = useState(true);
    const [flagHandle, setFlagHandle] = useState(true);

    useEffect(() => {
        console.log(flag)
        if (flag && flagHandle) {
            console.log(flag)
            getPosts();
            setFlag(false);
            setFlagHandle(false);
        }
    }, [flag, flagHandle]);

    // console.log(posts)
    // console.log(feed)
    console.log(state)

    return (
        <>
            {(posts || []).map((post) => {
                console.log(posts)
                return <CPost key={post._id} post={post} />;
            })}
        </>
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