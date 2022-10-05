import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import MainCarousel from '../components/LoginMainPage/MainCarousel'
import SubCarousel from '../components/LoginMainPage/SubCarousel'
import Footer from '../components/Footer/Footer';
import styles from './LoginMainPage.module.css'
import { useTheme } from '../context/themeProvider'
import ThemeToggle from '../theme/ThemeToggle'


// import styles from './LoginMainPage.module.css'

function LoginMainPage(props) {	
	const [ThemeMode, toggleTheme] = useTheme();
	return (
		<div className={styles.LoginMainPage}>
			<ThemeToggle toggle={toggleTheme} mode={ThemeMode}>
      		</ThemeToggle>
			<Navbar />
			<MainCarousel />
			<SubCarousel />
			<br />
			<br />
			<br />
			<br />					
			<Footer />
		</div>
	);
}

export default LoginMainPage;