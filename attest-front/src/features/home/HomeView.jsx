import React from 'react';
import HorizontalMenu from './components/HorizontalMenu';
import Listings from './components/Listings';

function HomeView() {

    return (
        <div className='bg-white mx-10'>
            <HorizontalMenu />
            <Listings />
        </div>
    );
}

export default HomeView;