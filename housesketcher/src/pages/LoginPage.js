import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { Link } from 'react-router-dom'
import logo from '../assets/Logo.png'
import styles from './LoginPage.module.css'



function LoginPage() {
	let { loginUser } = useContext(AuthContext)

	return (
		<section className={styles.auth}>
			<form onSubmit={loginUser}>
				<img src={logo} alt="" />
				<div className={styles.control}>
					<label>Email address</label>
					<input type="email" name='useremail' placeholder='Enter your email' />
				</div>
				<div className={styles.control}>
					<label>Password</label>
					<input type="password" name='userpassword' placeholder='Enter your email' />
				</div>
				<div className={styles.actions}>
					<input type="submit" value='Login' />
				</div>
			</form>
			<Link to="/register" className={styles.actions}>
			<button>
				Create account
			</button>
			</Link>
		</section>
	)
}

export default LoginPage
