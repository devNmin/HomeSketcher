import React from 'react'
import './TasteList.css'


export default function TasteListFirst(props) {
  // let [tastelist, setTasteList] = useState(props.tastelist)

  const clickTasteHandler = (id) => {
    props.saveTaste(id)
    // console.log("taste clicked!"+ ' '+id);
    // tastelist.map((taste)=>
    //   taste.id === id?  
    //     console.log(taste.selected) : console.log('hello')
    // )
    // setTasteList(
    //   tastelist.map((taste) => 
    //   taste.id === id ? {...taste, selected : !taste.selected} : taste)
    // )

  }

  return (
    <div>
      {/* <div>
        {props.tasteId}
      </div> */}

      <div style={{ backgroundColor : '#F8E9BD' , paddingTop: '30px', paddingBottom: '20px',paddingLeft : '30px', borderRadius : '20px', marginLeft : '30px', marginRight : '30px'}}>
              {props.tastelist.map(taste => {
                  return (                   
                      <img   key= {taste.id} onClick={() => clickTasteHandler(taste.id)} className='tasteselectimage' style={props.tasteId.includes(taste.id)? 
                        { border :'3px solid ',cursor:'pointer' ,borderColor : '#90EF94',borderRadius : '10%' , width : '350px', height : '350px'}:{ borderRadius : '10%',cursor:'pointer', padding: '10px' , width : '350px', height : '350px'}} src={taste.image_url} alt="" />                                
                                       
                                                                                     
                  )
              })} 
      </div>
    </div>
  )
}
