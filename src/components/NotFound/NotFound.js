import React from 'react';
import { NavLink } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className='text-center mt-5'>
            <img className='mb-3' style={{width: "300px", borderRadius: "15px"}} src="https://thumbs.dreamstime.com/b/error-page-not-found-vector-vinyl-music-broken-graphic-error-page-not-found-vector-vinyl-music-broken-graphic-background-156624909.jpg" alt="" /><br />
            <NavLink to='/'><button className="signin">Back To Home</button></NavLink>
        </div>
    );
};

export default NotFound;