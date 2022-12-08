import { connect } from 'react-redux';
import loading from '../img/Loading_icon.gif'
import React from "react";

const Preloaded = ({ promiseName, promiseState, children }) => (
    <>
        {promiseState[promiseName]?.status === 'RESOLVED' ? (
            children
        ) : promiseState[promiseName]?.status === 'REJECTED' ? (
            <h1 style={{color: 'red'}}>Error loading</h1>
        ) : (
            <img style={{display: 'block', margin: '0 auto', marginBottom: '200px', padding: '10px'}}
                 src={loading} width="400px" height="auto" alt='loading-gif'/>
        )}
    </>
);

export const CPreloaded = connect((state) => ({
        promiseState: state.promise }
))(Preloaded);