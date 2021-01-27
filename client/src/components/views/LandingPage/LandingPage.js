import React, {useEffect, useState} from 'react'
import { FaCode } from "react-icons/fa";
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config'
import MainMovie from './sections/mainImage'
import GridCards from '../commons/gridCards'
import { Row } from 'antd'

function LandingPage() {

    const [movies, setMovies] = useState([])
    const [mainMovieImage, setMainMovieImage] = useState(null)
    const [currentPage, setCurrentPage] = useState(0)


    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        fetchMovies(endpoint)
    }, [])

    const fetchMovies = (endpoint) => {

        fetch(endpoint)
        .then(res => res.json())
        .then(res => {
            // console.log(res)
            setMovies([...movies, ...res.results]) // 스프레드 오퍼레이터, 모든 것을 펴버림 ㅅㄱ
            if(movies[0]) { 
                console.log(movies[0]) 
                setMainMovieImage(movies[0])
            }else{
                console.log(res.results[0])
                setMainMovieImage(res.results[0])
            }
            setCurrentPage(res.page)
        })

    }

    const loadMoreItems = () => {
        console.log(currentPage + 1)
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage + 1}`

        fetchMovies(endpoint)

    }


    return (
       <div style = {{ width : '100%', margin : 0}}>
           {/* main img */}

           {mainMovieImage &&
                <MainMovie 
                title = {mainMovieImage.original_title}
                text = {mainMovieImage.overview}
                image = {`${IMAGE_BASE_URL}w1280${mainMovieImage.backdrop_path}`}/>
            }

           <div style = {{width : '85%', margin : '1rem auto'}}>

               <h2>Movies by latest</h2>
               <hr />

               {/* movie grid cards */}

                <Row gutter ={ [8, 16] } >
                    {movies && movies.map((movie, index) => {

                        // console.log(movie.original_title)
                        // console.log(movie.poster_path)
                        // console.log(movie.id)

                        return(
                        <React.Fragment key={index}>

                            <GridCards 
                                image = {movie.poster_path ?
                                    `${IMAGE_BASE_URL}w500${movie.poster_path}` : null
                                }
                                movieId = {movie.id}
                                movieName = {movie.original_title}
                                
                            />

                        </React.Fragment>
                        )
                    })}

                </Row>


           </div>

            <div style = {{ display : 'flex', justifyContent : 'center'}}>
                <button onClick={loadMoreItems}> Load More </button>
            </div>

       </div>
    )
}

export default LandingPage
