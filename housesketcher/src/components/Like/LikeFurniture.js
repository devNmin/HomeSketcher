import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useState, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import axios from 'axios'

export default function LikeFurniture(props) {
    let {BASE_URL, authTokens} = useContext(AuthContext)
    // props.like 받았다고 가정 기본 default 값은 false 대신에 props.like가 들어가겠지?
    const [isLike, setIsLikeHandler] = useState(props.furniture.like)
    const [isMouseon, setIsMouseOnHandler] = useState(false)

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

    const furniture = props.furniture
    
    const nameSpacer = (name) => {
        if (name.length > 25) {
            const newname =  name.slice(0,22) + '...' 
            return (
                newname
            )       
        } else {
            return name
        }
    }
   
  return (   
       <div >
            <a>
                <Card style={{ width: '18rem' }} key={furniture.id}
                    onMouseEnter={() => {setIsMouseOnHandler(true)}} 	      // 마우스엔터 이벤트이면 hide가 false가 된다.
                    onMouseLeave={() => {setIsMouseOnHandler(false)}}
                >
                    <a href= {furniture.furniture_url}>
                        <Card.Img variant="top" src={furniture.furniture_image} />
                    </a>
                    <Card.Body>
                        <div>
                            {isMouseon? <b> {furniture.furniture_name}</b> : <b>{nameSpacer(furniture.furniture_name)}</b> }                            
                            {isLike ? <Button onClick={() => {likeClickHandler(furniture.id, isLike)}} variant="danger">Remove</Button> : 
                            <Button onClick={() => {likeClickHandler(furniture.id, isLike)}} variant="primary">Save</Button>}             
                            
                        </div>
                    </Card.Body>
                </Card>            
            </a>
            
                      
       </div>



    
  )
}
