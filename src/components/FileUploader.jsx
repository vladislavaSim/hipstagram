import React, {useState} from 'react';
import {connect} from "react-redux";
import {actionUploadFile, actionUploadFiles} from "../redux/actions/actions";
import DragNDrop from "./DragNDrop";

const FileUploader = ({onUpload, onUploadMany, isActive, multiply}) => {
    const [drag, setDrag] = useState(isActive)

    function uploadCb(e) {
        if(multiply) {
            if(e.dataTransfer.files.length > 0 && e.dataTransfer.files.length < 9) {
                return onUploadMany(e.dataTransfer.files)
            }
        } else {
            return onUpload(e.dataTransfer.files[0])
        }
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