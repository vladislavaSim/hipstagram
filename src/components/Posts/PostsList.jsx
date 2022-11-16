// import React, {useState} from 'react';
// import PostPreview from "./PostPreview";
// import {connect} from "react-redux";
// import ModalWindow from "./ModalWindow";
//
//
// //  UNUSED
//
//
//
// const PostsList = ({postArr}) => {
//
//     return (
//         <div className='gallery'>
//             {(postArr || []).map((post) => {
//                 return <PostPreview post={post}
//                                  key={post._id + Math.random() * 100}
//                                  className='gallery-item'
//                     />
//             })
//             }
//         </div>
//     );
// };
//
// export const CPostsList = connect((state) =>
//     ({
//         myId: state?.promise?.me?.payload?._id,
//         myPosts: state?.promise?.postByIdUser?.payload
//     }), null
// )(PostsList)