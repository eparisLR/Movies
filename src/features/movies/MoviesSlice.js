import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    movies: [],
    isPending: false
};

// Define Async Thunk
export const fetchMoviesAsync = createAsyncThunk(
    'movies/fetch',
    async () => {

        const url = 'https://lp-movies-emilien.azurewebsites.net/api/getList?code=UlxUKyV5jLLcbIl7QCcvSuVmBMrfrbx4EQH2nHB3C7MLtkzQ1eirDg=='
        const options = { method: 'GET'};
        var response = await fetch(url, options)

        if(response.status === 200){
            response  = await response.json()
            response = response.map(movie => ({...movie, isFiltered:true, isDeleted: false}))
            return response
        } else {
            return Error("No movies found")
        }
        
    }
)

export const moviesSlice = createSlice({
    name: 'movies',
    initialState,

    // Actions
    reducers: {
        deleteMovie(state, action){
            // Copie locale du state
            const movies = state.movies
            // Index de movie à supprimer
            const movieToDelete = movies.findIndex(i => i.id === action.payload.id)
            // Splice de movie à supprimer
            movies.splice(movieToDelete, 1)
            // Nouveau state
            state.movies = movies
        },
        addLike(state, action){
            const movies = state.movies
            const index = movies.findIndex(i => i.id === action.payload.id)
            movies[index].likes = movies[index].likes + 1

            state.movies = movies
        },
        addDislike(state, action){
            const movies = state.movies
            const index = movies.findIndex(i => i.id === action.payload.id)
            movies[index].dislikes = movies[index].dislikes + 1

            state.movies = movies
        },
        filterMoviesList(state, action){
            var movies = state.movies
            const filters = action.payload.filters

            movies = movies.map( movie => filters.includes(movie.category) || filters.includes("Toutes") || filters.length === 0 ? {...movie, isFiltered : true } : {...movie, isFiltered : false, isDeleted: false });
            
            state.movies = movies
        }
    },
    // Reducer asycnhrone
    extraReducers: (builder) => {
        builder.addCase(fetchMoviesAsync.pending, state => {
            console.log('Loading movies...')
            state.isPending = true
        })
        .addCase(fetchMoviesAsync.fulfilled, (state, action) => {
            state.isPending = false
            state.movies = action.payload
        })
    }
})

export const { deleteMovie } = moviesSlice.actions
export const { addLike } = moviesSlice.actions
export const { addDislike } = moviesSlice.actions
export const { filterMoviesList } = moviesSlice.actions

export const selectMovies = state => state.movies.movies
export const selectPending = state => state.movies.isPending
export const selectFilters = (state) => {
    const filters = [...new Set(state.movies.movies.map( movie => movie.category))]
    filters.push("Toutes")
    return filters
}

export default moviesSlice.reducer;