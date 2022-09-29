import React from 'react';
import styles from './Footer.module.css'
import logo from '../../assets/Logo.png'

const Footer = () => {
  // function onClickMusinsa() {
  //   window.open('https://www.ikea.com/us/en//', '_blank')
  // }
  return (
    <div className={styles.company}>
      <div className={styles.wrapper_company}>
        <div className={styles.logoCompany}>
          <img src={logo} alt="/" />
          <div className={styles.textCompany}>
            <span>
              This service provides IKEA product information.
            </span>
            <span>
              COPYRIGHT (C) IKEA ALL RIGHTS RESERVED.
            </span>
            <span>salix0228@gamil.com</span>
          </div>
        </div>
        <div className={styles.info}>
          <div>
            <span>
              Contact 010-5092-3539
            </span>
            <span>
              Address 대전광역시 유성구 덕명동 124
            </span>
            <span>https://j7b304.p.ssafy.io/</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;