import React from "react";
import type { Movie } from "../types/Movie.ts";

export const MovieCard: React.FC<{
    movie: Movie;
    onClick?: () => void;
    children?: React.ReactElement;
}> = ({ movie: { name, description, picture, id }, onClick, children }) => {
    return (
        <div
            onClick={onClick}
            className="flex flex-col items-center bg-neutral-300 h-[650px] w-[450px] p-3 m-3 rounded-lg"
        >
            <img src={picture} alt="img" className="h-[350px] w-[250px] mt-5" />
            <h2 className="text-[18px] font-bold mt-7  ">{name}</h2>
            <p className="text-base my-7">{description}</p>
            {children}
        </div>
    );
};
