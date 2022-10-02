import React, {useEffect, useRef, useState} from 'react';
import { connect } from 'react-redux';
import {actionUserByLogin} from "../redux/actions/actions";
import {OneUserInList} from "./OneUserInList";
import {TextField} from "@mui/material";

const useDebounce = (cb, depArray, delay) => {
    const [state, setState] = useState('');
    let timeoutRef = useRef()
    timeoutRef.current = setTimeout
    useEffect(() => {
        clearInterval(timeoutRef.current)
        timeoutRef.current === undefined ? timeoutRef = -1 : timeoutRef.current = setTimeout(cb(), delay)
    }, [depArray])

    // setState(timeoutRef)
    return [state, setState];
};

const SearchByLogin = ({ user, onGetUser }) => {
    const [login, setLogin] = useDebounce(() => onGetUser(login), login, 2000);

    return (
        <form>
            <div className='search-box'>
                <TextField
                    className='small-input'
                    placeholder="search user by login"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                />
            </div>
            {user && (
                <div>
                   {user && <OneUserInList user={user} />}
                </div>
            )}
            {user === null && (
                <div>
                    <h3>User not found :(</h3>
                </div>
            )}
        </form>
    );
};

export const CSearchByLogin = connect(
    (state) => ({
        user: state?.promise?.userByLogin?.payload
    }),
    {
        onGetUser: actionUserByLogin,
    }
)(SearchByLogin);

//const InputDebounce = e = ({}) => {
//
// const [text, setText] = useState('')
//
// const timeoutRef = useRef()
//
//
// useEffect (0) => {
//
// clearInterval(timeoutRef.current)
//
// if (text)
//
// timeoutRef.current = setTimeout(() => console.log('YPА, получилось', text), 2000)
// }, [text])