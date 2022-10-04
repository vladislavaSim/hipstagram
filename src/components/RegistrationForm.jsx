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

        if(promise && isLogged){
            if(login && password) {
                navigate('/profile/' + myId);
                setError('')
            } else {
                setError('Login and password cannot be empty')
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
                {<p style={{color: 'red', fontSize: '16px'}}>{error}</p>}
                <Button
                        onClick={() => onRegister(login, password)}
                        className='primeBtn'>
                    <Link to='/login'>Create account</Link>
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
    myId: state?.me?.payload?.sub?.id
    }), {
    onRegister: actionFullRegister
    }
)(RegistrationForm);