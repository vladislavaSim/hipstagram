import {actionGetPostById, queryPostById} from "../../graphql/queryPost";
import {actionUpdatePosts} from "./actionsPost";
import {gql} from "../../graphql/getgql";
import {actionPromise} from "./actionPromise";

export const actionComment = (id, text) =>
    actionPromise(
        'commentPost',
        gql(
            `mutation commentPost($comment:CommentInput){
        CommentUpsert( comment:$comment){
            _id  post{_id owner{_id}} 
        }
      }`,
            { comment: { post: { _id: id }, text: text } }
        )
    );

export const actionFullComment = (postId, text) => async (dispatch, getState) => {
    let commentId = await dispatch(actionComment(postId, text));
    console.log(commentId)
    console.log(postId)
    if (commentId) {
        let commentPost = await dispatch(actionGetPostById(postId));
        console.log(getState())
        let newPosts = (getState().feed?.feedPosts || []).map((item) =>
            item._id === commentPost._id ? commentPost : item
        );
        await dispatch(actionUpdatePosts(newPosts));
        console.log(newPosts)
        await dispatch(queryPostById(commentId?.post?.owner._id));
    }
};
