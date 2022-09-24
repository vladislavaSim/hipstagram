import React, {useState} from 'react';
import {connect} from "react-redux";
import {actionSetAvatar, actionUploadFile} from "../redux/actions/actions";
import DragNDrop from "./DragNDrop";

const FileUploader = ({onUpload, isActive}) => {
    const [drag, setDrag] = useState(isActive)

    function uploadCb(e) {
        // console.log(e.dataTransfer)
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
    {onUpload: actionSetAvatar}
)(FileUploader);