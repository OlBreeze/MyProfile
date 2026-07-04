import * as React from 'react';

import Carousel from './Carousel';
import Fancybox from './Fancybox';

import {images1600, images600, images200} from "../utils/constantsImg";

interface Slide {
    full: string;
    src: string;
    thumb: string;
    caption?: string;
    alt: string;
    width: number;
}

const slides: Slide[] = [
    {full: images1600.doc13_1600, src: images600.doc13, thumb: images200.doc13_200, caption: "I am a co-author of this book (published in 2003)", alt: "Book co-authored by Olga", width: 280},
    {full: images1600.doc14_1600, src: images600.doc14, thumb: images200.doc14_200, caption: "My book Oracle Administration", alt: "Oracle Administration book", width: 300},
    {full: images1600.doc15_1600, src: images600.doc15, thumb: images200.doc15_200, caption: "Master’s Degree", alt: "Master's degree diploma", width: 600},
    {full: images1600.doc16_1600, src: images600.doc16, thumb: images200.doc16_200, caption: "INIKO center", alt: "INIKO center certificate", width: 600},
    {full: images1600.doc12_1600, src: images600.doc12, thumb: images200.doc12_200, alt: "Certificate, 2023", width: 300},
    {full: images1600.doc9_1600, src: images600.doc9, thumb: images200.doc9_200, alt: "Certificate, 2024", width: 300},
    {full: images1600.doc8_1600, src: images600.doc8, thumb: images200.doc8_200, alt: "Certificate, 2022", width: 300},
    {full: images1600.doc1_1600, src: images600.doc1, thumb: images200.doc1_200, alt: "Certificate, 2018", width: 300},
    {full: images1600.doc2_1600, src: images600.doc2, thumb: images200.doc2_200, alt: "Certificate, 2019", width: 300},
    {full: images1600.doc3_1600, src: images600.doc3, thumb: images200.doc3_200, alt: "Certificate, 2020", width: 300},
    {full: images1600.doc4_1600, src: images600.doc4, thumb: images200.doc4_200, alt: "Certificate, 2021", width: 300},
    {full: images1600.doc5_1600, src: images600.doc5, thumb: images200.doc5_200, alt: "Certificate, 2021", width: 300},
    {full: images1600.doc7_1600, src: images600.doc7, thumb: images200.doc7_200, alt: "Certificate, 2021", width: 300},
    {full: images1600.doc10_1600, src: images600.doc10, thumb: images200.doc10_200, alt: "Certificate, 2018", width: 600},
    {full: images1600.doc11_1600, src: images600.doc11, thumb: images200.doc11_200, alt: "Certificate, 2019", width: 600},
];

const slideStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
};

// Опции вынесены из JSX, чтобы не пересоздавать объекты на каждый рендер
// (иначе useEffect в Fancybox/Carousel будет срабатывать заново)
const fancyboxOptions = {Carousel: {infinite: false}};
const carouselOptions = {infinite: false};

export default function Gallery() {
    return (
        <div>
            <Fancybox options={fancyboxOptions}>
                <Carousel options={carouselOptions}>
                    {slides.map((slide) => (
                        <div key={slide.full}
                             className="f-carousel__slide"
                             data-fancybox="gallery"
                             data-src={slide.full}
                             data-thumb-src={slide.thumb}
                             data-caption={slide.caption}
                             style={slideStyle}>
                            <img alt={slide.alt} src={slide.src} width={slide.width} height="400"/>
                        </div>
                    ))}
                </Carousel>
            </Fancybox>
        </div>
    );
}
