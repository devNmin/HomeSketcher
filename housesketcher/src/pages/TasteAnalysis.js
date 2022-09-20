import React, {useContext, useState} from 'react'
import AuthContext from '../context/AuthContext';
import Navbar from '../components/Navbar/Navbar';
import TasteCompOne from '../components/tastepage/TasteCompOne';
import { useHistory } from 'react-router-dom';
import axios from 'axios'


function TasteAnalysisPage() {
    let { user , BASE_URL, authTokens } = useContext(AuthContext)
    const [tastelist, setTasteList] = useState([])
    const history = useHistory()  

    const InitializeHandler = () => {
        setTasteList([])
    }
    
    const SubmitTasteList = async () => {
        await axios.post(BASE_URL + 'interests/user/', {
            img_list : tastelist
        },{
            headers :{
                Authorization : `Bearer ${authTokens.access}`,
                'Content-Type' : 'application/json'
            }
             
        }).then(res => {
            alert('Your Interior Taste Complete!')
            history.push('/loginmain').then((() =>window.scrollTo(0,0) ))
        })

        console.log(tastelist);


    }
    
    const AddTasteHandler = (newtaste) => {
        if (tastelist.includes(newtaste)) {
            console.log('delete taste'+ newtaste);
            setTasteList(tastelist.filter(taste=> taste !== newtaste))                       
        } else {           
            console.log('addtaste'+ newtaste);
            setTasteList((prevtastelist) => [
                ...prevtastelist, newtaste
            ]) 
        }
    }
    
 return (
    <div>
        <Navbar/>
        <br />
        <div style={{display :'flex', justifyContent: 'center'}}>
            <h3>Select {user.user_nickname}'s</h3>          
        </div>
        <div style={{display :'flex', justifyContent: 'center'}}>
            <h3>Interior Taste</h3>
        </div>
        <br />
        <TasteCompOne AddTaste = {AddTasteHandler} tasteIdList = {tastelist}/>
        <button onClick = {InitializeHandler}>Initialize</button>
        <button onClick={SubmitTasteList}>Submit</button>
    </div>
 )   
}
export default TasteAnalysisPage