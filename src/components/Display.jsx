import React, { useEffect, useRef, useContext } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import DisplayHome from './DisplayHome';
import DisplayAlbum from './DisplayAlbum';
import { PlayerContext } from '../context/PlayerContext';

const Display = () => {
    const { albumsData } = useContext(PlayerContext);
    const displayRef = useRef();
    const location = useLocation();
    const isAlbum = location.pathname.includes('album');
    const albumId = isAlbum ? location.pathname.split('/').pop() : '';

    useEffect(() => {
        if (isAlbum) {
            const album = albumsData.find((x) => x._id === albumId);
            displayRef.current.style.background = `linear-gradient(${album?.bgColour || '#121212'}, #121212)`;
        } else {
            displayRef.current.style.background = '#121212';
        }
    }, [isAlbum, albumsData]);

    return (
        <div ref={displayRef} className="w-full m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0">
            <Routes>
                <Route path="/" element={<DisplayHome />} />
                <Route path="/album/:id" element={<DisplayAlbum />} />
            </Routes>
        </div>
    );
};

export default Display;
