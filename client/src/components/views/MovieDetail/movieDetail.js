import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config'
import MainMovie from '../LandingPage/sections/mainImage'
import MovieInfo from './section/movieinfo'
import GridCards from '../commons/gridCards'
import { Row } from 'antd'
import Favorite from './section/favorite'


function MovieDetail(props) {

    let movieId = props.match.params.movieId //url 에서 정보, app.js 라우팅 보면 됨
    const [movie, setMovie] = useState([])
    const [cast, setCast] = useState([])
    const [actorToggle, setActorToggle] = useState(false)

    const toggleActorView = () => {
        setActorToggle(!actorToggle)
    }


    useEffect(() => {

        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`
        let endpointInfo= `${API_URL}movie/${movieId}?api_key=${API_KEY}`

        fetch(endpointInfo)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                setMovie(response)
            })

        fetch(endpointCrew)
            .then(response => response.json())
            .then(response => {
                // console.log("response crew",response)
                setCast(response.cast)
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

                <div style = {{display : 'flex', justifyContent : 'flex-end'}}>
                    <Favorite movieInfo = { movie } />
                </div>

                {/* movie info  */}
                <MovieInfo 
                    movie = {movie} 
                    movieId = { movieId } 
                    userFrom ={ localStorage.getItem('userId') } 
                />

                <br />

                {/* act grid */}

                {actorToggle &&
                    <Row gutter ={ [8, 16] } >
                        {cast && cast.map((cast, index) => {
    
                            // console.log(movie.original_title)
                            // console.log(movie.poster_path)
                            // console.log(movie.id)
    
                            return(
                            <React.Fragment key={index}>
    
                                <GridCards 
                                    image = {cast.profile_path ?
                                        `${IMAGE_BASE_URL}w500${cast.profile_path}` : null
                                    }
                                    characterName = {cast.name}
                                />
    
                            </React.Fragment>
                            )
                        })}
    
                    </Row>
                }
                


                <div style ={{ display : 'flex', justifyContent : 'center', margin : '2rem'}}>
                    <button onClick={toggleActorView}> Toggle Actor View</button>
                </div>

            </div>


            
        </div>
    )
}

export default MovieDetail