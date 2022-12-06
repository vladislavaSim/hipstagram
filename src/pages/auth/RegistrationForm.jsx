import React, {useEffect, useState} from 'react';
import {IconButton, TextField} from "@mui/material";
import Button from "../../components/buttons/Button";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {actionFullRegister} from '../../redux/actions/actionsAuth';
import {useNavigate} from "react-router";
import {Visibility, VisibilityOff} from "@material-ui/icons";

const RegistrationForm = ({onRegister, myId, status}) => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [showPass, setShowPass] = useState(false)
    const [passAgain, setPassAgain] = useState('')
    const [valid, setValid] = useState(false)

    const navigate = useNavigate()
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/

    function regHandler() {
        if(login && password && passAgain) {
            if(password !== passAgain) {
                setError('Please, repeat the password correctly')
                setValid(false)
            } else {
                if(password.match(regex)) {
                    setError('')
                    setValid(true)
                    onRegister(login, password)
                } else {
                    setError('The password must contain at least 8 chars lower and uppercase and one number')
                    setValid(false)
                }
            }
        } else {
            setError('All the fields cannot be empty')
            setValid(false)
        }
    }

    useEffect(() => {
            if(valid && status === 'RESOLVED' && myId) {
                navigate('/profile/' + myId);
         }
    },[status, myId])

    return (
        <div className='loginBox'>
            <h3>Welcome to Hipstagram!</h3>
            <TextField
                variant="standard"
                label="Username"
                value={login}
                onChange={(e) => setLogin(e.target.value)}/>
            <TextField
                variant="standard"
                label="Password"
                type={showPass ? 'text' : 'password'}
                onChange={(e) => setPassword(e.target.value)}/>
            <TextField
                variant="standard"
                label="Password again"
                type={showPass ? 'text' : 'password'}
                onChange={(e) => setPassAgain(e.target.value)}/>
            <div>

                <div style={{marginTop: '15px'}}>
                    <IconButton
                        style={{position: 'absolute', right: '120px', top: '233px'}}
                        aria-label="toggle password visibility"
                        onClick={() => setShowPass(!showPass)}>
                        {showPass ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                        <p style={{color: 'red', fontSize: '16px'}}>{error}</p>
                    <button
                            onClick={() => regHandler()}
                            className={'primeBtn'}>
                            Create account
                    </button>
                    <p>Already have an account? <br/>
                        <Button
                            className='ordinaryBtn'>
                            <Link to='/login'>Log in</Link>
                        </Button>
                    </p>
            </div>
        </div>
        </div>
    )
};


export const CRegistrationForm = connect( (state) => ({
    myId: state?.promise?.me?.payload?._id,
    status: state?.promise?.login?.status
    }),
    {onRegister: actionFullRegister}
)(RegistrationForm);