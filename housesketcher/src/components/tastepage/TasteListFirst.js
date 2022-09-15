import React from 'react'

export default function TasteListFirst(props) {
  return (
    <div>
            {props.tastelist.map(taste => {
                return (                   
                    <img key= {taste.id} src={taste.image_url} alt="" />
                )
            })} 
        </div>
  )
}
