import React, { useContext, useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useParams } from 'react-router-dom';
import { PlayerContext } from '../context/PlayerContext';

const DisplayAlbum = () => {
    const { id } = useParams();
    const { playWithId, albumsData, songsData } = useContext(PlayerContext);
    const [albumData, setAlbumData] = useState(null);

    // Find the album based on the ID
    useEffect(() => {
        const foundAlbum = albumsData.find((album) => album._id === id);
        setAlbumData(foundAlbum || null);
    }, [id, albumsData]);

    // Prevent rendering errors if albumData is null
    if (!albumData) {
        return <p className="text-center text-gray-400">Album not found</p>;
    }

    return (
        <>
            <Navbar />
            <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
                <img className="w-48 rounded" src={albumData.image} alt={albumData.name} onError={(e) => e.target.src = '/fallback.jpg'} />
                <div>
                    <h2 className="text-5xl font-bold mb-4 md:text-7xl">{albumData.name}</h2>
                    <h4>{albumData.desc}</h4>
                </div>
            </div>
            <hr />
            {songsData.filter((song) => song.album === albumData.name).map((song, index) => (
                <div key={index} onClick={() => playWithId(song._id)} className="p-2 cursor-pointer hover:bg-gray-700 flex items-center">
                    <img className="w-12 h-12 rounded mr-4" src={song.image} alt={song.name} onError={(e) => e.target.src = '/fallback.jpg'} />
                    <p>{song.name}</p>
                </div>
            ))}
        </>
    );
};

export default DisplayAlbum;
