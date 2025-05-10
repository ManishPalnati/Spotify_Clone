import React, { useContext } from 'react';
import { PlayerContext } from '../context/PlayerContext';

const SongItem = ({ _id, name, image, desc }) => {
    const { playWithId } = useContext(PlayerContext);

    return (
        <div 
            onClick={() => {
                console.log("Clicked song with ID:", _id);
                playWithId(_id);
            }} 
            className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]"
        >
            <img className="rounded w-full h-32 object-cover" src={image} alt={name} />
            <p className="font-bold mt-2">{name}</p>
            <p className="text-slate-200 text-sm">{desc}</p>
        </div>
    );
};

export default SongItem;
