import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {
    actionAboutMe,
    actionFullSubscribe,
    actionFullUnSubscribe,
    actionPostById,
    actionSetAvatar
} from "../redux/actions/actions";
import {actionUserById} from "../graphql/userById";
import Button from "./Button";
import {Link} from "react-router-dom";
import {CPost} from "./Posts/Post";
import {CDropzoneAvatar} from "./AvatarDrop";
import Avatar from "./Avatar";
import DefaultAvatar from "./DefaultAvatar";
import {backendUrl} from "../graphql/BackendUrl";

const MyProfile = ({promise, myLogin, myPosts, myAvatar, myFollowing, myFollowers, myId, getPostById}) => {
    const [isEditing, setIsEditing] = useState(false);
    console.log(isEditing + ' is Editing')

    useEffect(() => {
        if(myId) {
            getPostById(myId)
        }
    }, [])
    function getLengthNum (array, text) {
        let num = !array ? '0' : array.length
        return num + ' ' + text
    }
    function setOrShowAvatar(){
        if(isEditing) {
            return <CDropzoneAvatar/>
        } else {
            if(myAvatar) {
                return <Avatar url={myAvatar} className='avatarPic'/>
            } else {
                return <DefaultAvatar/>
            }
        }
    }

    console.log(myPosts)
    console.log(promise)
    return (
        <>
            <div className='profile-box'>
                <div className="avatar">
                    {setOrShowAvatar()}
                </div>
                <div className='profile-info-box'>
                    <h3> <span>{`${myLogin ? myLogin : 'no name'}`}</span></h3>
                    <div>
                        <div className='profile-buttons'>
                            <div>
                                <Button className='primeBtn'>
                                    <Link to='/create'>Add post</Link>
                                </Button>
                            </div>
                            <Button children={isEditing ? 'Cancel' : 'Edit profile'}
                                    className='primeBtn'
                                    onClick={() => setIsEditing(!isEditing)}/>
                        </div>
                        <div className='profile-nums'>
                            <Button className='ordinaryBtn'>
                                <Link to={`/followers/${myId}`}>
                                    <div>{getLengthNum(myFollowers,'followers')}</div>
                                </Link>
                            </Button>
                            <Button className='ordinaryBtn'>
                                <Link to={`/following/${myId}`}>
                                    <div>{getLengthNum(myFollowing,'followings')}</div>
                                </Link>
                            </Button>
                            <Button className='ordinaryBtn'>
                                <div>{getLengthNum(myPosts,'posts')}</div>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='gallery'>
                {(myPosts || []).map((post) => {
                    console.log(post?.owner?.login, myLogin)
                    return <CPost key={post._id} post={post} className='gallery-item'/>;
                })}
                    {/*{(posts || []).map((post) => {*/}
                    {/*    {*/}
                    {/*        return post?.images?.[0]?.url ?*/}
                    {/*            <div key={post?._id} className={'card-item'}>*/}
                    {/*                <img src={`${backendUrl + post?.images?.[0]?.url}`} alt='post-picture'/>*/}
                    {/*            </div> : null*/}
                    {/*        // return <CPost key={post._id} post={post} cardClassName={'card-item'}/>;*/}
                    {/*    }}*/}
                    {/*)}*/}
            </div>
        </>
    );
};

export const CMyProfile = connect((state) => ({
    promise: state.promise,
    auth: state.auth,
    me: state.promise?.me,
    myId: state?.promise?.me?.payload?._id,
    myFollowing: state?.promise?.me?.payload?.following,
    myFollowers: state?.promise?.me?.payload?.followers,
    myAvatar: state?.promise?.me?.payload?.avatar?.url,
    myLogin: state?.promise?.me?.payload?.login,
    myPosts: state?.promise?.postByIdUser?.payload

}), {
    getAboutMe: actionAboutMe,
    setAvatar: actionSetAvatar,
    onUserById: actionUserById,
    onFollow: actionFullSubscribe,
    onUnfollow: actionFullUnSubscribe,
    getPostById: actionPostById
})(MyProfile);