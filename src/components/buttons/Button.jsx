import React from 'react';
import {Link} from "react-router-dom";

const Button = ({className, onClick, children}) => {

    return (
        <button
            className={className}
            onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;