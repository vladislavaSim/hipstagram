import React, {useEffect, useState} from 'react';
import {TextField} from "@mui/material";
import Button from "./Button";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {actionFullRegister} from "../redux/actions/actions";
import {useNavigate} from "react-router";

const RegistrationForm = ({onRegister, isLogged, myId, promise, status}) => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    console.log(status)
    function regHandler() {
        if(login && password) {
            onRegister(login, password)
            setError('')
        } else {
            setError('Login and password cannot be empty')
        }
    }

    const navigate = useNavigate()
    useEffect(() => {
        // if(promise && isLogged){
            if(login && password && status === 'RESOLVED' && myId) {
                navigate('/profile/' + myId);
         }
    },[status, login, password, myId])
    console.log(myId)
    return (
        <div className='loginBox'>
            <h3>Welcome to Hipstagram!</h3>
            <TextField
                variant="standard"
                label="Username"
                value={login}
                onChange={(e) => setLogin(e.target.value)}/>
            <TextField
                variant="filled"
                label="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}/>
            <div>
                {<p style={{color: 'red', fontSize: '16px'}}>{error}</p>}
                <Button
                        onClick={() => regHandler()}
                        className='primeBtn'>
                        Create account
                </Button>
                <p>Already have an account? <br/>
                    <Button className='ordinaryBtn'>
                        <Link to='/login'>Log in</Link>
                    </Button>
                </p>

            </div>
        </div>
    )
};

export const CRegistrationForm = connect( (state) => ({
    promise: state?.promise,
    auth: state?.auth,
    isLogged: state?.auth?.token,
    myId: state?.promise?.me?.payload?._id,
    status: state?.promise?.login?.status
    }),
    {onRegister: actionFullRegister}
)(RegistrationForm);