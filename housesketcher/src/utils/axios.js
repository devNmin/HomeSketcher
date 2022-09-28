import Axios from 'axios' 
import jwt_decode from 'jwt-decode'
import dayjs from 'dayjs'

const baseURL = 'https://j7b304.p.ssafy.io/api/v1/';

let authTokens = localStorage.getItem('authTokens')? JSON.parse(localStorage.getItem('authTokens')): null



const axios = Axios.create({
    baseURL, 
    headers : {
        Authorization : `Bearer ${authTokens?.access}`
    }
}) 

axios.interceptors.request.use(async req => {
    // 요청을 보내기 전 요청에 autoken이 없는 경우 local에서 넣어준다. 
    if(!authTokens) {
        authTokens = localStorage.getItem('authTokens')? JSON.parse(localStorage.getItem('authTokens')): null
        req.headers.Authorization = `Bearer ${authTokens?.access}`
    }

    // jwt decode를 통해서 토큰의 exp 시간이 현재 시간과의 차이가 1초미만일때 expired 됨 (access 토큰이 요청보내기전 만료됐는지 확인)
    const user = jwt_decode(authTokens.access)
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1
    // access 토큰이 만료되지 않았을 경우, 요청을 그대로 보냄 
    if(!isExpired) return req
    // access 토큰이 만료되었을 경우 refresh 요청을 통해서 access 토큰을 바꿔줘야 한다. 
    // 가지고 있는 refresh  토큰으로 갱신 즉, 새로운 acceess 토큰을 요청한다.
    try {
        const response = await axios.post(baseURL + 'auths/token_refresh/',{
            refresh: authTokens.refresh
        })
        // 요청 성공시 결과로부터 새로운 access 토큰을 받고 이를 set을 통해 갱신해준다. 
        let data = await response.json()
        localStorage.setItem('authTokens',JSON.stringify({ access: data.access, refresh: authTokens.refresh }))
        req.headers.Authorization = `Bearer ${response.data.access}`
        return req
        
    }
    // 실패시 refresh 토큰이 만료되었다는 의미기 때문에 자동으로 logout을 해주어야한다. AuthContext에 잇는 logout 그대로 구현해준다. 
    catch (error) {
        localStorage.removeItem('userInfo');
        localStorage.removeItem('authTokens');
        window.location.replace("/")
    }    
})

export default axios