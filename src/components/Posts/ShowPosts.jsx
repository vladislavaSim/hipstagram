import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {actionFullGetAllPosts} from "../../redux/actions/actions";
import {CPost} from "./Post";
import {CPreloaded} from "../Preloader";
import ScrollUpButton from "react-scroll-up-button";

const ShowPosts = ({ posts = [], getPosts, feed, state}) => {

    useEffect(() => {
            getPosts()
    }, []);


    return (
       <CPreloaded promiseName='allPosts'>
           <div style={{width: '50%'}}>
               <ScrollUpButton/>
               {posts.length ?
                   (posts || []).map((post) => {

                       return <CPost key={post._id} post={post} className={'card'}/>;
                   }) :
                   null
               }
           </div>
       </CPreloaded>
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