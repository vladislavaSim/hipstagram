import React from 'react';

const Button = ({children, onClick, disabled}) => {

    return (
        <button
            className="mdc-button mdc-button--unelevated loginBtn"
            onClick={onClick}
            // disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;