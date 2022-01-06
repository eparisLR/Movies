import { configureStore } from "@reduxjs/toolkit";
import { moviesSlice } from "./features/movies/MoviesSlice";

export const store = configureStore({
    reducer: {
        movies: moviesSlice.reducer
    },
})