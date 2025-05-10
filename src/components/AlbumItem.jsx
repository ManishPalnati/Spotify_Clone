import React from 'react';
import { useNavigate } from 'react-router-dom';

const AlbumItem = ({ _id, image, name, desc }) => {
    const navigate = useNavigate();

    return (
        <div 
            onClick={() => navigate(`/album/${_id}`)} 
            className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]"
        >
            <img className="rounded w-full h-32 object-cover" src={image} alt={name} />
            <p className="font-bold mt-2">{name}</p>
            <p className="text-slate-200 text-sm">{desc}</p>
        </div>
    );
};

export default AlbumItem;
