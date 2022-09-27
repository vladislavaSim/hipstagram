import React, { useState } from 'react';
import { connect } from 'react-redux';
import {actionUserByLogin} from "../redux/actions/actions";
import {OneUserInList} from "./OneUserInList";
import Button from "./Button";
import {TextField} from "@mui/material";

const SearchByLogin = ({ user, onGetUser }) => {
    const [login, setLogin] = useState('');


    function formHandler(e) {
        e.preventDefault();
        onGetUser(login);
    }
    return (
        <form onSubmit={(e) => formHandler(e)}
        >
            <div className='search-box'>
                <TextField
                    className='small-input'
                    placeholder="search user by login"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                />
                <Button
                    children={
                    <i className="material-icons">search</i>}
                    className='primeBtn small-btn'
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
    (state) => ({ user: state?.promise?.userByLogin?.payload }),
    {
        onGetUser: actionUserByLogin,
    }
)(SearchByLogin);