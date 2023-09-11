import React, { useEffect, useState } from "react";
import type { Movie } from "../types/Movie.ts";
import type { MovieResponse } from "../types/MovieListResponse.ts";
import { MovieCard } from "./MovieCard.tsx";
import axios from "axios";
import { config } from "../shared/api/axios-config.ts";
import { motion } from "framer-motion";

export const MovieSelection: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [selectedMovies, setSelectedMovies] = useState<Movie[]>([]);
    const [remainingMovies, setRemainingMovies] = useState<Movie[]>([]);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

    useEffect(() => {
        axios
            .get(`${config.baseURL}films`, config)
            .then((response) => {
                const movies = response.data.data.map((item: MovieResponse) => {
                    return {
                        name: item.attributes.name,
                        description: item.attributes.description,
                        picture: item.attributes.poster,
                        id: item.id,
                        link: item.attributes.link,
                    };
                });
                setMovies(movies);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleMovieClick = (movie: Movie) => {
        const selectedAndRemainingMovies = remainingMovies.slice(0, 2);
        console.log("t", selectedAndRemainingMovies);
        setSelectedMovies([...selectedMovies, movie]);
        setRemainingMovies((prevMovies) =>
            prevMovies.filter(
                (m) =>
                    m.id !== selectedAndRemainingMovies[0]?.id &&
                    m.id !== selectedAndRemainingMovies[1]?.id
            )
        );
    };

    useEffect(() => {
        setRemainingMovies(movies);
    }, [movies]);

    useEffect(() => {
        if (remainingMovies.length === 0 && selectedMovies.length > 0) {
            setRemainingMovies(selectedMovies);
            setSelectedMovies([]);
        } else if (remainingMovies.length === 1) {
            setSelectedMovie(remainingMovies[0]);
        }
    }, [remainingMovies, selectedMovies]);

    return (
        <div className="flex flex-col items-center bg-neutral-700 pb-5">
            <p className="mt-4 text-white text-3xl">
                {selectedMovie ? "Good choice! Enjoy!" : "Choose one movie"}
            </p>
            <div className="flex items-center bg-neutral-700 mt-6">
                {!selectedMovie &&
                    remainingMovies.slice(0, 2).map((movie, index) => (
                        <motion.div
                            key={movie.id}
                            initial={{ x: index === 0 ? -100 : 100 }}
                            animate={{ x: index === 0 ? 0 : 0 }}
                        >
                            <MovieCard
                                movie={movie}
                                onClick={() => handleMovieClick(movie)}
                            />
                        </motion.div>
                    ))}
                {selectedMovie && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.5,
                            ease: [0, 0.71, 0.2, 1.01],
                        }}
                    >
                        <MovieCard movie={remainingMovies[0]}>
                            <button className="bg-gradient-to-r from-gray-400 via-gray-600 to-gray-400 text-white font-bold py-2 px-4 rounded-full border border-gray-600 hover:opacity-80 hover:shadow-md transition duration-300 ease-in-out">
                                <a
                                    href={selectedMovie.link}
                                    className="hover:text-white"
                                >
                                    Poke here
                                </a>
                            </button>
                        </MovieCard>
                    </motion.div>
                )}
            </div>
        </div>
    );
};
