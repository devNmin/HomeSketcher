import React , {useContext }from 'react';
import Navbar from '../components/Navbar/Navbar';
import MainCarousel from '../components/LoginMainPage/MainCarousel'
import SubCarousel from '../components/LoginMainPage/SubCarousel'
import Footer from '../components/Footer/Footer';
import AuthContext from '../context/AuthContext';

// import styles from './LoginMainPage.module.css'

function LoginMainPage(props) {
	let {user} = useContext(AuthContext)
	return (
		<>
			<Navbar />
			<MainCarousel />
			<SubCarousel />
			<SubCarousel />
			<SubCarousel />
			<SubCarousel />
			<SubCarousel />			
			<Footer />
		</>
	);
}

export default LoginMainPage;