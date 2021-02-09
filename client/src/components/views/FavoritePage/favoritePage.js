import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import './favorite.css'
import { Popover } from 'antd'
import { IMAGE_BASE_URL } from '../../Config'

function FavoritePage() {

    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        
        fetchFavoritedMovie()

    }, [])

    const fetchFavoritedMovie = () => {
        Axios.post('/api/favorite/getFavoriteMovie', { userFrom : localStorage.getItem('userId')})
        .then(res => {
            if(res.data.success){
                console.log(res.data.favorites)
                setFavorites(res.data.favorites)
            }else{
                alert("영화 정보를 가져오는데 실패했습니다.")
            }
        })

    }

    const onClickDelete = (movieId, userFrom) => {

        const variables = {
            movieId,
            userFrom
        }

        Axios.post('/api/favorite/removeFromFavorite', variables)
        .then(res => {
            if(res.data.success){
                fetchFavoritedMovie()
            }else{
                alert("데이터 지우기 실패")
            }
        })
    }

    const renderCards = favorites.map((favorite, index) => {

        const content = (
            <div>
                {favorite.moviePost ? 
                    <img src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`} />
                    :
                    "no Image"
                }
            </div>
        )

        return <tr key = {index}>
            <Popover content = { content } title ={`${favorite.movieTitle}`}>
                <td> {favorite.movieTitle} </td>
            </Popover>
            <td> {favorite.movieRunTime} mins</td>
            <td> <button onClick = {() => onClickDelete(favorite.movieId, favorite.userFrom)}>Remove</button> </td>
        </tr>
    })


    return (
        <div style ={{width :'85%', margin : '3rem auto'}}>
            <h2>FavoritePage</h2>
            <hr />
            
            <table>
                <thead>
                    <tr>
                        <th>Movie Title</th>
                        <th>Movie RunTime</th>
                        <th>Remove from Favorite</th>
                    </tr>
                </thead>
                <tbody>
                     
                    {renderCards}

                </tbody>
            </table>
            

        </div>
    )
}

export default FavoritePage
