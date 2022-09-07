import React from 'react';
import styles from './MainCard.module.css'

function MainCarousel(props) {
  return (
    <>
      <section className={styles.Category}>
        <div className={styles.main_card}>
          <img className={styles.left} src="https://cdn.electimes.com/news/photo/202201/227731_144732.jpg" alt="" />
          <div className={styles.right}>
            <h3>몰라몰라</h3>
            <br />
            <p className={styles.content}>취향 분석<br/>당신의 취향을 분석해서
            <br/>최적의 가구를 추천합니다.
            </p>
          </div>
        </div>
        <hr />
        <div className={styles.main_card}>
          <div className={styles.second_text}>
            <h3>몰라몰라</h3>
            <br />
            <p className={styles.content}>취향 분석<br/>당신의 취향을 분석해서
            <br/>최적의 가구를 추천합니다.
            </p>
          </div>
          <img className={styles.second_img} src="https://cdn.electimes.com/news/photo/202201/227731_144732.jpg" alt="" />
        </div>
        <hr />
        <div className={styles.main_card}>
          <img className={styles.left} src="https://cdn.electimes.com/news/photo/202201/227731_144732.jpg" alt="" />
          <div className={styles.right}>
            <h3>몰라몰라</h3>
            <br />
            <p className={styles.content}>취향 분석<br/>당신의 취향을 분석해서
            <br/>최적의 가구를 추천합니다.
            </p>
          </div>
        </div>
        <hr />
      </section>
    </>
  );
}

export default MainCarousel;