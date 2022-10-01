import CardPanel from './CardPanel';
import axios from '../../utils/axios';
import AuthContext from '../../context/AuthContext';
// import { Link } from 'react-router-dom'
// import logo from '../../assets/Logo.png'
import { useEffect, useContext } from 'react';
import { useState } from 'react';
import LikeFurniture from '../Like/LikeFurniture';
import classes from './SubCarousel.module.css';

function SubCarousel(props) {
  const [populars, setPopulars] = useState([]);
  const [recommends, setRecommends] = useState([]);
  const [mostReviews, setMostReviews] = useState([]);
  const [latests, setLatests] = useState([]);
  // const [hots, setHots] = useState([])

  let { BASE_URL, authTokens } = useContext(AuthContext);

  // const getHots = async () => {
  //   const response = await axios.get(BASE_URL + 'furnitures/hot/furniture/', {
  //     headers: {
  //       Authorization: `Bearer ${authTokens.access}`
  //     }
  //   })
  //   const hotData = await response.data;
  //   setPopulars(hotrData.furnitures);
  // }

  const getPopulars = async () => {
    const response = await axios.get(BASE_URL + 'furnitures/label/rate/', {
      headers: {
        Authorization: `Bearer ${authTokens.access}`,
      },
    });
    const popularData = await response.data;
    setPopulars(popularData.furnitures);
  };

  const getRecommends = async () => {
    const response = await axios.get(BASE_URL + 'furnitures/recommend/furniture/', {
      headers: {
        Authorization: `Bearer ${authTokens.access}`,
      },
    });
    const recommendData = await response.data;
    setRecommends(recommendData);
  };

  const getLatests = async () => {
    const response = await axios.get(BASE_URL + 'recommendations/recomUserRecentSee/', {
      headers: {
        Authorization: `Bearer ${authTokens.access}`,
      },
    });
    const latestData = await response.data;
    setLatests(latestData);
  };

  const getMostReviews = async () => {
    const response = await axios.get(BASE_URL + 'furnitures/label/review/', {
      headers: {
        Authorization: `Bearer ${authTokens.access}`,
      },
    });
    const reviewData = await response.data;
    setMostReviews(reviewData.furnitures);
  };

  const addLatests = async (newItem) => {
    getLatests();
  };

  useEffect(() => {
    getPopulars();
    getRecommends();
    getMostReviews();
    getLatests();
    // getHots()
  }, []);
  // console.log(populars)
  return (
    <div>
      <div
        style={{ maxWidth: 1500, marginLeft: 'auto', marginRight: 'auto', marginTop: 64 }}
      >
        <h1>Latests</h1>
        <p className={classes.explain_text}>Your recently viewed furnitures</p>
        <br />
        {latests.length ? (
          <CardPanel show={4} populars={latests}>
            {latests.map((popular) => (
              <LikeFurniture
                key={popular.id}
                furniture={popular[0]}
                addLatest={addLatests}
              ></LikeFurniture>
            ))}
          </CardPanel>
        ) : (
          <div> There aren't any Latests Furniture</div>
        )}
      </div>

      {/* <div style={{ maxWidth: 1500, marginLeft: 'auto', marginRight: 'auto', marginTop: 64 }}>
        <h1>Real time HOTs</h1>
          <br />
          {hots.length? 
          <CardPanel
            show={4}
            populars={hots}>
              {hots.map((hot) => (
                <LikeFurniture key= {hot.id} furniture = {hot[0]} addLatest = {addLatests}>              
                </LikeFurniture>
              ))}        
          </CardPanel>
          : 
          <div> There aren't any Real time hot Furniture</div>
          }
      </div> */}

      <div
        style={{ maxWidth: 1500, marginLeft: 'auto', marginRight: 'auto', marginTop: 64 }}
      >
        <h1>Recommended</h1>
        <p className={classes.explain_text}>
          Recommend by your preference style and color
        </p>
        <br />
        {recommends.length ? (
          <CardPanel show={4} populars={recommends}>
            {recommends.map((recommend) => (
              <LikeFurniture
                key={recommend.id}
                furniture={recommend}
                addLatest={addLatests}
              ></LikeFurniture>
            ))}
          </CardPanel>
        ) : (
          <div>There aren't any Recommended Furniture</div>
        )}
      </div>

      <div
        style={{ maxWidth: 1500, marginLeft: 'auto', marginRight: 'auto', marginTop: 64 }}
      >
        <h1>Most Reviews</h1>
        <p className={classes.explain_text}>Recommend by number of furniture reviews</p>
        <br />
        <CardPanel show={4} populars={mostReviews}>
          {mostReviews.map((mostReview) => (
            <LikeFurniture
              key={mostReview.id}
              furniture={mostReview}
              addLatest={addLatests}
            ></LikeFurniture>
          ))}
        </CardPanel>
      </div>

      <div
        style={{ maxWidth: 1500, marginLeft: 'auto', marginRight: 'auto', marginTop: 64 }}
      >
        <h1>Popular</h1>
        <p className={classes.explain_text}>Recommend by number of furniture liked</p>
        <br />
        <CardPanel show={4} populars={populars}>
          {populars.map((popular) => (
            <LikeFurniture
              key={popular.id}
              furniture={popular}
              addLatest={addLatests}
            ></LikeFurniture>
          ))}
        </CardPanel>
      </div>
    </div>
  );
}

export default SubCarousel;
