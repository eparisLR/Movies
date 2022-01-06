import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography';
import ThumbUp from '@mui/icons-material/ThumbUpAltRounded'
import ThumbDown from '@mui/icons-material/ThumbDownAltRounded'
import {Button} from '@mui/material';
import Grid from '@mui/material/Grid'
import { useDispatch } from 'react-redux'
import { addDislike, addLike } from './MoviesSlice';


const MovieCard = (props) => {
    const dispatch = useDispatch()
    
    const addOneLike = (movie) => {
        dispatch(
            addLike({
                id: movie.id
            })
        )
    }

    const addOneDislike = (movie) => {
        dispatch(
            addDislike({
                id: movie.id
            })
        )
    }
    
    if(props.film.isFiltered && props.film.isDeleted === false){
        return(
            <Grid item xs={4}>
                <Card sx={{ maxWidth: 400 }}>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            {props.film.title}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {props.film.category}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button variant="outlined" size="small" endIcon={<ThumbUp />} onClick={() => {addOneLike(props.film)}}>{props.film.likes}</Button>
                        <Button variant="outlined" size="small" color="error" onClick={() => {addOneDislike(props.film)}} endIcon={<ThumbDown />}>{props.film.dislikes}</Button>
                        <Button variant="rounded" size="small" color="error" onClick={() => {props.delete(props.film)}}>Supprimer</Button>
                    </CardActions>
                </Card>
            </Grid>
        )
    } else {
        return(
            <div>

            </div>
        )
    }
}

export default MovieCard