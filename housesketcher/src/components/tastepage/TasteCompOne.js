import React, {useState, useEffect} from 'react'
// import AuthContext from '../../context/AuthContext'
import TasteListFirst from './TasteListFirst'
import axios from '../../utils/axios'


export default  function TasteCompOne(props) {    
    let [tastelist, setTasteList] = useState([])  
    // let {BASE_URL, authTokens} = useContext(AuthContext)
    let tasteIdList = props.tasteIdList

    useEffect(() => {
        axios.get('interests/data/').then(response => {
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
