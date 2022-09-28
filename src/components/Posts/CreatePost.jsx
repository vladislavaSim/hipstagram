import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router";
import Button from "../Button";
import {connect} from "react-redux";
import {actionFullUploadPost} from "../../redux/actions/actions";
import {CFileUploader} from "../FileUploader";
import {TextField} from "@material-ui/core";

const CreatePost = ({obj = { array: [] }, uploadFile, editPost, onUpload, uploadPost,
                                  }) => {
    const [photos, setPhotos] = useState(obj);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('')

    console.log(obj)
    const navigate = useNavigate()

    useEffect(() => {
        setPhotos({array: []})
        if (uploadFile?.status === 'RESOLVED') {
            console.log(uploadFile?.payload)
            console.log(photos.array)
            setPhotos({
                ...photos, array: [...photos.array, uploadFile?.payload],
            });
        }
    }, [uploadFile, uploadPost]);

    return (
        <div>
            <CFileUploader/>
            <div className="input-area">
               <div>
                   <TextField
                       value={title}
                       onChange={(e) => setTitle(e.target.value)}
                       placeholder="title"
                   />
                   <TextField
                       value={text}
                       onChange={(e) => setText(e.target.value)}
                       placeholder="text"
                   />
               </div>
            </div>
            <Button
                onClick={() => {
                    onUpload(title, text, photos.array)
                }}
                disabled={photos?.array?.length === 0}
               className='primeBtn'>
                Add post
            </Button>
        </div>
    );
};

export const CCreatePost = connect(
    (state) => ({
        uploadFile: state?.promise?.uploadFile,
        uploadPost: state?.promise?.uploadPost,
    }),
    {
        onUpload: actionFullUploadPost,
    }
)(CreatePost);