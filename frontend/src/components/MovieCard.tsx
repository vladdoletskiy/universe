import React from "react";
import type { Movie } from "../types/Movie.ts";

export const MovieCard: React.FC<{ movie: Movie }> = ({
    movie: { name, description, picture },
}) => {
    return (
        <div className="flex flex-col items-center bg-neutral-300 max-h-[750px] max-w-[450px]">
            <img src={picture} alt="img" className="h-[350px] w-[250px] mt-5" />
            <h2 className="text-[18px] font-bold mt-7  ">{name}</h2>
            <p className="text-base my-7">{description}</p>
        </div>
    );
};
