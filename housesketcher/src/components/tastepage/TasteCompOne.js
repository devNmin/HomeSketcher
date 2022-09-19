import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import AuthContext from '../../context/AuthContext'
import TasteListFirst from './TasteListFirst'
import TasteListSecond from './TasteListSecond'


export default  function TasteCompOne(props) {    
    let [tastelist, setTasteList] = useState([])  
    let {BASE_URL, authTokens} = useContext(AuthContext)
    let tasteIdList = props.tasteIdList

    useEffect(() => {
        axios.get(BASE_URL + 'interests/data/', {
            headers :{
                Authorization : `Bearer ${authTokens.access}`
            } 
        }).then(response => {
                setTasteList(response.data);
            });
            console.log(tastelist);
    }, []);  
     
    const saveTasteHandler = (enteredtaste) => {
        props.AddTaste(enteredtaste)     
    }
        
    // const clickTasteHandler = () => {
    //     setIsSelected(isselected = !isselected)
    // }
          
  return (
    <div >        
        {/* test 용 총 20개 */}
        <div>
            <TasteListFirst tastelist = {tastelist} saveTaste = {saveTasteHandler} tasteId = {tasteIdList} />
        </div>
        <br />
        {/* <div>
            <TasteListSecond tastelist = {tastelist.slice(8,16)}/>
        </div>       */}
        
          
    </div>
  )
}
