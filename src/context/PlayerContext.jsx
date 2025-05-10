import React, { createContext, useState, useRef, useEffect } from 'react';
import { albumsData as initialAlbumsData, songsData as initialSongsData } from '../assets/assets';

// Create a Context for the player
export const PlayerContext = createContext();

const PlayerContextProvider = ({ children }) => {
    const audioRef = useRef(null);
    const seekBg = useRef(null);
    const seekBar = useRef(null);

    // Load songs and albums
    const [songsData, setSongsData] = useState(initialSongsData || []);
    const [albumsData, setAlbumsData] = useState(initialAlbumsData || []);
    const [track, setTrack] = useState(null); // ✅ Prevent autoplay but show last track
    const [playStatus, setPlayStatus] = useState(false);
    const [userInitiatedPlay, setUserInitiatedPlay] = useState(false); // ✅ Track if user manually clicked play
    const [time, setTime] = useState({
        currentTime: { second: 0, minute: 0 },
        totalTime: { second: 0, minute: 0 },
    });

    // ✅ Load last played song & play status from localStorage on reload
    useEffect(() => {
        const savedTrack = JSON.parse(localStorage.getItem("lastPlayedTrack"));
        const savedUserInitiatedPlay = JSON.parse(localStorage.getItem("userInitiatedPlay"));

        if (savedTrack) {
            setTrack(savedTrack); // ✅ Show player bar with last track
        }

        if (savedUserInitiatedPlay !== null) {
            setUserInitiatedPlay(savedUserInitiatedPlay); // ✅ Prevent autoplay on hot reload
        }
    }, []);

    // ✅ Save last played song & play status to localStorage
    useEffect(() => {
        if (track) {
            localStorage.setItem("lastPlayedTrack", JSON.stringify(track));
        }
        localStorage.setItem("userInitiatedPlay", JSON.stringify(userInitiatedPlay));
    }, [track, userInitiatedPlay]);

    // ✅ Play function (Only when user clicks play)
    const play = () => {
        if (audioRef.current) {
            audioRef.current.play()
                .then(() => {
                    setPlayStatus(true);
                    setUserInitiatedPlay(true); // ✅ Track user interaction
                })
                .catch(err => console.log("Play error:", err));
        }
    };

    // ✅ Pause function
    const pause = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            setPlayStatus(false);
        }
    };

    // ✅ Play song by ID (Only if user clicks)
    const playWithId = (id) => {
        console.log("playWithId called with ID:", id);
        const song = songsData.find((item) => item._id === id);
        if (song) {
            console.log("Song found:", song.name);
            setTrack(song);
            setUserInitiatedPlay(true); // ✅ Track user manually selecting a song
            setTimeout(() => {
                if (audioRef.current) {
                    audioRef.current.src = song.file;
                    audioRef.current.load();
                    audioRef.current.play()
                        .then(() => setPlayStatus(true))
                        .catch(err => console.log("Error playing:", err));
                }
            }, 200);
        } else {
            console.log("Song not found for ID:", id);
        }
    };

    // ✅ Prevent Autoplay on Reload or Hot Reload
    useEffect(() => {
        if (track && userInitiatedPlay && audioRef.current) {
            audioRef.current.src = track.file;
            audioRef.current.load();
            
            // ✅ Only play if user previously started playback before reload
            if (userInitiatedPlay) {
                audioRef.current.play()
                    .then(() => setPlayStatus(true))
                    .catch(err => console.log("Error playing:", err));
            }
        }
    }, [track]); // ✅ Only runs when `track` changes & user clicked play

    // ✅ Play previous song
    const previous = () => {
        if (!track) return;
        const index = songsData.findIndex((item) => item._id === track._id);
        if (index > 0) {
            setTrack(songsData[index - 1]);
            setTimeout(() => play(), 100);
        }
    };

    // ✅ Play next song
    const next = () => {
        if (!track) return;
        const index = songsData.findIndex((item) => item._id === track._id);
        if (index < songsData.length - 1) {
            setTrack(songsData[index + 1]);
            setTimeout(() => play(), 100);
        }
    };

    // ✅ Seek song when clicking progress bar
    const seekSong = (e) => {
        if (!audioRef.current || !seekBg.current) return;
        const newTime =
            (e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration;
        audioRef.current.currentTime = newTime;
    };

    // ✅ Update progress bar and time
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.ontimeupdate = () => {
                if (!audioRef.current.duration) return;
                seekBar.current.style.width = `${(audioRef.current.currentTime / audioRef.current.duration) * 100}%`;
                setTime({
                    currentTime: {
                        second: Math.floor(audioRef.current.currentTime % 60),
                        minute: Math.floor(audioRef.current.currentTime / 60),
                    },
                    totalTime: {
                        second: Math.floor(audioRef.current.duration % 60),
                        minute: Math.floor(audioRef.current.duration / 60),
                    },
                });
            };
        }
    }, []);

    return (
        <PlayerContext.Provider value={{
            audioRef,
            seekBar,
            seekBg,
            track,
            setTrack,
            playStatus,
            setPlayStatus,
            time,
            setTime,
            play,
            pause,
            playWithId,
            previous,
            next,
            seekSong,
            songsData,
            albumsData,
        }}>
            {children}
        </PlayerContext.Provider>
    );
};

export default PlayerContextProvider;