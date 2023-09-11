import React from "react";
import type { Movie } from "../types/Movie.ts";
import { motion } from "framer-motion";

export const MovieCard: React.FC<{
    movie: Movie;
    onClick?: () => void;
    children?: React.ReactElement;
}> = ({ movie: { name, description, picture }, onClick, children }) => {
    return (
        <motion.div
            onClick={onClick}
            className="flex flex-col items-center bg-neutral-300 h-[650px] max-w-[400px] p-3 m-3 rounded-lg"
        >
            <motion.img
                src={picture}
                alt={name}
                className="h-[335px] sm:h-[235px] w-[230px] sm:w-[160px] mt-5 rounded-lg hover:drop-shadow-xl transition "
            />
            <h2 className="text-[18px] font-bold mt-7  ">{name}</h2>
            <p className="text-base mt-3 mb-4">{description}</p>
            {children}
        </motion.div>
    );
};
