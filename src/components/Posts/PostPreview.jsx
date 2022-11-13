import React, {useState} from 'react';
import {backendUrl} from "../../graphql/BackendUrl";
import FavoriteIcon from '@mui/icons-material/Favorite';
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const PostPreview = ({post, myId}) => {
    const [open, setOpen] = useState(false);

    console.log(open)
    const handleOpen = () => {
        setOpen(true)
        console.log(open)
    };
    const handleClose = () => {
        setOpen(false)
        console.log(open)
    };


    return (
       <>
           <div onClick={handleOpen}>
               {/*<Link key={post?._id} to={`/post/${post?._id}`}>*/}
               {post?.images?.[0]?.url
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
                   {/*{open && <CModalPost id={post._id} setOpen={setOpen} open={open}/>}*/}
               </div>
               }
               {/*// </Link>*/}

           </div>

               <Modal
                   // aria-labelledby="transition-modal-title"
                   // aria-describedby="transition-modal-description"
                   open={open}
                   onClose={handleClose}
                   closeAfterTransition
                   BackdropComponent={Backdrop}
                   BackdropProps={{
                       timeout: 500,
                   }}>
                   <Fade in={open}>
                   <Box sx={style}>
                       <button onClick={handleClose}>x</button>
                   </Box>
                   </Fade>
               </Modal>
       </>
    );
};

export default PostPreview;