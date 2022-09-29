import React, {useCallback, useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone'
import { connect } from 'react-redux';
import {actionSetAvatar, logoutUser} from "../redux/actions/actions";
import defaultAva from '../img/default-avatar.png'
import Avatar from "./Avatar";
import DefaultAvatar from "./DefaultAvatar";
function DropzoneAvatar({ onLoadAvatar, avatar }) {

    const onDrop = useCallback((acceptedFiles) => {
        onLoadAvatar(acceptedFiles[0]);
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {avatar ?
                <Avatar url={avatar}/> : <DefaultAvatar />
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