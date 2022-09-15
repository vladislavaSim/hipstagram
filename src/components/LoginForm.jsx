import React, {useEffect, useState} from 'react';
import {TextField} from "@mui/material";
import Button from "./Button";
import {Link} from "react-router-dom";
import {actionFullLogin, loginAuthUser, logoutUser} from "../redux/actions/actions";
import {useDispatch, connect} from "react-redux";
// import {, authReducer} from "../redux/reducers/authReducer";
import {useNavigate} from "react-router";
import {store} from "../redux/store";


const LoginForm = ({onLogin, onLogout, loginStatus, promise}) => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    useEffect(()=>{
        console.log(loginStatus)
        console.log(promise)
        if(loginStatus){
            navigate('/profile');
        }
        if(promise) {
            if(promise.status === 'RESOLVED' && !promise.payload) {
                alert('ooops wrong password')
            }
        }

    },[loginStatus,navigate, promise])

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
              <Button
                    children={
                        <span className="mdc-button__label">
                             Log in
                        </span>}
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
        {loginStatus: state?.auth?.token,
        promise: state?.promise?.login
        }),
    { onLogin: actionFullLogin,
        onLogout:  logoutUser}
)(LoginForm);

