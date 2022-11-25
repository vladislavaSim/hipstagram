import React from 'react';
import Carousel from "react-material-ui-carousel";
import {backendUrl} from "../../graphql/BackendUrl";

export const ImagesSlider = ({ images }) => {

    return (
       <div style={{width: '100%'}}>
            <Carousel
                navButtonsAlwaysVisible={true}
                autoPlay={false}
                navButtonsProps={{
                    style: {
                        color: 'grey'
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
        </div>
    );
}