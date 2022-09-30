import React, {useEffect, useRef, useState} from 'react';
import { connect } from 'react-redux';
import {actionUserByLogin} from "../redux/actions/actions";
import {OneUserInList} from "./OneUserInList";
import Button from "./Button";
import {TextField} from "@mui/material";

const SearchByLogin = ({ user, onGetUser }) => {
    const [login, setLogin] = useState('');
    const timeoutRef = useRef()
    // console.log(timeoutRef.current)
    // function formHandler(e) {
    //     e.preventDefault();
    //     onGetUser(login);
    // }

    useEffect(() => {
        timeoutRef.current = null
        clearInterval(timeoutRef.current)
        let timeout = setTimeout(() => onGetUser(login), 100)
        if (login)
            // console.log(login)
            timeoutRef.current = timeout
    }, [login])


    return (
        <form>
            <div className='search-box'>
                <TextField
                    className='small-input'
                    placeholder="search user by login"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                />
                {/*<Button*/}
                {/*    children={*/}
                {/*    <i className="material-icons">search</i>}*/}
                {/*    className='primeBtn small-btn'*/}
                {/*    />*/}
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
    (state) => ({ user: state?.promise?.userByLogin?.payload }),
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