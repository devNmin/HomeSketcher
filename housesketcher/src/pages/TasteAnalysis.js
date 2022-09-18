import React, {useContext, useState} from 'react'
import AuthContext from '../context/AuthContext';
import Navbar from '../components/Navbar/Navbar';
import TasteCompOne from '../components/tastepage/TasteCompOne';


function TasteAnalysisPage() {
    let { user  } = useContext(AuthContext)
    const [tastelist, setTasteList] = useState([])

    
    const SubmitTasteList = () => {
        console.log(tastelist);
    }
    
    const AddTasteHandler = (newtaste) => {
        console.log('addtaste'+ newtaste);
        setTasteList((prevtastelist) => [
            ...prevtastelist, newtaste
        ])
    }
    const DeleteTasteHandler = deletetaste => {
        console.log('delete taste'+deletetaste);
        setTasteList(tastelist.filter(taste=> taste !== deletetaste))
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
        <TasteCompOne AddTaste = {AddTasteHandler} DeleteTaste = {DeleteTasteHandler} />
        <button onClick={SubmitTasteList}>Submit</button>
    </div>
 )   
}
export default TasteAnalysisPage