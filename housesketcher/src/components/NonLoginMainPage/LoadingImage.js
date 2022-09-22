import React from 'react';
import loadingImage from '../../assets/loadingPage.gif'
import styles from './LoadingImage.module.css'
import logo from '../../assets/Logo.png'

function LoadingImage(props) {
	return (
		<>
			<div className={styles.container}>
				<img className={styles.logo1} src={logo} alt='/' />
				<img className={styles.logo2} src={loadingImage} alt='/' />
			</div>
		</>
	);
}

export default LoadingImage;