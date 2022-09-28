import React, {useCallback, useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone'
import { connect } from 'react-redux';
import {actionSetAvatar, logoutUser} from "../redux/actions/actions";
import defaultAva from '../img/default-avatar.png'
import Avatar from "./Avatar";
import DefaultAvatar from "./DefaultAvatar";
function DropzoneAvatar({ onLoadAvatar, avatar }) {
    // const [ava, setAva] = useState(defAva)
    const onDrop = useCallback((acceptedFiles) => {
        onLoadAvatar(acceptedFiles[0]);
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
    //
    // useEffect(() => {
    //     if(avatar) {
    //         setAva(`http://hipstagram.asmer.fs.a-level.com.ua/${avatar}`)
    //     }
    // }, [avatar])

    // console.log(ava)
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