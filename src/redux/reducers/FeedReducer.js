export function feedReducer(state = {}, { type, newPosts, newUsers, updateNewPost }) {
    if (type === 'ADD-POSTS') {
        return {
            ...state,
            feedPosts: state?.feedPosts ? [...state.feedPosts, ...newPosts] : [...newPosts],
        };
    }
    if (type === 'ADD-USERS') {
        return {
            ...state,
            feedUsers: state?.feedUsers ? [...state.feedUsers, ...newUsers] : [...newUsers],
        };
    }
    if (type === 'CHANGE-NEW-POST') {
        return {
            ...state,
            feedPosts: [...updateNewPost],
        };
    }
    return state;
}

export const actionAddPosts = (newPosts) => ({ type: 'ADD-POSTS', newPosts });
export const actionAddUsers = (newUsers) => ({ type: 'ADD-USERS', newUsers });
//action for update posts info after like or unlike
export const actionUpdatePosts = (updateNewPost) => ({
    type: 'CHANGE-NEW-POST',
    updateNewPost,
});