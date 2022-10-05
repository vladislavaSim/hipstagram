import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import TextField from '@mui/material/TextField';
import {actionFullChangeLogin} from "../redux/actions/actions";
import {useNavigate} from "react-router";
import Button from "./Button";


const Settings = ({ onChange, changeData, myId }) => {
    const navigate = useNavigate()
    const [newLogin, setNewLogin] = useState('');

    useEffect(() => {
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
        onChange: actionFullChangeLogin
    }
)(Settings);