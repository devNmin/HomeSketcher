import React from 'react'
import Card from 'react-bootstrap/Card';
import { useState, useContext } from 'react';
import AuthContext from '../../../context/AuthContext';
import axios from 'axios';
import { button } from 'react-bootstrap'

export default function StageThreeFurniture(props) {
	let { BASE_URL, authTokens } = useContext(AuthContext)
	
	// props.like 받았다고 가정 기본 default 값은 false 대신에 props.like가 들어가겠지?	
	const [isMouseon, setIsMouseOnHandler] = useState(false)
	const furniture = props.furniture

	const onClickFurnitureHandler = async (id) => {
		await axios.get(BASE_URL + `furnitures/click/${id}`, {
			headers: {
				Authorization: `Bearer ${authTokens.access}`
			}
		})
	}

	const nameSpacer = (name) => {
		if (name.length > 27) {
			const newname = name.slice(0, 22) + '...'
			return (
				newname
			)
		} else {
			return name
		}
	}

	return (		
			<Card style={{ maxWidth : '120px'}} 
				>				
				<button onClick={() => {props.getFurnObj(furniture)}} style={{ width: '5px', height : '5px',position : 'absolute' , display : 'flex', marginLeft: '103px', cursor : 'pointer'}} type="button" className="btn-close" aria-label="Close"></button>
				<p style={{ display : 'flex', justifyContent : 'center', marginBottom: '0.5rem', marginTop: '0.5rem'}}>{furniture.furniture_price}$</p>									
				<Card.Img variant="top" src={furniture.furniture_image} />				
				<Card.Body				
				onMouseEnter={() => { setIsMouseOnHandler(true) }} 	      // 마우스엔터 이벤트이면 hide가 false가 된다.
				onMouseLeave={() => { setIsMouseOnHandler(false) }}>
					<b style={{fontSize : '0.1vw'}}>
						{isMouseon ? <p>
						 {furniture.furniture_name} </p>: 
						 <p>{nameSpacer(furniture.furniture_name)}</p>}			

					</b>																
				</Card.Body>
				{/* <Card.Body style={{ paddingBottom: '0px' }}>
				</Card.Body> */}
			</Card>
		
	)
}
