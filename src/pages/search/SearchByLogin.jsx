import React, {useEffect, useRef, useState} from 'react';
import {connect, useDispatch} from 'react-redux';
import {OneUserInList} from "../../components/like/OneUserInList";
import {TextField} from "@mui/material";
import Button from "../../components/buttons/Button";
import {Link} from "react-router-dom";
import {queryUserByLogin} from "../../graphql/queryUserByLogin";

const useDebounce = (cb, depArray, delay) => {
    let timeoutRef = useRef()

    useEffect(() => {
        clearInterval(timeoutRef.current)
        timeoutRef.current === undefined ? timeoutRef.current = -1 : timeoutRef.current = setTimeout(cb, delay)
    }, depArray)
};

const SearchByLogin = ({ user, onGetUser, foundUsers }) => {
    const [login, setLogin] = useState('')

    useDebounce( () => onGetUser(login), [login], 2000);
console.log(foundUsers);
    return (
        <form>
            <h3>Enter login to search users</h3>
            <h4>{foundUsers.lenght < 1 && console.log('111')}</h4>
            <div className='search-box'>
                <TextField
                    style={{width: '300px', marginBottom: '25px'}}
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
        </form>
    );
};

export const CSearchByLogin = connect(
    (state) => ({
        foundUsers: state?.promise?.foundUsers?.payload,
    }),
    {
        onGetUser: queryUserByLogin,
    }
)(SearchByLogin);