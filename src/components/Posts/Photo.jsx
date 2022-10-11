import React, {forwardRef} from 'react';

export const Photo = forwardRef(({url, index, faded, ...props}, ref) => {

    return <div ref={ref} {...props}>
        <img src={url} className='preview-img'/>
    </div>;
});
