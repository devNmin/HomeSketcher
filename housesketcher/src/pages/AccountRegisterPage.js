import React, {useContext, useRef, useState} from 'react'
import styles from './AccountRegisterPage.module.css'
import AuthContext from '../context/AuthContext'
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from '../assets/Logo.png'


export default function AccountRegisterPage() {
  const {BASE_URL} = useContext(AuthContext)
  const emailInput = useRef();
  const passwordInput = useRef();
  const passwordCheckInput = useRef();
  const nameInput = useRef();
  const nicknameInput = useRef();
  const birthInput = useRef();
  const history = useHistory() 
  let  [formData, setformData] = useState({
    gender : ""
  })

  const handleChange = event => {
    const value = event.target.value
    console.log(value);
    setformData({
      ...formData,
      gender : value
    })
  }


  const emailcheckHandler = async (event) => {
    event.preventDefault();
    const emailsubmit = emailInput.current.value;
    await axios.get(BASE_URL + `accounts/check/email/${emailsubmit}/`                
      ).then(res => {    
      alert('사용가능한 이메일입니다') 
    
    }).catch(err => {
      alert(err.response.data.error);
    }
      
    )

  }
  
  const submitHandler = async (event) => {
    event.preventDefault();
    console.log(formData.gender);    

    const emailsubmit = emailInput.current.value;
    const passwordsubmit = passwordInput.current.value;
    const passwordchecksubmit = passwordCheckInput.current.value;
    const namesubmit = nameInput.current.value;
    const nicknamesubmit = nicknameInput.current.value;
    const brithsubmit = birthInput.current.value;
    console.log(JSON.stringify({ "user_email": emailsubmit,
    "password": passwordsubmit,
    "password2": passwordchecksubmit,
    "user_name": namesubmit,
    "user_nickname": nicknamesubmit,
    "user_gender": formData.gender,
    "user_birth": brithsubmit}));

    await fetch(BASE_URL + 'auths/signup/', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({ "user_email": emailsubmit,
        "password": passwordsubmit,
        "password2": passwordchecksubmit,
        "user_name": namesubmit,
        "user_nickname": nicknamesubmit,
        "user_gender": formData.gender,
        "user_birth": brithsubmit})

    }).then(res => {
      if(res.ok){
        alert('회원가입이 완료되었습니다.')
        history.push('/login')

      } else {
        alert('회원가입이 실패하였습니다')
      }
    })

  }  

  return (
    <div>
      <div style={{display:'flex', justifyContent : "center"}}>
        <img src= {logo} alt=""  style={{width : '15%', height: '15%'}}/>

      </div>
    <section className={styles.auth}>
    <form onSubmit={submitHandler}>
        
        <div className='Signup'>
          <div>
            {/* 아이디 */}
            <div className={styles.control}>
              <h5> E-mail </h5>
              <div className={styles.Email}>
                <input type='text' maxLength='20' name='signup_email' ref={emailInput}/>
                <button className={styles.EmailCheck} onClick={emailcheckHandler}>check</button>               
              </div>
            </div>
            {/* 비밀번호 */}
            <div className={styles.control}>
              <h5> Password </h5>
              <input type='password' maxLength='15' name='signup_password' ref={passwordInput}/>
            </div>
            {/* 비밀번호2 */}
            <div className={styles.control}>
              <h5> Password Check </h5>
              <input type='password' maxLength='15' name='signup_pswCheck' ref={passwordCheckInput}/>
            </div>
          </div>

          <div id='signup_section'>
            {/* 이름 */}
            <div className={styles.control}>
              <h5> Name </h5>
              <input type='text' maxLength='10' name='signup_name' ref={nameInput}/>
            </div>

            <div className={styles.control}>
              <h5> Nickname </h5>
              <input type='text' maxLength='10' name='signup_nickname' ref={nicknameInput}/>
            </div>

            <div className={styles.actions}>
              <h5> Gender & Birth </h5>
              <div style={{display:'flex', justifyContent : "center"}}>
                <div style={{ marginRight : '20px'}}>
                <label>남자</label>
                <input className='mx-3' type="radio" id="male" name="gender" value="0" onChange={handleChange}/>
                <label>여자</label>
                <input  id="female" type="radio" name="gender" value="1" onChange={handleChange} />
                </div>
                      

                <input style={{ marginLeft : '20px'}} type="date" maxLength='6' name='signup_birthday' ref={birthInput}/>             
              </div>
            </div>
            <div>
            </div>
            {/* 생년월일 */}
            {/* 생년월일 */}
          </div>
        </div>
        <button type='submit'>Sign Up</button>
      </form>
        <Link className={styles.linkP} to= '/login'>
          <p>Already Have An Account</p> 
        </Link>
    </section>

    </div>
   
       

  )
}
