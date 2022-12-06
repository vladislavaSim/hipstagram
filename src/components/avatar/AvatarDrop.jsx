import React, {useCallback, useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone'
import { connect } from 'react-redux';
import {actionSetAvatar} from "../../redux/actions/actionsMe";
import {CFileUploader} from "../uploading/FileUploader";
import {CPreloaded} from "../../helpers/Preloader";
import {store} from "../../store";

function DropzoneAvatar({ onLoadAvatar }) {
    const [file, setFile] = useState()

    const onDrop = useCallback((acceptedFiles) => {
        setSelectedFile(acceptedFiles[0]) //setting up the preview
        // onLoadAvatar(acceptedFiles[0]); //function to update avatar on server
    }, []);

    const { getRootProps, getInputProps, isDragActive, avatar } = useDropzone({ onDrop });
    console.log(avatar)
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()

    // create a preview as a side effect, whenever selected file is changed

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }
        console.log(selectedFile)
        const objectUrl = URL.createObjectURL(selectedFile)
        console.log(objectUrl)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0])
    }
    console.log(selectedFile)

//CHANGE IT TO ANOTHER EFFECT
// WHERE YOU`LL BE REDIRECTED AFTER SUCCESSFUL AVA UPDATE TO YOUR UPDATED PROFILE

    // useEffect(() => {
    //     store.dispatch(clearPromise('changeLogin'))
    //     if (changeData?.status === 'RESOLVED') {
    //         navigate(`/profile/${myId}`);
    //     }
    // }, [changeData?.status]);

    return (
        <>
            <div {...getRootProps()}>
                {selectedFile &&
                    <img src={preview}
                         alt={'preview'}
                         className='preview-img'/> }
                <input {...getInputProps()} />
                { selectedFile === undefined ?
                    <CFileUploader multiply={false}/> : null
                }
            </div>
            <button onClick={() => onLoadAvatar(selectedFile)}
                    disabled={!selectedFile}
                    className='primeBtn'>
                submit
            </button>
        </>

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