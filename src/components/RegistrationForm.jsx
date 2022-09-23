import React, {useEffect, useState} from 'react';
import {TextField} from "@mui/material";
import Button from "./Button";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {actionFullRegister} from "../redux/actions/actions";
import {useNavigate} from "react-router";

const RegistrationForm = ({onRegister, isLogged, myId, promise}) => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate()
    useEffect(()=>{
        console.log(promise)
        if(promise && login && password) {
                navigate('/profile/' + myId);
                setError('')
            } else {
                setError('Login and password cannot be empty')
            }
        },[isLogged, navigate, promise])
    // useEffect(()=>{
    //     console.log(loginStatus)
    //     if(loginStatus){
    //         navigate('/profile');
    //     }
    //
    // },[loginStatus, navigate])

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
                type="password" />
            <div>
                {<p style={{color: 'red', fontSize: '16px'}}>{error}</p>}
                <Button pathName={'login'}
                        pathText='Sign in'
                        onClick={() => onRegister(login, password)}
                        className='primeBtn'/>
                <p>Already have an account? <br/>
                    <Link to='/login'>Log in</Link>
                </p>

            </div>
        </div>
    )
};

export const CRegistrationForm = connect( (state) => ({
    isLogged: state?.auth?.token,
    myId: state?.auth?.payload?.sub?.id
    }), {
    onRegister: actionFullRegister
    }
)(RegistrationForm);