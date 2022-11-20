import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import {CPost} from "./Post";
import React from "react";

const ModalWindow = ({post, open, setOpen, scale}) => {
    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}>
            <>
                <Fade in={open}>
                    <Box>
                        <button onClick={() => setOpen(false)} className='close-modal-btn'>
                            <CloseIcon style={{scale: '1.2'}}/>
                        </button>
                        {/*<CPost post={post}/>*/}
                    </Box>
                </Fade>
            </>
        </Modal>
    )
}
export default ModalWindow;