import React, {useEffect, useRef, useState} from 'react';
import {connect, useDispatch} from 'react-redux';
import {actionFullGetUser, actionUserByLogin} from "../redux/actions/actions";
import {OneUserInList} from "./OneUserInList";
import {TextField} from "@mui/material";

const useDebounce = (cb, depArray, delay) => {
    let timeoutRef = useRef()
    // timeoutRef.current = setTimeout
    useEffect(() => {
        clearInterval(timeoutRef.current)
        timeoutRef.current === undefined ? timeoutRef.current = -1 : timeoutRef.current = setTimeout(cb, delay)
    }, depArray)
};

const SearchByLogin = ({ user, onGetUser, foundUsers, state }) => {
    const [login, setLogin] = useState('')
    useDebounce( () => onGetUser(login), [login], 2000);
    console.log(foundUsers)
    return (
        <form>
            <h3>Enter login to search users</h3>
            <div className='search-box'>
                <TextField
                    className='small-input'
                    placeholder="search user by login"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                />
            </div>

            {foundUsers  ?
                    foundUsers.map((user) => {
                        return <OneUserInList key={user._id} user={user}/>
                    })
                : null
            }


            {/*{foundUsers ? (*/}
            {/*    <>*/}
            {/*        {(foundUsers || []).map((user) => {*/}
            {/*            console.log(user)*/}
            {/*            return <OneUserInList key={user._id} user={user} />;*/}
            {/*        })}*/}
            {/*    </>*/}
            {/*) : (*/}
            {/*    <h2>Users not found :(</h2>*/}
            {/*)}*/}
        </form>
    );
};

export const CSearchByLogin = connect(
    (state) => ({
        foundUsers: state?.promise?.foundUsers?.payload,
        state: state
    }),
    {
        onGetUser: actionUserByLogin,
    }
)(SearchByLogin);