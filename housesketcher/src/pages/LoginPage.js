import './LoginPage.css'
import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'
import { Link } from 'react-router-dom'



function LoginPage() {
    let { loginUser } = useContext(AuthContext)
    
    return (
        <div>               
            <form onSubmit={loginUser}>
                <input type= "email" name = 'useremail' placeholder='Enter your email'/>
                <input type= "password" name = 'userpassword' placeholder='Enter your email'/>
                <input type= "submit" value= 'Login'/>
            </form>
            <Link to ="/register"><button>
                Create account
            </button>
            </Link>
            
        </div>
    )
    }

export default LoginPage
