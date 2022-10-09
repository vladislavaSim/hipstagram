import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router";
import Button from "../Button";
import {connect} from "react-redux";
import {actionClearPreviewPic, actionFullUploadPost} from "../../redux/actions/actions";
import {CFileUploader} from "../FileUploader";
import {TextField} from "@material-ui/core";
import {backendUrl} from "../../graphql/BackendUrl";

const CreatePost = ({myId , uploadFile, onUpload, uploadPost, promise, onDelete} ) => {
    const [photos, setPhotos] = useState([]);
    const [preview, setPreview] = useState('')
    const [title, setTitle] = useState('');
    const [text, setText] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        setPhotos([])
        if (uploadFile?.status === 'RESOLVED') {
            setPhotos([...photos, uploadFile?.payload]);
            setPreview(backendUrl + uploadFile?.payload?.url)
        }
    }, [uploadFile, uploadPost]);

    const history = useNavigate()

    function uploadHandler() {
        onUpload(title, text, photos)
        if(myId) {
            navigate(`/profile/${myId}`)
        }
        onDelete()
    }
function getPreviewPic() {
        if(uploadFile?.payload && preview) {
            return <div>
                <img src={preview} alt='preview-pic' style={{width: '200px', height: 'auto'}}/>
                <br/>
                <button
                    onClick={() => onDelete()}
                    className='ordinaryBtn'
                    style={{marginBottom: '20px'}}>
                        reset
                </button>
            </div>
        } else {
            return <CFileUploader/>
        }
}

    function goBack() {
        onDelete()
        history(-1)
    }
    return (
        <div>
            {getPreviewPic()}
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
                <button
                    onClick={() => {
                        uploadHandler()
                    }}
                    disabled={photos?.length === 0}
                    className='primeBtn'>
                    Send
                </button>
                <Button className='ordinaryBtn'
                        onClick={() => goBack()}>go back</Button>
            </div>
        </div>
    );
};

export const CCreatePost = connect(
    (state) => ({
        promise: state?.promise,
        uploadFile: state?.promise?.uploadFile,
        uploadPost: state?.promise?.uploadPost,
        myId: state?.promise?.me?.payload?._id,
    }),
    {
        onUpload: actionFullUploadPost,
        onDelete: actionClearPreviewPic
    }
)(CreatePost);