import React from 'react';
import {connect} from "react-redux";
import {actionFullGetUsers} from "../redux/actions/actions";
import {UserCardFromSearch} from "./UserCardFromSearch";

const ExploreUsers = ({users}) => {
    console.log(users)
    return (
        <div>
            {users.map((user) => {
                return <UserCardFromSearch key={user._id} user={user} />;
            })}
        </div>
    );
};

export const CExploreUsers = connect((state) => ({
    feed: state?.feed,
    users: state?.feed?.feedUsers }), {
    onGetUsers: actionFullGetUsers,
})(ExploreUsers);