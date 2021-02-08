import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Button } from 'antd'

function Favorite(props) {

    const movieId = props.movieId
    const userFrom = props.userFrom
    const movieTitle = props.movieInfo.title 
    const moviePost = props.movieInfo.backdrop_path
    const movieRunTime = props.movieInfo.runtime

    const [favoriteNumber, setFavoriteNumber] = useState(0)
    const [favorited, setFavorited] = useState(false)

    let variables = {
        userFrom,
        movieId,
        movieTitle,
        moviePost,
        movieRunTime
    }


    useEffect(() => {

        Axios.post('/api/favorite/favoriteNumber', variables)
            .then(response => {
                if(response.data.success){
                    console.log(response.data)
                    setFavoriteNumber(response.data.favoriteNumber)
                }else{
                    alert("숫자 정보를 가져오지 못했어")
                }
            })

        Axios.post('/api/favorite/favorited', variables)
            .then(response => {
                if(response.data.success){
                    // console.log(response.data)
                    setFavorited(response.data.favorited)
                }else{
                    alert("정보를 가져오지 못했어")
                }
            })
         
    }, [])

    const onClickFavorite = () => {
        if(favorited){
            Axios.post('/api/favorite/removeFromFavorite', variables)
            .then(response => {
                if(response.data.success){
                    setFavoriteNumber(favorited - 1)
                    setFavorited(!favorited)
                }else{
                    alert("좋아요 취소 실패")
                }
            })
        }else{
            Axios.post('/api/favorite/addToFavorite', variables)
            .then(response => {
                if(response.data.success){
                    setFavoriteNumber(favorited + 1)
                    setFavorited(!favorited)
                }else{
                    alert("좋아요 추가 실패")
                }
            })
        }
    }


    return (
        <div>
            <Button onClick = {onClickFavorite}>{favorited ? "Not Favorited" : "Add To Favorited"} {favoriteNumber}</Button>
        </div>
    )
}

export default Favorite
