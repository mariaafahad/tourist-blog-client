import React from 'react';
import { Carousel } from 'react-bootstrap';
import Footer from '../../Shared/Footer/Footer';
import Navigation from '../../Shared/Navigation/Navigation';
import Banner from '../Banner/Banner';
import Blogs from '../Blogs/Blogs';
import CarouselSection from '../Carousel/CarouselSection';
// import CarouselSection from '../Carousel/CarouselSection';

const Home = () => {
    return (
        <div>
            <Navigation />
            <Banner />
            <CarouselSection></CarouselSection>
            <Blogs />
            <Footer />
        </div>
    );
};

export default Home;