import React from 'react';

const DragNDrop = ({drag = false, setDrag, actionOnUpload, file}) => {

    function dragStartHandler(e) {
        e.preventDefault()
        setDrag(true)
    }
    function dragLeaveHandler(e) {
        e.preventDefault()
        setDrag(false)
    }
    function onDropHandler(e, file) {
        e.preventDefault()
        actionOnUpload(e, file)
    }
    return (
        <div>
            {drag
                ? <div
                    onDragStart={(e) => dragStartHandler(e)}
                    onDragOver={(e) => dragStartHandler(e)}
                    onDragLeave={(e) => dragLeaveHandler(e)}
                    onDrop={(e) => onDropHandler(e)}
                    className='drop-area drop-active'>drop! drop! drop!</div>
                : <div
                    onDragStart={(e) => dragStartHandler(e)}
                    onDragOver={(e) => dragStartHandler(e)}
                    onDragLeave={(e) => dragLeaveHandler(e)}
                    className='drop-area'>drag file here</div>
            }
        </div>
    );
};

export default DragNDrop;