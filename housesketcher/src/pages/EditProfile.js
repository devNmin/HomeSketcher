import React, { useContext, useRef, useState } from 'react'
import styles from './AccountRegisterPage.module.css'
import AuthContext from '../context/AuthContext'
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from '../assets/Logo.png'
import swal from "sweetalert2";


export default function EditProfilePage() {
  const { BASE_URL , user, logoutUser} = useContext(AuthContext)
  const emailInput = useRef();
  const passwordInput = useRef();
  const passwordCheckInput = useRef();
  const nameInput = useRef();
  const nicknameInput = useRef();
  const birthInput = useRef();
  const history = useHistory()
  let [formData, setformData] = useState({
    gender: user.user_gender
  })
  let [gender, setGender] = useState(user.user_gender == "0" ? 'male' : 'female')





  // const handleChange = async (event) => {
  //   event.preventDefault()
  //   const value = event
  //   console.log(value);
  //   if (event === 0) {
  //     setGender('male')      
  //   }else {
  //     setGender('female')
  //   }
  //   setformData({      
  //     gender: value
  //   })
  // }
  const authTokens = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')): null
  const resignClickHandler = () => {
    swal.fire({
      title : 'Do you really really want to resign?',
      text : 'if you resign, you can not go back',
      icon : 'warning',

      showCancelButton :true,
      confirmButtonColor : '#3085d6',
      cancelButtonColor : '#d33',
      confirmButtonText : 'Approved',
      cancelButtonText : 'Cancel',
      reverseButtons : true
    }).then(
      result => {
        if(result.isConfirmed){
          swal.fire('Resign Complete', 'Goodbye...', 'success')
          fetch(BASE_URL + `auths/delete/${user.id}/`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + authTokens.access
            }
          }).then(res => logoutUser())
          
          
        }
      }
    )
  }

  const maleChange = async (event) => {
    event.preventDefault()
    setGender('male') 
    setformData({
      gender : 0
    })  

  }

  const femaleChange = async (event) => {
    event.preventDefault()
    setGender('female')    
    setformData({
      gender : 1
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
    // console.log(formData.gender);

    const emailsubmit = emailInput.current.value;
    const passwordsubmit = passwordInput.current.value;
    const passwordchecksubmit = passwordCheckInput.current.value;
    const namesubmit = nameInput.current.value;
    const nicknamesubmit = nicknameInput.current.value;
    const brithsubmit = birthInput.current.value;
    

    await fetch(BASE_URL + 'accounts/update/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + authTokens.access
      },
      body: JSON.stringify({
        "user_email": emailsubmit,
        "password": passwordsubmit,
        "password2": passwordchecksubmit,
        "user_name": namesubmit,
        "user_nickname": nicknamesubmit,
        "user_gender": formData.gender,
        "user_birth": brithsubmit
      })

    }).then(res => {
      if (res.ok) {
        new swal(
          'Editing Profile',
          'Success'
          , 'success'

        )
        history.push('/login')

      } else {
        new swal(
          'Oops!',
          'Something went wrong please check again',
          'error'
        )
      }
    })

  }

  return (
    <div>
      <section className={styles.auth}>
        <div style={{ display: 'flex', justifyContent: "center" }}>
          <img src={logo} alt="" />

        </div>
        <form>
          <div className='Signup'>
            <div>
              {/* 아이디 */}
              <div className={styles.control}>
                <h5> E-mail </h5>
                <div className={styles.Email}>
                  <input type='email' maxLength='20' name='signup_email' ref={emailInput}  defaultValue = {user.user_email}/>
                  <button className={styles.EmailCheck} onClick={emailcheckHandler}>check</button>
                </div>
              </div>
              {/* 비밀번호 */}
              <div className={styles.control}>
                <h5 className={styles.password}> Password </h5>
                <input type='password' maxLength='15' name='signup_password' ref={passwordInput} />
              </div>
              {/* 비밀번호2 */}
              <div className={styles.control}>
                <h5> Password Check </h5>
                <input type='password' maxLength='15' name='signup_pswCheck' ref={passwordCheckInput} />
              </div>
            </div>

            <div id='signup_section'>
              {/* 이름 */}
              <div className={styles.control}>
                <h5> Name </h5>
                <input type='text' maxLength='10' name='signup_name' ref={nameInput}  defaultValue = {user.user_name}/>
              </div>

              <div className={styles.control}>
                <h5> Nickname </h5>
                <input type='text' maxLength='10' name='signup_nickname' ref={nicknameInput} defaultValue = {user.user_nickname}/>
              </div>

              <div className={styles.actions}>
                <h5 style={{ paddingBottom: '10px' }}> Gender & Birth </h5>

                <div style={{ display: 'flex', justifyContent : 'space-between', marginLeft: '45px',marginRight: '45px', marginBottom: '30px' }}>                 
                     <button onClick = {maleChange} style ={{ backgroundColor : gender === 'male'? '#D3B24B' : null}}>Male</button>
                     <button onClick = {femaleChange} style ={{ backgroundColor : gender === 'female'? '#D3B24B' : null}}>Female</button>                   
{/* 
                    <label>남자</label>
                    <input className='mx-2' type="radio" id="male" name="gender" value="0" onChange={handleChange} />
                    <label>여자</label>
                    <input className='mx-2' id="female" type="radio" name="gender" value="1" onChange={handleChange} /> */}           
                </div>
                <div style={{ display: 'flex', justifyContent: "start", marginLeft: '45px'}}>
                  <input type="date" maxLength='6' name='signup_birthday' ref={birthInput} defaultValue = {user.user_birth} />
                </div>
              </div>
              <br />
              <div>
              </div>
              {/* 생년월일 */}
              {/* 생년월일 */}
            </div>
          </div>
          <button onClick={submitHandler} >Edit Profile</button>
        </form>
        <br />


        <Link className={styles.linkP} to='/loginmain'>
          <p>Cancel editing profile</p>
        </Link>

        <b onClick = {resignClickHandler} className={styles.linkP} >
          <p>Click if you want to resign...</p>
        </b>
      </section>

    </div>



  )
}
