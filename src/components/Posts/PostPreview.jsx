import React, {useState} from 'react';
import {backendUrl} from "../../graphql/BackendUrl";
import FavoriteIcon from '@mui/icons-material/Favorite';
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import {CPost} from "./Post";
import CloseIcon from '@mui/icons-material/Close';
// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: '70%',
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     p: 4,
// };

const PostPreview = ({post, myId}) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true)
    };
    const handleClose = () => {
        setOpen(false)
    };


    return (
       <>
           <div onClick={handleOpen}>
               {
                   post?.images?.[0]?.url
                && <div className='gallery-item'>
                   <img src={backendUrl + post.images?.[0]?.url}
                        alt={'post-pic'}
                        className='gallery-img' />
                   <div className="gallery-item-info">
                       <div className="gallery-item-likes">
                           <FavoriteIcon style={{marginRight: '7px'}}/>
                           {post?.likes?.length}
                       </div>
                   </div>
               </div>
               }
           </div>
               <Modal
                   open={open}
                   onClose={handleClose}
                   closeAfterTransition
                   BackdropComponent={Backdrop}
                   BackdropProps={{
                       timeout: 500,
                   }}>
                  <>
                      <Fade in={open}>
                          <Box>
                              <button onClick={handleClose} className='close-modal-btn'>
                                  <CloseIcon id='close-modal-icon'/>
                              </button>
                              <CPost post={post}/>
                          </Box>
                      </Fade>
                  </>
               </Modal>
       </>
    );
};

export default PostPreview;