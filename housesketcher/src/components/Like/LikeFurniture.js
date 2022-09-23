import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useState, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import axios from 'axios'
import hollowStar from '../../assets/hollowstar.png'
import fullStar from '../../assets/fullstar.png'

export default function LikeFurniture(props) {
    let {BASE_URL, authTokens} = useContext(AuthContext)
    const addLatestHandler = (newItem) => {
        props.addLatest(newItem)
    }
    // props.like 받았다고 가정 기본 default 값은 false 대신에 props.like가 들어가겠지?
    const [isLike, setIsLikeHandler] = useState(props.furniture.like)
    const [isMouseon, setIsMouseOnHandler] = useState(false)
    const furniture = props.furniture
    const likeClickHandler = (id, islike) => {
        // islike가 true일 경우 좋아요 취소 
        if (islike) {
            setIsLikeHandler(!isLike)
            axios.delete(BASE_URL + `likes/dislike/${id}`, {
                headers : {
                    Authorization : `Bearer ${authTokens.access}`
                }
            }).then(res => console.log(res))            
        }
        else {
            setIsLikeHandler(!isLike)
            axios.get(BASE_URL + `likes/like/${id}/`, {
                headers : {
                    Authorization : `Bearer ${authTokens.access}`
                }
            }).then(res => console.log(res))
        }

    }

    const onClickFurnitureHandler = async (id) => {
        axios.get(BASE_URL + `furnitures/click/${id}`, {
            headers : {
                Authorization : `Bearer ${authTokens.access}`
            }
        })
        const newItem = {
            "id": props.furniture.id,
            "furniture_name": props.furniture.furniture_name,
            "furniture_url": props.furniture.furniture_url,
            "furniture_image": props.furniture.furniture_image,
            "furniture_price": props.furniture.furniture_price,
            "furniture_rating": props.furniture.furniture_rating,
            "furniture_review": props.furniture.furniture_review,
            "furniture_width": props.furniture.furniture_width,
            "furniture_length": props.furniture.furniture_length,
            "furniture_height": props.furniture.furniture_height,
            "furniture_style": props.furniture.furniture_style,
            "furniture_color": props.furniture.furniture_color,
            "furniture_main": props.furniture.furniture_main,
            "furniture_sub": props.furniture.furniture_sub,
            "furniture_condition": props.furniture.furniture_condition,
            "like": props.furniture.like
        }
        addLatestHandler(newItem)
    }


    
    
    const nameSpacer = (name) => {
        if (name.length > 29) {
            const newname =  name.slice(0,22) + '...' 
            return (
                newname
            )       
        } else {
            return name
        }
    }
   
  return (   
       <div onClick={() => {onClickFurnitureHandler(furniture.id)}}>
            
                <Card style={{ width: '18rem' }} key={furniture.id}                   
                >
                    <Card.Body>
                        <div >                                                       
                            {isLike ? <img style={{ width :'10%', height: '10%' , cursor:'pointer'}} onClick={() => {likeClickHandler(furniture.id, isLike)}} src= {fullStar}alt="" />: 
                            <img style={{ width :'10%', height: '10%' , cursor:'pointer'}} onClick={() => {likeClickHandler(furniture.id, isLike)}} src= {hollowStar}alt="" />}
                                
                         
                        </div>
                    </Card.Body>
                   

                    <a  href= {furniture.furniture_url}>
                        <Card.Img variant="top" src={furniture.furniture_image} />
                        
                    </a>
                    <Card.Body
                   >
                        <div style= {{dislplay : 'flex' , marginBottom : '0px'}} >
                            <a href= {`https://www.google.com/search?q=${furniture.furniture_style}+${furniture.furniture_color}+interior`}
                             style = {{textDecoration : 'none', cursor:'pointer'}}>

                            <p> #{furniture.furniture_style} #{furniture.furniture_color} </p>

                            </a>
                        </div> 
                        <div
                         onMouseEnter={() => {setIsMouseOnHandler(true)}} 	      // 마우스엔터 이벤트이면 hide가 false가 된다.
                         onMouseLeave={() => {setIsMouseOnHandler(false)}}>
                            {isMouseon? <b> {furniture.furniture_name}</b> : <b>{nameSpacer(furniture.furniture_name)}</b> } 
                        </div>
                    </Card.Body>
                  
                    
                </Card>            
            
            
                      
       </div>



    
  )
}
