import React, {useState} from 'react';
import {connect} from "react-redux";
import {actionUploadFile, actionUploadFiles} from "../redux/actions/actions";
import DragNDrop from "./DragNDrop";

const FileUploader = ({onUpload, onUploadMany, isActive, multiply}) => {
    const [drag, setDrag] = useState(isActive)

    function uploadCb(e) {
        console.log(e.dataTransfer.files)
        return multiply ? onUploadMany(e.dataTransfer.files) : onUpload(e.dataTransfer.files[0])
    }

    return (
        <>
           <DragNDrop drag={drag}
                      setDrag={setDrag}
                      actionOnUpload={(e) => uploadCb(e)}
                      multiply={multiply}
           />
        </>
    );
}
export const CFileUploader = connect(null,
    {
        onUploadOne: actionUploadFile,
        onUploadMany: actionUploadFiles
    }
)(FileUploader);