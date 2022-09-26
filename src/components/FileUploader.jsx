import React, {useState} from 'react';
import {connect} from "react-redux";
import {actionSetAvatar, actionUploadFile} from "../redux/actions/actions";
import DragNDrop from "./DragNDrop";

const FileUploader = ({onUpload, isActive, avatar}) => {
    const [drag, setDrag] = useState(isActive)

    function uploadCb(e) {
        console.log(e.dataTransfer.files[0])
        return onUpload(e.dataTransfer.files[0])
    }

    return (
        <>
           <DragNDrop drag={drag}
                      setDrag={setDrag}
                      actionOnUpload={(e) => uploadCb(e)}/>
            {isActive ?
                <img src={`http://hipstagram.asmer.fs.a-level.com.ua/${avatar}`} alt="avatar" className='avatarPic' />
                :    <img src={`http://hipstagram.asmer.fs.a-level.com.ua/${avatar}`} alt="avatar" className='avatarPic' />
            }
        </>
    );
}
export const CFileUploader = connect((state) =>(
    {avatar: state?.promise?.me?.payload?.avatar?.url}),
    {onUpload: actionSetAvatar}
)(FileUploader);