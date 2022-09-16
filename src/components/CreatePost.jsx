import React, {useState} from 'react';
import {connect} from "react-redux";
import {actionUploadFile} from "../redux/actions/actions";

const CreatePost = ({onUpload}) => {
    const [drag, setDrag] = useState(false)

    function dragStartHandler(e) {
        e.preventDefault()
        setDrag(true)
    }
    function dragLeaveHandler(e) {
        e.preventDefault()
        setDrag(false)
    }
    function onDropHandler(e) {
        e.preventDefault()
        onUpload(e.dataTransfer.files[0])
    }


    return (
        <>
            {drag
                ? <div
                    onDragStart={(e) => dragStartHandler(e)}
                    onDragOver={(e) => dragStartHandler(e)}
                    onDragLeave={(e) => dragLeaveHandler(e)}
                    onDrop={(e) => onDropHandler(e)}
                    className='drop-area drop-active'>drop a file to download</div>
                : <div
                    onDragStart={(e) => dragStartHandler(e)}
                    onDragOver={(e) => dragStartHandler(e)}
                    onDragLeave={(e) => dragLeaveHandler(e)}
                    className='drop-area'>drag files here</div>
            }
        </>
    );
}
export const CCreatePost = connect(null,
    {onUpload: actionUploadFile}
)(CreatePost);