import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router";
import Button from "../Button";
import {connect} from "react-redux";
import {actionClearPromise, actionFullUploadPost} from "../../redux/actions/actions";
import {CFileUploader} from "../FileUploader";
import {TextField} from "@material-ui/core";
import {backendUrl} from "../../graphql/BackendUrl";
import emptyPic from "../../img/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"
import PreviewPics from "./PreviewPics";

const CreatePost = ({myId, obj = { arr: []}, uploadFile, onUpload, uploadPost, onDelete, promise} ) => {
    const [photos, setPhotos] = useState(obj);
    const [preview, setPreview] = useState([])
    const [title, setTitle] = useState('');
    const [text, setText] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        onDelete()
        setPreview([])
    }, [])


    useEffect(() => {
        if (uploadFile?.status === 'RESOLVED') {
            console.log(uploadFile)
            // setPreview([...preview, backendUrl + uploadFile?.payload?.url])
            setPhotos({
                ...photos,
                arr: [...photos.arr, ...uploadFile?.payload],
            });

        }
        return () => onDelete()
    }, [uploadFile, uploadPost]);

    const history = useNavigate()
    console.log(preview)
    function uploadHandler() {
        onUpload(title, text, photos)
        if(myId && uploadPost?.status === 'RESOLVED') {
            navigate(`/profile/${myId}`)
        }
        // onDelete('uploadFiles')
    }

// function makeArr() {
//         let arr = []
//     for(let value of Object.values(photos.arr)) {
//         arr.push(value.url)
//     }
//     return arr
// }

    console.log(photos.arr)
    return (
        <div style={{width: '90%'}}>
            <div className='preview-box'>
                <PreviewPics photos={photos.arr}/>
                {/*<img src={backendUrl + photos.arr[0].url}/>*/}
                {/*<button*/}
                {/*    onClick={() => onDelete}*/}
                {/*    className='ordinaryBtn'*/}
                {/*    style={{marginBottom: '20px'}}>*/}
                {/*    reset*/}
                {/*</button>*/}
            </div>
            <CFileUploader multiply={true}/>
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
                               onClick={() => history(-1)}>go back</Button>
                   </div>
               </div>
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
        onDelete: actionClearPromise
    }
)(CreatePost);