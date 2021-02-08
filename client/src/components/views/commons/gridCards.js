import React from 'react'
import { Col } from 'antd'

function gridCards(props) {
    
    if(props.landingPage){
        return (
            <Col lg = {6} md = {8} xs = {24}>
                <div style = {{ position: 'relative'}}>
                    <a href ={`/movie/${props.movieId}`} >
                        <img style={{width : '180px', height : '250px'}} 
                            src = {props.image}  
                            alt = {props.movieName}
                        />
                    </a>
                </div>  
            </Col>
        )
    }else{
        return (
            <Col lg = {6} md = {8} xs = {24}>
                <div style = {{ position: 'relative'}}>
                        <img style={{width : '180px', height : '250px'}} 
                            src = {props.image}  
                            alt = {props.characterName}
                        />
                </div>  
            </Col>
        )
    }

}

export default gridCards
 