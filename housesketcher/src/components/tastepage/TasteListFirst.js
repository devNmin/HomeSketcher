import { width } from '@mui/system'
import React, {useState} from 'react'
import './TasteList.css'

export default function TasteListFirst(props) {
  let [tastelist, setTasteList] = useState(props.tastelist)

  const clickTasteHandler = (id) => {
    setTasteList(
      tastelist.map((taste) => 
      taste.id === id ? {...taste, selected : !taste.selected} : taste)
    )
  }

  return (
    <div>      
      <div style={{ backgroundColor : '#F8E9BD' , paddingTop: '20px', paddingBottom: '20px',paddingLeft : '30px',paddingRight : '30px', borderRadius : '20px', marginLeft : '30px', marginRight : '30px'}}>
              {props.tastelist.map(taste => {
                  return (
                                                         
                    <img className='tasteselectimage' style={{ borderRadius : '10%', padding: '10px' , width : '380px', height : '380px'}} key= {taste.id}src={taste.image_url} alt="" />                                
                                   
                  )
              })} 
      </div>
    </div>
  )
}
