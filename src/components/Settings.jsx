import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import TextField from '@mui/material/TextField';
import {actionFullChangeLogin} from "../redux/actions/actionsMe";
import {useNavigate} from "react-router";
import {actionClearPromiseByName} from "../redux/actions/actionPromise";
import {store} from '../store'


const Settings = ({ onChange, changeData, myId, clearPromise }) => {
    const navigate = useNavigate()
    const [newLogin, setNewLogin] = useState('');

    useEffect(() => {
        store.dispatch(clearPromise('changeLogin'))
        if (changeData?.status === 'RESOLVED') {
           navigate(`/profile/${myId}`);
        }
    }, [changeData?.status]);

    return (
        <>
                    <TextField
                        type="text"
                        placeholder="New Login"
                        value={newLogin}
                        onChange={(e) => setNewLogin(e.target.value)}
                    />
                    <button
                        style={{marginTop: '15px'}}
                        className='primeBtn'
                        disabled={!newLogin}
                        onClick={() => onChange(newLogin)}>
                        Submit
                    </button>
        </>
    );
};

export const CSettings = connect(
    (state) => ({
        changeData: state?.promise?.changeLogin,
        myId: state?.auth?.payload?.sub?.id,
    }),
    {
        onChange: actionFullChangeLogin,
        clearPromise: actionClearPromiseByName
    }
)(Settings);