import React from 'react';
import BannerImg from "../../../assets/Hero-image.jpg";

const Hero = () => {
    return (
        <div>
                <img src={BannerImg} alt="Hero Banner" style={{ width: '100%', height: '90vh' }} />
            <h1>Welcome to our website!</h1>
            <p>Discover amazing content and connect with others.</p>
        </div>
    );
};

export default Hero;