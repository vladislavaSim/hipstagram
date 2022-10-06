import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router";
import Button from "../Button";
import {connect} from "react-redux";
import {actionFullUploadPost} from "../../redux/actions/actions";
import {CFileUploader} from "../FileUploader";
import {TextField} from "@material-ui/core";
import {Link} from "react-router-dom";

const CreatePost = ({myId , uploadFile, onUpload, uploadPost,
                                  }, ) => {
    const [photos, setPhotos] = useState([]);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        setPhotos([])
        if (uploadFile?.status === 'RESOLVED') {
            setPhotos([...photos, uploadFile?.payload]);
        }
    }, [uploadFile, uploadPost]);
    const history = useNavigate()
    function uploadHandler() {
        onUpload(title, text, photos)
        if(myId) {
            navigate(`/profile/${myId}`)
        }
    }

    return (
        <div>
            <CFileUploader/>
            <div className="input-area">
               <div className='input-box'>
                   <TextField
                       variant="standard"
                       value={title}
                       onChange={(e) => setTitle(e.target.value)}
                       label="Title"
                   />
                   <TextField
                       variant="standard"
                       value={text}
                       onChange={(e) => setText(e.target.value)}
                       label="Text"
                   />
               </div>
            </div>
            <div className='profile-buttons'>
                <Button
                    onClick={() => {
                        uploadHandler()
                    }}
                    disabled={photos?.length === 0}
                    className='primeBtn'>
                    Send
                </Button>
                <Button className='ordinaryBtn'
                        onClick={() => history(-1)}>go back</Button>
            </div>
        </div>
    );
};

export const CCreatePost = connect(
    (state) => ({
        uploadFile: state?.promise?.uploadFile,
        uploadPost: state?.promise?.uploadPost,
        myId: state?.promise?.me?.payload?._id,
    }),
    {
        onUpload: actionFullUploadPost,
    }
)(CreatePost);