import React, {useState} from 'react';
import Post from "./Post";
import Button from "./Button";
import CreatePost from "./CreatePost";

const Profile = () => {
    let [newPost, setNewPost] = useState(false)

    function newPostToggle() {
        return setNewPost(!newPost)
    }

    return (
        <div>
            profile
            <Button children={newPost ? 'Cancel' : 'New Post'} onClick={() => newPostToggle()}/>
            {/*<Post />*/}
            {newPost ? <CreatePost /> : null}
        </div>
    );
};

export default Profile;