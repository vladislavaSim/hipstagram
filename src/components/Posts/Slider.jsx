import React from 'react';
import Carousel from "react-material-ui-carousel";
import {backendUrl} from "../../graphql/BackendUrl";

export const ImagesSlider = ({ images }) => {

    return (
       <>
            <Carousel
                navButtonsAlwaysVisible={true}
                autoPlay={false}
                navButtonsProps={{
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