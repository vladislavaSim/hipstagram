import {useNavigate} from "react-router";
import Button from "../../components/buttons/Button";
import {connect} from "react-redux";
import {actionFullUploadPost} from "../../redux/actions/actionsPost";
import {actionClearPromise} from '../../redux/actions/actionPromise'
import {CFileUploader} from "../../components/uploading/FileUploader";
import {TextField} from "@material-ui/core";
import React, {useEffect, useMemo, useState} from "react";
import {DndContext, closestCenter, DragOverlay} from "@dnd-kit/core";

import {
    arrayMove,
    rectSortingStrategy,
    SortableContext,
    useSortable
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {backendUrl} from "../../helpers/BackendUrl";
import {Photo} from "../../components/uploading/Photo";
import {actionGetPostById} from "../../graphql/queryPost";

export function SortableItem(props) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({ id: props.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
        >
            <img src={backendUrl + props.url} alt={'preview-pic'} className='preview-img'/>
        </div>
    );
}

 function PreviewPics({myId, uploadFile, onUpload, uploadPost, onDelete, onGetPostById, editPost}) {

     const [activeId, setActiveId] = useState(null);
     const [photos, setPhotos] = useState([]);
     const [title, setTitle] = useState('');
     const [text, setText] = useState('')

     const navigate = useNavigate()

     useEffect(() => {
         if (uploadFile?.status === 'RESOLVED') {
            try{
               setPhotos([...photos, ...uploadFile?.payload]);
            } catch (e) {
                console.log(e)
            }
         }
         if(uploadFile === null){
             setPhotos([])
         }

     }, [uploadFile]);

    useEffect(() => {
        if(uploadPost) {
            if(myId && uploadPost?.status === 'RESOLVED') {
                navigate(`/profile/${myId}`)
            }
        }
    }, [uploadPost])

     useEffect(() => {
         if (editPost?.status === 'RESOLVED') {
             setPhotos(editPost?.payload?.images);
             setTitle(editPost?.payload?.title)
             setText(editPost?.payload?.text)
         }
     }, [editPost]);

     function uploadHandler() {
         onUpload(title, text, photos, editPost?.payload?._id)
     }
//getting ids for dnd
    const itemIds = useMemo(() => photos.map((item) => item.id), [photos]);

    function handleDragStart(event) {
        setActiveId(event.active.id);
    }

    function handleDragEnd(event) {
        const { active, over } = event;

        if (active.id !== over.id) {
            setPhotos((items) => {
                const oldIndex = items.findIndex((item) => item._id === active.id);
                const newIndex = items.findIndex((item) => item._id === over.id);

                return arrayMove(items, oldIndex, newIndex);
            });
        }
    }

    function handleDragCancel() {
        setActiveId(null);
    }

    return (
       <div style={{width: '90%'}}>
           <DndContext
               collisionDetection={closestCenter}
               onDragStart={handleDragStart}
               onDragEnd={handleDragEnd}
               onDragCancel={handleDragCancel}
           >
               <SortableContext items={itemIds} strategy={rectSortingStrategy}>
                   <div className={'preview-box'}>
                       {photos.map((item) => (
                           <SortableItem key={Math.random() * 1000} id={item._id} url={item.url}/>
                       ))}
                   </div>
               </SortableContext>

               <DragOverlay adjustScale={true}>
                   {photos && activeId ? (
                       <Photo
                           src={backendUrl + photos.find(item => item._id === activeId).url}
                           index={photos.indexOf(activeId)} />
                   ) : null}
               </DragOverlay>
           </DndContext>
           <div>
               <div className='preview-box'>
                   {
                       photos.length > 0 &&
                       <button
                           onClick={() => onDelete()}
                           className='ordinaryBtn'
                           style={{marginBottom: '20px'}}>
                           reset
                       </button>
                   }
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
                                   onClick={() => navigate(-1)}>go back</Button>
                       </div>
                   </div>
               </div>

           </div>
       </div>
    );
}

export const CCreatePost = connect(
    (state) => ({
        uploadFile: state?.promise?.uploadFile,
        uploadPost: state?.promise?.uploadPost,
        myId: state?.promise?.me?.payload?._id,
        post: state?.promise?.postById?.payload,
        editPost: state?.promise?.editPost
    }),
    {
        onUpload: actionFullUploadPost,
        onDelete: actionClearPromise,
        onGetPostById: actionGetPostById
    }
)(PreviewPics);