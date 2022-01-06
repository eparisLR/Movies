import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import MovieCard from './MovieCard'
import CircularProgress from '@mui/material/CircularProgress';
import { deleteMovie, fetchMoviesAsync, filterMoviesList, selectFilters, selectMovies, selectPending } from './MoviesSlice'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const ListMovies = (props) => {
    const dispatch = useDispatch()
    const movies = useSelector(selectMovies)
    const pending = useSelector(selectPending)
    const filters  = useSelector(selectFilters)
    const [activeFilters, setActiveFilters] = useState([]) 

    useEffect(() => {
        dispatch(fetchMoviesAsync())
    }, [dispatch])

    

    const activateFilterMovies = (event) => {
        const filterName = event.target.labels[0].outerText
        if (event.target.checked){
            const addingFilter = activeFilters
            addingFilter.push(filterName)
            setActiveFilters(addingFilter)

            dispatch(
                filterMoviesList({
                    filters: activeFilters
                })
            )
        } else {
            const removeFilter = activeFilters.filter(f => f !== filterName)
            setActiveFilters(removeFilter)

            dispatch(
                filterMoviesList({
                    filters: removeFilter
                })
            )
        }
    }

    const deleteOneMovie = (movie) => {
        dispatch(
            deleteMovie({
                id: movie.id
            })
        )
    }

    const renderSpinner = pending ? <CircularProgress /> : ""

    const renderFilters = filters.map( (filter, index) => 
        <FormControlLabel key={index} control={<Checkbox />} label={filter} onClick={activateFilterMovies } />
    )

    const renderMovies = movies.map(filmToDisplay =>{
        return <MovieCard key={filmToDisplay.id} film={filmToDisplay} delete={deleteOneMovie}/>
    })

    

    return(
        <div>
            <FormGroup row>
                {renderFilters}
            </FormGroup>
            <div>
                {renderSpinner}
            </div>
            <Grid container spacing={2}>
                {renderMovies}
            </Grid>
        </div>
    )
}

export default ListMovies