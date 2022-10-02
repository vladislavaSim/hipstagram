import React, {useCallback, useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone'
import { connect } from 'react-redux';
import {actionSetAvatar, logoutUser} from "../redux/actions/actions";
import defaultAva from '../img/default-avatar.png'
import Avatar from "./Avatar";
import DefaultAvatar from "./DefaultAvatar";
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
                <CFileUploader/>
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