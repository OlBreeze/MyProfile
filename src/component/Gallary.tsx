import * as React from 'react';

import Carousel from './Carousel';
import Fancybox from './Fancybox';

import {images1600} from "../utils/constantsImg";
import {images600} from "../utils/constantsImg";
import {images200} from "../utils/constantsImg";

export default function Gallary() {
    return (
        <div>
            <Fancybox options={{
                Carousel: {infinite: false,},
            }}
            >
                <Carousel options={{infinite: false}}>
                    <div className="f-carousel__slide" data-fancybox="gallery"
                         data-src={images1600.doc13_1600}
                         data-thumb-src={images200.doc13_200}
                         data-caption="I am a co-author of this book (published in 2003)"
                         style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <img alt="nature"
                             src={images600.doc13} width="280" height="400"/></div>

                    <div className="f-carousel__slide" data-fancybox="gallery"
                         data-src={images1600.doc14_1600}
                         data-thumb-src={images200.doc14_200}
                         data-caption="My book Oracle Administration"
                         style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <img alt="nature"
                             src={images600.doc14} width="300" height="400"/></div>

                    <div className="f-carousel__slide" data-fancybox="gallery"
                         data-src={images1600.doc15_1600}
                         data-thumb-src={images200.doc15_200}
                         data-caption="Master’s Degree"
                         style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <img alt="nature"
                             src={images600.doc15} width="600" height="400"/></div>

                    <div className="f-carousel__slide" data-fancybox="gallery"
                         data-src={images1600.doc16_1600}
                         data-thumb-src={images200.doc16_200}
                         data-caption="INIKO center"
                         style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <img alt="nature"
                             src={images600.doc16} width="600" height="400"/></div>

                    <div className="f-carousel__slide" data-fancybox="gallery"
                         data-src={images1600.doc12_1600}
                         data-thumb-src={images200.doc12_200}
                         style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <img alt="nature"
                             src={images600.doc12} width="300" height="400"/></div>

                    <div className="f-carousel__slide" data-fancybox="gallery"
                         data-src={images1600.doc9_1600}
                         data-thumb-src={images200.doc9_200}
                         style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <img alt="nature"
                             src={images600.doc9} width="300" height="400"/></div>

                    <div className="f-carousel__slide" data-fancybox="gallery"
                         data-src={images1600.doc8_1600}
                         data-thumb-src={images200.doc8_200}
                         style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <img alt="nature"
                             src={images600.doc8} width="300" height="400"/></div>

                    <div className="f-carousel__slide" data-fancybox="gallery"
                         data-src={images1600.doc1_1600}
                         data-thumb-src={images200.doc1_200}
                         style={{display: "flex", justifyContent: "center", alignItems: "center"}}
                    >
                        <img alt="nature"
                             src={images600.doc1} width="300" height="400"/></div>


                    <div className="f-carousel__slide" data-fancybox="gallery"
                         data-src={images1600.doc2_1600}
                         data-thumb-src={images200.doc2_200}
                         style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <img alt="nature"
                             src={images600.doc2} width="300" height="400"/></div>

                    <div className="f-carousel__slide" data-fancybox="gallery"
                         data-src={images1600.doc3_1600}
                         data-thumb-src={images200.doc3_200}
                         style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <img alt="nature"
                             src={images600.doc3} width="300" height="400"/></div>

                    <div className="f-carousel__slide" data-fancybox="gallery"
                         data-src={images1600.doc4_1600}
                         data-thumb-src={images200.doc4_200}
                         style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <img alt="nature"
                             src={images600.doc4} width="300" height="400"/></div>

                    <div className="f-carousel__slide" data-fancybox="gallery"
                         data-src={images1600.doc5_1600}
                         data-thumb-src={images200.doc5_200}
                         style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <img alt="nature"
                             src={images600.doc5} width="300" height="400"/></div>

                    <div className="f-carousel__slide" data-fancybox="gallery"
                         data-src={images1600.doc7_1600}
                         data-thumb-src={images200.doc7_200}
                         style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <img alt="nature"
                             src={images600.doc7} width="300" height="400"/></div>

                    <div className="f-carousel__slide" data-fancybox="gallery"
                         data-src={images1600.doc10_1600}
                         data-thumb-src={images200.doc10_200}
                         style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <img alt="nature"
                             src={images600.doc10} width="600" height="400"/></div>

                    <div className="f-carousel__slide" data-fancybox="gallery"
                         data-src={images1600.doc11_1600}
                         data-thumb-src={images200.doc11_200}
                         style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <img alt="nature"
                             src={images600.doc11} width="600" height="400"/></div>


                </Carousel>
            </Fancybox>
        </div>
    );
}
