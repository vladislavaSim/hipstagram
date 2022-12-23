import React, {useState} from 'react';
import {Modal} from "@mui/material";
import {Box} from "@material-ui/core";
import LikesList from "./LikesList";
import CloseIcon from "@mui/icons-material/Close";
import CommentList from "../comments/CommentList";

const style = {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    backgroundColor: 'white',
    overflowY: 'scroll',
    maxHeight: '80vh',
    minHeight: '25vh',
    flexDirection: 'unset',
};

const ModalLikes = ({likes, comments, myId, children}) => {
    const [open, setOpen] = useState(false)

    return (
        <>
            <button
                style={{width: '100%'}}
                onClick={() => setOpen(true)}
                className='unstyledBtn'>
                {children}
            </button>

            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box style={style}>
                    {likes && <LikesList likes={likes} myId={myId}/>}
                    {comments && <CommentList comments={comments}/>}
                    <div className='close-modal'>
                        <button onClick={() => setOpen(false)} className='close-modal-btn' style={{color: 'black'}}>
                            <CloseIcon style={{scale: '1.2'}}/>
                        </button>
                    </div>
                </Box>
            </Modal>
        </>
    );
};

export default ModalLikes;