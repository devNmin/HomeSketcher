import React, {useContext, useState, useEffect } from 'react'
import AuthContext from '../context/AuthContext';
import Navbar from '../components/Navbar/Navbar';
import TasteCompOne from '../components/tastepage/TasteCompOne';
import { useHistory } from 'react-router-dom';
import axios from 'axios'
import swal from "sweetalert2";
import ClipLoader from "react-spinners/ClipLoader";


function TasteAnalysisPage() {
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }, [])


    let { user , BASE_URL, authTokens } = useContext(AuthContext)
    const [tastelist, setTasteList] = useState([]);
    const history = useHistory()  

    const InitializeHandler = () => {
        setTasteList([])
    }


    
    const SubmitTasteList = async () => {
        if (!tastelist.length) {
            new swal(
                'Error!',
                `Please choose at least one interior image`,
                'error'
              )                        
        } else {
            await axios.post(BASE_URL + 'interests/user/', {
                img_list : tastelist
            },{
                headers :{
                    Authorization : `Bearer ${authTokens.access}`,
                    'Content-Type' : 'application/json'
                }
                 
            }).then(res => {
                new swal(
                    'Taste analysis complete',
                    `Your style : ${res.data.style}, Your color : ${res.data.color} `,
                    'success',{
                        showCancelButton: true,
                        cancelButtonText: 'cancel',
                        reverseButtons: true,
                    }
                    
                  )
                  history.push('/loginmain').then((() =>window.scrollTo(0,0) ))
                
            })
        }      

    }


    // const goToLoginMain = () => {
        
    // }
    
    
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
        {loading? 
        <b>
            <div style={{display :'flex', justifyContent: 'center'}}>
                <h3>Preparing for</h3>          
            </div>
            <div style={{display :'flex', justifyContent: 'center'}}>
                <h3>Your images</h3>
            </div>
            <div style={{display :'flex', justifyContent: 'center'}}>
                <ClipLoader color={'#F3CD58'} loading={loading}  size={50} />
                
            </div>

         </b>
        :

        <b>

            <div style={{display :'flex', justifyContent: 'center'}}>
                <h3>Select {user.user_nickname}'s</h3>          
            </div>
            <div style={{display :'flex', justifyContent: 'center'}}>
                <h3>Interior Taste</h3>
            </div>
        </b>
        }       
        <br />
        
        <div style={loading? {display : 'none'} : null }>
            <TasteCompOne AddTaste = {AddTasteHandler} tasteIdList = {tastelist}/>
            <div style={{display : 'flex', justifyContent: 'center'}}>
                <button style={{ marginRight : '30px'}} onClick = {InitializeHandler}>Initialize</button>
                <button style={{ marginLeft : '30px'}} onClick={SubmitTasteList}>Submit</button>
            </div>
        </div>
        <br />
    </div>
 )   
}
export default TasteAnalysisPage