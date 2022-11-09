import React, {useCallback} from 'react';
import {useDropzone} from 'react-dropzone'
import { connect } from 'react-redux';
import {actionSetAvatar} from "../redux/actions/actionsMe";
import {CFileUploader} from "./FileUploader";

function DropzoneAvatar({ onLoadAvatar }) {

    const onDrop = useCallback((acceptedFiles) => {
        onLoadAvatar(acceptedFiles[0]);
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {
                <CFileUploader multiply={false}/>
            }
        </div>
    );
}

export const CDropzoneAvatar = connect(
    (state) => ({
        avatar: state?.promise?.me?.payload?.avatar?.url
    }),
    {
        onLoadAvatar: actionSetAvatar,
    }
)(DropzoneAvatar);