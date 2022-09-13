import React, {useEffect, useState} from 'react';
import {TextField} from "@mui/material";
import Button from "./Button";
import {Link} from "react-router-dom";

const RegistrationForm = () => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')


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
                <Button
                    children={
                        <span className="mdc-button__label">
                             Sign up
                        </span>}
                />
                <p>Already have an account? <br/>
                    <Link to='/login'>Log in</Link>
                </p>
            </div>
        </div>
    );
};

export default RegistrationForm;