import React, {useState} from 'react'
import RecomFurn from './RecomFurn'

export default function ItemUX(props) {
    let key = props.furnkey
    const value = props.furnvalue
    const [isOpen, setMenu] = useState(false)
    const toggleMenu = () => {
        setMenu(isOpen => !isOpen); // on,off 개념 boolean
    }
  return (
    <div style={{ marginBottom: '2px'}} >
        <button onClick={()=>toggleMenu()} style={{ width: '100%'}}>{key}</button>
        {isOpen?
        <RecomFurn  addObj = {props.addobjHandler} furnitures = {value}/>  : null }
         
           

        
                       
    </div>
  )
}
