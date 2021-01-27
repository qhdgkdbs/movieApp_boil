import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config'
import MainMovie from '../LandingPage/sections/mainImage'
import MovieInfo from './section/movieinfo'

function MovieDetail(props) {

    let movieId = props.match.params.movieId //url 에서 정보, app.js 라우팅 보면 됨
    const [movie, setMovie] = useState([])

    useEffect(() => {

        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`
        let endpointInfo= `${API_URL}movie/${movieId}?api_key=${API_KEY}`

        fetch(endpointInfo)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                setMovie(response)
            })

    }, [])

    return (
        <div>
            {/* Header */}

            <MainMovie 
                title = {movie.original_title}
                text = {movie.overview}
                image = {`${IMAGE_BASE_URL}w1280${movie.backdrop_path}`}
            />

            {/* body */}
            <div style = {{width : '85%', margin : '1rem auto'}}>

                {/* movie info  */}
                <MovieInfo movie = {movie}/>

                <br />

                {/* act grid */}

                <div style ={{ display : 'flex', justifyContent : 'center', margin : '2rem'}}>
                    <button> Toggle Actor View</button>
                </div>

            </div>


            
        </div>
    )
}

export default MovieDetail
