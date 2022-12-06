import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {actionFullGetAllPosts} from "../../redux/actions/actionsPost";
import {CPreloaded} from "../../helpers/Preloader";
import ScrollUpButton from "react-scroll-up-button";
import {CFeedPost} from "./FeedPost";

const ShowPosts = ({ posts = [], getPosts}) => {

    useEffect(() => {
            getPosts()
    }, []);


    return (
       <CPreloaded promiseName='allPosts'>
           <div
               style={{width: '50%'}}>
               <ScrollUpButton ContainerClassName="up-btn"/>
               {posts.length ?
                   (posts || []).map((post) => {
                       return <CFeedPost key={post._id + Math.random() * 100} post={post} className={'card'}/>;
                   }) :
                   <h3>Your feed seems to be empty... <br/>
                        Let's find someone to follow!
                   </h3>
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