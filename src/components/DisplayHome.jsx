import React, { useContext } from 'react';
import Navbar from './Navbar';
import AlbumItem from './AlbumItem';
import SongItem from './SongItem';
import { PlayerContext } from '../context/PlayerContext';

const DisplayHome = () => {
    const { songsData, albumsData } = useContext(PlayerContext);

    return (
        <>
            <Navbar />
            {/* Display Featured Albums */}
            <div className="mb-4">
                <h1 className="my-5 font-bold text-2xl">Featured Albums</h1>
                <div className="flex overflow-auto gap-4">
                    {albumsData.length > 0 ? (
                        albumsData.map((album) => (
                            <AlbumItem 
                                key={album._id} 
                                _id={album._id} 
                                name={album.name} 
                                desc={album.desc} 
                                image={album.image} 
                            />
                        ))
                    ) : (
                        <p className="text-gray-400">No albums available</p>
                    )}
                </div>
            </div>

            {/* Display Today's Biggest Hits */}
            <div className="mb-4">
                <h1 className="my-5 font-bold text-2xl">Today's Biggest Hits</h1>
                <div className="flex overflow-auto gap-4">
                    {songsData.length > 0 ? (
                        songsData.map((song) => (
                            <SongItem 
                                key={song._id} 
                                _id={song._id} 
                                name={song.name} 
                                desc={song.desc} 
                                image={song.image} 
                            />
                        ))
                    ) : (
                        <p className="text-gray-400">No songs available</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default DisplayHome;
