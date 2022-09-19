import React, {useState} from 'react';
import {connect} from "react-redux";
import {actionUploadFile} from "../redux/actions/actions";
import DragNDrop from "./DragNDrop";

const FileUploader = ({onUpload, isActive}) => {
    const [drag, setDrag] = useState(isActive)
    console.log(isActive)
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
export const CFileUploader = connect(null,
    {onUpload: actionUploadFile}
)(FileUploader);