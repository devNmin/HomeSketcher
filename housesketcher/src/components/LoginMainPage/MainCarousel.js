import Carousel from 'react-bootstrap/Carousel';
import image1 from '../../assets/mainCarousel1.jpg';
import image2 from '../../assets/mainCarousel2.jpg';
import styles from './MainCarousel.module.css';

function UncontrolledExample() {
  return (
    <Carousel className={styles.carousel}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={image2}
          alt="Second slide"
        />

        <Carousel.Caption className={styles.carousel_inner}>
          <h3>2022, LIFE STYLE TREND</h3>
          <p>Meet the lifestyle trends</p>
          <p>suggested by HomeSketch for the upcoming fall</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={image1}
          alt="First slide"
        />
        <Carousel.Caption className={styles.carousel_inner}>
          <h3>Welcome Clean and Clear White Wood</h3>
          <p>Goodbye Dark Material</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={image1}
          alt="Third slide"
        />

        <Carousel.Caption className={styles.carousel_inner}>
          <h3>October Furniture Event News</h3>
          <p>
            Up to 50% off bed/mattress/sofa/chair
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default UncontrolledExample;