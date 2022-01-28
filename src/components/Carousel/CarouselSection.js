import React from 'react';
import { Carousel } from 'react-bootstrap';

const CarouselSection = () => {
    return (
        <Carousel className="container h-full">
            <Carousel.Item interval={1000}>
                <img
                    className="d-block w-75"
                    src="https://i.ibb.co/3STFKQQ/photo-1568454537842-d933259bb258.jpg"
                    alt="First slide"
                />
                <Carousel.Caption>


                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={1000}>
                <img
                    className="d-block w-75"
                    src="https://i.ibb.co/LPmK6Pr/photo-1595917513241-e9d7a9d8f0a0.jpg"
                    alt="Second slide"
                />

                <Carousel.Caption>


                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={1000}>
                <img
                    className="d-block w-75"
                    src="https://i.ibb.co/Gdg3xxP/pexels-photo-3601425.jpg"
                    alt="Third slide"
                />

                <Carousel.Caption>


                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
};

export default CarouselSection;