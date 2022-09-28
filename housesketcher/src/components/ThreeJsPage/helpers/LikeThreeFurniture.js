import React from 'react'
import Card from 'react-bootstrap/Card';
import { useState, useContext } from 'react';
import AuthContext from '../../../context/AuthContext';
import axios from 'axios';


export default function LikeThreeFurniture(props) {
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
			<Card style={{ width: '33%', height: '33%', maxHeight: '33%' , cursor: 'pointer' }} key={furniture.id}
				onClick = {() => {props.getFurnObj(furniture.glb_url)}}>				
				<Card.Img onClick={() => { onClickFurnitureHandler(furniture.id) }} variant="top" src={furniture.furniture_image} />				
				<Card.Body
				style={{ height: '120px', maxHeight: '120px', paddingBottom: '0px', marginTop: '20px' }}
				>
					<div
						onMouseEnter={() => { setIsMouseOnHandler(true) }} 	      // 마우스엔터 이벤트이면 hide가 false가 된다.
						onMouseLeave={() => { setIsMouseOnHandler(false) }}>
						{isMouseon ? <b> {furniture.furniture_name}</b> : <b>{nameSpacer(furniture.furniture_name)}</b>}
					</div>								
				</Card.Body>
				{/* <Card.Body style={{ paddingBottom: '0px' }}>
				</Card.Body> */}
			</Card>
		
	)
}
