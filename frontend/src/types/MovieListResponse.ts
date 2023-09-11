//Ideally, we will have a library, something like an automatically generated api, that will provide us with types from the backend so
// that we don't have to write them ourselves and make mistakes.
export type MovieResponse = {
    id: number;
    attributes: {
        name: string;
        description: string;
        link: string;
        createdAt: string;
        updatedAt: string;
        poster: string;
    };
};

export type MovieListResponse = {
    data: MovieResponse[];
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
};
