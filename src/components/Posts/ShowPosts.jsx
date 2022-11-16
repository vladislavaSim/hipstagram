import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {actionFullGetAllPosts} from "../../redux/actions/actionsPost";
import {CPreloaded} from "../Preloader";
import ScrollUpButton from "react-scroll-up-button";
import {CFeedPost} from "./FeedPost";

const ShowPosts = ({ posts = [], getPosts}) => {

    useEffect(() => {
            getPosts()
    }, []);


    return (
       <CPreloaded promiseName='allPosts'>
           <div style={{width: '50%'}}>
               <ScrollUpButton ContainerClassName="up-btn"/>
               {posts.length ?
                   (posts || []).map((post) => {
                       return <CFeedPost key={post._id} post={post} className={'card'}/>;
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