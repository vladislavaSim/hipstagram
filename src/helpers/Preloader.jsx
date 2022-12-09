import { connect } from 'react-redux';
import loading from '../img/Loading_icon.gif'
import React from "react";
import ghost from '../img/VzFL.gif'

const Preloaded = ({ promiseName, promiseState, children }) => (
    <>
        {promiseState[promiseName]?.status === 'RESOLVED' ? (
            children
        ) : promiseState[promiseName]?.status === 'REJECTED' ? (
            <div>
                <h1 style={{color: 'red'}}>Error loading :(</h1>
                <h4>Please, check your internet connection</h4>
                <img src={ghost} alt='error-gif'/>
            </div>
        ) : (
            <img style={{display: 'block', margin: '0 auto', marginBottom: '200px', padding: '10px'}}
                 src={loading} width="400px" height="auto" alt='loading-gif'/>
        )}
    </>
);

export const CPreloaded = connect((state) => ({
        promiseState: state.promise
}
))(Preloaded);