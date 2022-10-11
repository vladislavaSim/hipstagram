import React from 'react';
import Carousel from "react-material-ui-carousel";
import {backendUrl} from "../../graphql/BackendUrl";

export const ImagesSlider = ({ images }) => {
    let keys = images.map((image) => image?._id);

    return (
       <>
            <Carousel navButtonsAlwaysVisible={true} autoPlay={false} className='carousel'>
                {images.map((item, i) => {
                    return (
                        <div className='carousel-box'>
                            <img className='item'
                                key={keys[i]}
                                src={backendUrl + item.url}/>
                        </div>
                       )})}
            </Carousel>
        </>
    );
}