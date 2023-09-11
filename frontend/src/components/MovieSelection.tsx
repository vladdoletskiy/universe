import React, { useEffect, useState } from "react";
import type { Movie } from "../types/Movie.ts";
import type {
    MovieListResponse,
    MovieResponse,
} from "../types/MovieListResponse.ts";
import { MovieCard } from "./MovieCard.tsx";
import axios from "axios";
import { config } from "../shared/api/axios-config.ts";

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

    console.log("selectedMovies", selectedMovies);
    console.log("remainingMovies", remainingMovies);

    return (
        <div className="flex flex-col items-center bg-neutral-700 pb-5">
            <p className="m-3 text-white text-23">Choose one movie</p>
            <div className="flex items-center bg-neutral-700 mt-6">
                {!selectedMovie &&
                    remainingMovies.slice(0, 2).map((movie) => (
                        <div key={movie.id}>
                            <MovieCard
                                movie={movie}
                                onClick={() => handleMovieClick(movie)}
                            />
                        </div>
                    ))}
                {selectedMovie ? (
                    <div>
                        <MovieCard movie={remainingMovies[0]}>
                            <a href={selectedMovie.link}>Тицяй сюди</a>
                        </MovieCard>
                    </div>
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    );
};
