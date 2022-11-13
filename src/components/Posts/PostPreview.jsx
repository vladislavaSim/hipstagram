import React, {useState} from 'react';
import {backendUrl} from "../../graphql/BackendUrl";
import FavoriteIcon from '@mui/icons-material/Favorite';
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import {CPost} from "./Post";
import CloseIcon from '@mui/icons-material/Close';
import BurstModeIcon from '@mui/icons-material/BurstMode';

const multiIcon = {
    position: 'absolute',
    top: '5%',
    right: '5%',
    transform: 'scale(1.4)'
};

const scale = {
    transform: 'scale(1.4)',
    marginRight: '15px'
}

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
                   <>
                       <img src={backendUrl + post.images?.[0]?.url}
                            alt={'post-pic'}
                            className='gallery-img' />
                       {
                           post?.images.length > 1
                       && <BurstModeIcon style={multiIcon}/>
                       }

                   </>
                   <div className="gallery-item-info">
                       <div className="gallery-item-likes">
                           <FavoriteIcon style={scale}/>
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
                                  <CloseIcon style={scale}/>
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