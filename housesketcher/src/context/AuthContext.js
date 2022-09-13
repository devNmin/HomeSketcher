import { createContext, useState, useEffect } from 'react';
// import jwt_decode from "jwt-decode"
// AuthContext에 유저 정보를 저장하고 userProvider를 통해 어디서부터 어디까지 유저 정보를 사용할지 선택이 가능하다
import { useHistory } from 'react-router-dom';

const AuthContext = createContext();

export default AuthContext; 

export const AuthProvider = ({children}) => {
    // 콜백을 쓰는 이유는 안 쓸 경우 페이지가 로드 될때마다 계속 작동하기 때문에 
    let [user, setUser] = useState(() => localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null)
    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let BASE_URL = 'http://127.0.0.1:8000/'
    let [loading, setLoading] = useState(true)

    const history = useHistory()  


    let loginUser = async (e) => {
        e.preventDefault()
        console.log('Form submitted');
        let response = await fetch( BASE_URL +'auths/login/' , {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({'user_email' : e.target.useremail.value, 'user_password' : e.target.userpassword.value})
        })
        let data = await response.json()
        console.log('data :', data.token);    
        if(response.status === 200) {
            setAuthTokens(data.token)
            setUser(data.user)
            localStorage.setItem('authTokens', JSON.stringify(data.token))
            localStorage.setItem('userInfo', JSON.stringify(data.user))
            history.push('/')    
        }else {
            alert('Login Failed!')
        }
         
    }

    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('userInfo')
        localStorage.removeItem('authTokens')
        history.push('/login')
    }

    // refresh token 관련 함수
    let updateToken = async (e) => {       
        console.log('refresh submitted');
        let response = await fetch( BASE_URL +'auths/token_refresh/' , {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({'refresh' : authTokens.refresh})
        })
        let data = await response.json()

        if(response.status == 200 ){
            setAuthTokens(data.access)
            localStorage.setItem('authTokens', JSON.stringify(data.access))
        }else {
            logoutUser()
        }
    
    }

    // 로그인 함수를 생성한 후 이를 contextData에 담아서 사용이 가능하게 한다. 
    let contextData = {
        user : user, 
        loginUser : loginUser,
        logoutUser : logoutUser,
        BASE_URL : BASE_URL,

    }

    // useEffect를 사용해 5분마다 token refresh하기 
    // useEffect(() => {

    //     setInterval(() => {
    //         if(authTokens){
    //             updateToken()
    //         }
    //     }, 2000)

        
    // }, [authTokens, loading])

    return(
        <AuthContext.Provider value={contextData} >
            {children}
        </AuthContext.Provider>
    )
} 

