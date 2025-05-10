import React, { useContext, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import Display from './components/Display';
import { PlayerContext } from './context/PlayerContext';

const App = () => {
    const { audioRef, track, songsData } = useContext(PlayerContext);

    useEffect(() => {
        if (audioRef.current && track) {
            audioRef.current.src = track.file; // Update audio source
            audioRef.current.load(); // Ensure audio updates
            audioRef.current.play().catch(err => console.log("Playback error:", err));
        }
    }, [track]);

    return (
        <div className="h-screen bg-gray-900 text-white">
            {songsData.length !== 0 && (
                <>
                    <div className="h-[90%] flex">
                        <Sidebar />
                        <Display />
                    </div>
                    <Player />
                </>
            )}
            <audio ref={audioRef} preload="auto"></audio>
        </div>
    );
};

export default App;