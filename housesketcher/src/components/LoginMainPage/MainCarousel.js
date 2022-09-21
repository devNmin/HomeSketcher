import Carousel from 'react-bootstrap/Carousel';
import image1 from '../../assets/mainCarousel1.jpg';
import image2 from '../../assets/mainCarousel2.jpg';
import styles from './MainCarousel.module.css';

function UncontrolledExample() {
  return (
    <Carousel className={styles.carousel}>
      <Carousel.Item>
        <img className="d-block w-100" src={image1} alt="First slide" />
        <Carousel.Caption>
          <h3>Welcome Clean and Clear White Wood</h3>
          <p>Goodbye Dark Material</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={image2} alt="Second slide" />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={image1} alt="Third slide" />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default UncontrolledExample;
