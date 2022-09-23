import React, {useEffect, useState} from 'react';
import {TextField} from "@mui/material";
import Button from "./Button";
import {Link} from "react-router-dom";
import {actionFullLogin, loginAuthUser, logoutUser} from "../redux/actions/actions";
import {useDispatch, connect} from "react-redux";
// import {, authReducer} from "../redux/reducers/authReducer";
import {useNavigate} from "react-router";
import {store} from "../redux/store";


const LoginForm = ({onLogin, isLogged, promise}) => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const navigate = useNavigate()
    useEffect(()=>{
        if(promise && isLogged){
            if(login && password) {
                navigate('/profile');
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
                <Button pathName={'login'}
                        pathText='Log in'
                        className='primeBtn'
                        onClick={() => onLogin(login, password)}
                />
                <p>Don't have an account? <br/>
                    <Link to='/registration'>Register quickly</Link>
                 </p>
            </div>
        </div>
    );
};

export const CLoginForm = connect(
    (state) => (
        {isLogged: state?.auth?.token,
        promise: state?.promise?.login
        }),
    { onLogin: actionFullLogin}
)(LoginForm);

