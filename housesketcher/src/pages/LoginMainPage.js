import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import MainCarousel from '../components/LoginMainPage/MainCarousel'
import SubCarousel from '../components/LoginMainPage/SubCarousel'
import Footer from '../components/Footer/Footer';

function LoginMainPage(props) {
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