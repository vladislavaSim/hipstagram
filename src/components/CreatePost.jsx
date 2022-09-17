import React, {useState} from 'react';
import {connect} from "react-redux";
import {actionUploadFile} from "../redux/actions/actions";
import DragNDrop from "./DragNDrop";

const CreatePost = ({onUpload}) => {
    const [drag, setDrag] = useState(false)

    function uploadCb(e) {
        return onUpload(e.dataTransfer.files[0])
    }

    return (
        <>
           <DragNDrop drag={drag}
                      setDrag={setDrag}
                      actionOnUpload={(e) => uploadCb(e)}/>
        </>
    );
}
export const CCreatePost = connect(null,
    {onUpload: actionUploadFile}
)(CreatePost);