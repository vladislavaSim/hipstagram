import React from 'react';
import {Link} from "react-router-dom";

const Button = ({className, onClick, pathText, pathName, children}) => {

    return (
        <button
            className={className}
            onClick={onClick}
        >
            {children}
            <Link to={`/${pathName}`}>{pathText}</Link>
        </button>
    );
};

export default Button;