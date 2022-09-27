import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {actionFullGetUsers} from "../redux/actions/actions";
import {UserCardFromSearch} from "./UserCardFromSearch";
import {CSearchByLogin} from "./SearchByLogin";

const Search = ({ users = [], onGetUsers, feed}) => {
    const [flag, setFlag] = useState(true);
    const [flagControl, setFlagControl] = useState(true);
    console.log(feed)
    useEffect(() => {
        if (flag && flagControl) {
            onGetUsers();
            setFlag(false);
            setFlagControl(false);
        }
    }, [flag, flagControl]);

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler);
        setFlagControl(true);

        return () => {
            document.removeEventListener('scroll', scrollHandler);
        };
    }, [users]);

    function scrollHandler(e) {
        if (
            e.target.documentElement.scrollHeight -
            (e.target.documentElement.scrollTop + window.innerHeight) <
            200
        ) {
            setFlag(true);
        }
    };
    return (
        <>
            <CSearchByLogin />
        </>
    );
};

export const CSearch = connect((state) => ({
    feed: state?.feed,
    users: state?.feed?.feedUsers }), {
    onGetUsers: actionFullGetUsers,
})(Search);