import React, { useEffect, useState } from 'react'
import styles from './CardPanel.module.css'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Carousel = (props) => {
  const {children, show, populars} = props

  const [currentIndex, setCurrentIndex] = useState(0)
  const [length, setLength] = useState(populars.length)

  const [touchPosition, setTouchPosition] = useState(null)

  // Set the length to match current children from props
  useEffect(() => {
      setLength(populars.length)
  }, [populars])

  const next = () => {
      if (currentIndex < (length - show)) {
          setCurrentIndex(prevState => prevState + 4)
      }
  }

  const prev = () => {
      if (currentIndex > 0) {
          setCurrentIndex(prevState => prevState - 4)
      }
  }

  const handleTouchStart = (e) => {
      const touchDown = e.touches[0].clientX
      setTouchPosition(touchDown)
  }

  const handleTouchMove = (e) => {
      const touchDown = touchPosition

      if(touchDown === null) {
          return
      }

      const currentTouch = e.touches[0].clientX
      const diff = touchDown - currentTouch

      if (diff > 5) {
          next()
      }

      if (diff < -5) {
          prev()
      }

      setTouchPosition(null)
  }
  

  return (
      <div className={styles.carousel_container}>
          <div className={styles.carousel_wrapper}>
              {/* You can alwas change the content of the button to other things */}
              {
                  currentIndex > 0 &&
                  <button onClick={prev} className={styles.left_arrow}>
                      <ArrowBackIosIcon />
                  </button>
              }
              <div
                  className={styles.carousel_content_wrapper}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
              >
                  <div
                      className={`${styles.carousel_content} ${styles.show_4}`}
                      style={{ transform: `translateX(-${currentIndex * (100 / show)}%)` }}
                  >
                      {children}
                  </div>
              </div>
              {/* You can alwas change the content of the button to other things */}
              {
                  currentIndex < (length - show) &&
                  <button onClick={next} className={styles.right_arrow}>
                      <ArrowForwardIosIcon />
                  </button>
              }
          </div>
      </div>
  )
}

export default Carousel