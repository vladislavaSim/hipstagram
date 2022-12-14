import React from 'react';
import Carousel from "react-material-ui-carousel";
import {backendUrl} from "../../graphql/BackendUrl";

export const ImagesSlider = ({ images }) => {
    // let keys = images.map((image) => image?._id);

    return (
       <>
            <Carousel
                navButtonsAlwaysVisible={true}
                autoPlay={false}
                navButtonsProps={{          // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
                    style: {
                        color: 'grey',
                        backgroundColor: 'white'
                    }
                }}
                className='carousel'>
                {images.map((item) => {
                    return (
                        <div className='carousel-box'
                             key={Math.random() * 1000}>
                            <img className='item'
                                src={backendUrl + item.url}/>
                        </div>
                       )})}
            </Carousel>
        </>
    );
}