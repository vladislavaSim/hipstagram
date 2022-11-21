import React, {useState} from 'react';
import {Modal, Typography} from "@mui/material";
import {Box} from "@material-ui/core";
import LikesList from "./LikesList";
import CloseIcon from "@mui/icons-material/Close";

const style = {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    backgroundColor: 'white',
    // boxShadow: '1px 2px 24px #0000008c',
    flexDirection: 'unset',
};

const ModalLikes = ({likes, myId, children}) => {
    const [open, setOpen] = useState(false)

    return (
        <>
            <button onClick={() => setOpen(true)}
                className='unstyledBtn'>
                {children}
            </button>

            <Modal
                // style={style}
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box style={style}>
                    <button onClick={() => setOpen(false)} className='close-modal-btn' style={{color: 'black'}}>
                        <CloseIcon style={{scale: '1.2'}}/>
                    </button>
                    <LikesList likes={likes} myId={myId}/>
                </Box>
            </Modal>
        </>
    );
};

export default ModalLikes;