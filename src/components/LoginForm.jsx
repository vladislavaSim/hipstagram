import React, {useEffect, useState} from 'react';
import {TextField} from "@mui/material";
import Button from "./Button";
import {Link} from "react-router-dom";
import {actionFullLogin} from "../redux/actions/actions";
import {connect} from "react-redux";
import {useNavigate} from "react-router";

const LoginForm = ({onLogin, isLogged, promise, myId}) => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const navigate = useNavigate()
    useEffect(() => {
        if(promise && isLogged){
            if(login && password) {
                navigate('/profile/' + myId);
                setErrorMessage('')
            } else {
                setErrorMessage('Login and password cannot be empty')
            }
        }
        if(promise) {
            if(promise.status === 'RESOLVED' && !promise.payload) {
                setErrorMessage('Please, enter correct login and password')
            }
        }
    },[isLogged, navigate, promise])

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
                {<p style={{color: 'red', fontSize: '16px'}}>{errorMessage}</p>}
                <Button
                        className='primeBtn'
                        onClick={() => onLogin(login, password)}>
                    <Link to={'/login'}>Log in</Link>
                </Button>
                <p>Don't have an account? <br/>
                    <Button className='ordinaryBtn'>
                        <Link to='/registration'>Register quickly</Link>
                    </Button>
                 </p>
            </div>
        </div>
    );
};

export const CLoginForm = connect(
    (state) => ({
        isLogged: state?.auth?.token,
        promise: state?.promise?.login,
        myId: state?.auth?.payload?.sub?.id
        }),
    { onLogin: actionFullLogin}
)(LoginForm);
