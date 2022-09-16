import React, {useState} from 'react';

const CreatePost = () => {
    const [drag, setDrag] = useState(false)

    function dragStartHandler(e) {
        e.preventDefault()
        setDrag(true)
    }
    function dragLeaveHandler(e) {
        e.preventDefault()
        setDrag(false)
    }

    return (
        <>
            {drag
                ? <div
                    onDragStart={(e) => dragStartHandler(e)}
                    onDragOver={(e) => dragStartHandler(e)}
                    onDragLeave={(e) => dragLeaveHandler(e)}
                    className='drop-area drop-active'>drop files to download</div>
                : <div
                    onDragStart={(e) => dragStartHandler(e)}
                    onDragOver={(e) => dragStartHandler(e)}
                    onDragLeave={(e) => dragLeaveHandler(e)}
                    className='drop-area'>drag files here</div>
            }
        </>
    );
}
export default CreatePost;