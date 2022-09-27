import React from 'react';
import harold from '../img/klipartz.com.png'
import {Link} from "react-router-dom";

export const NotFound = () => {

    return (
        <div style={{ margin: '20px auto 0' }}>
            <h1>Ooops!</h1>
            <h3>Page not found :(</h3>
            <Link to='/'>return</Link>
            <br/>
            <img src={harold} style={{width: '300px'}}/>
        </div>
    )
}