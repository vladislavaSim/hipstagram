import {querySubscribe, queryUnSubscribe} from "../../graphql/querySubscribe";
import {queryUserById} from "../../graphql/queryUserById";
import {actionAboutMe} from "./actionsMe";

export const actionFullSubscribe = (id, userId) => async (dispatch, getState) => {
    let prevFollowers = (getState().promise?.me?.payload?.following || []).map((item) => ({
        _id: item._id,
    }));

    let followingId = await dispatch(querySubscribe(id, userId, prevFollowers));
    if (followingId) {
        Promise.all([dispatch(queryUserById(userId)), dispatch(actionAboutMe())]);
    }
};


export const actionFullUnSubscribe = (id, userId) => async (dispatch, getState) => {
    let prevFollowingsFiltered = (getState().promise?.me?.payload?.following || []).filter(
        (item) => item._id !== userId
    );

    let prevFollowings = (prevFollowingsFiltered || []).map((item) => ({
        _id: item._id,
    }));

    if (prevFollowings) {
        await dispatch(queryUnSubscribe(id, prevFollowings));
        Promise.all([dispatch(queryUserById(userId)), dispatch(actionAboutMe())]
        )
    }
};

