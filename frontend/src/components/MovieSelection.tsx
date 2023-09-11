import React, { useEffect } from "react";
import type { Movie } from "../types/Movie.ts";
import { MovieCard } from "./MovieCard.tsx";
import axios from "axios";
import { config } from "../shared/api/axios-config.ts";

export const MovieSelection: React.FC = () => {
    console.log("hello");
    useEffect(() => {
        axios
            .request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className="flex items-center bg-neutral-300">
            <h2>Choose one movie</h2>
            <div>
                <MovieCard
                    movie={{
                        name: "",
                        description: "",
                        picture: "",
                    }}
                />
                <MovieCard
                    movie={{
                        name: "",
                        description: "",
                        picture: "",
                    }}
                />
            </div>
        </div>
    );
};
