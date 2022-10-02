import Navbar from '../components/Navbar/Navbar';
import { useEffect, useState } from 'react';
import axios from '../utils/axios';
import classes from './HomeSketcherAIPage.module.css';
import AIStyle from '../components/HomeSketcherAIPage/AIStyle';
import StyleBarChart from '../components/HomeSketcherAIPage/StyleBarChart';
import StyleRaderChart from '../components/HomeSketcherAIPage/StyleRaderChart';
import ColorBarChart from '../components/HomeSketcherAIPage/ColorBarChart';
import ColorRaderChart from '../components/HomeSketcherAIPage/ColorRaderChart';
import LoadingText from '../components/Common/LodingText';

function HomeSketcherAIPage() {
  const [responseData, setResponseData] = useState(null);
  const [isMain, setIsMain] = useState(true);

  const chartList = {
    StyleBarChart: 0,
    StyleRaderChart: 0,
    ColorBarChart: 0,
    ColorRaderChart: 0,
  };
  const responseDataHandler = async () => {
    await axios
      .get('auths/trend')
      .then((response) => {
        setResponseData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    responseDataHandler();
  }, []);

  if (!responseData) {
    return <LoadingText />;
  }
  return (
    <div className={classes.body}>
      <Navbar />
      <div className={classes.main}>
        {/* TODO2 : css 고치기 : 버튼 호버 색! 갈라지는 효과 가운데서 시작하게 하기*/}
        <a
          href="#ai_style"
          onClick={() => {
            setIsMain(false);
          }}
        >
          <button className={isMain ? classes.btn : classes.display_none}>
            <span>AI Style Analytics</span>
          </button>
        </a>
        <a
          href="#style_age"
          className={classes.open_popup}
          onClick={() => {
            setIsMain(false);
          }}
        >
          Style by age
        </a>
        <a
          href="#style_gender"
          className={classes.open_popup}
          onClick={() => {
            setIsMain(false);
          }}
        >
          Style by gender
        </a>

        <a
          href="#color_age"
          className={classes.open_popup}
          onClick={() => {
            setIsMain(false);
          }}
        >
          Color by age
        </a>
        <a
          href="#color_gender"
          className={classes.open_popup}
          onClick={() => {
            setIsMain(false);
          }}
        >
          Color by gender
        </a>
      </div>

      <section id="ai_style" className={classes.popup}>
        <div className={classes.my_margin}>
          <a
            href="#"
            onClick={() => {
              setIsMain(true);
            }}
          >
            <button className={classes.btn}>
              <span>Back</span>
            </button>
          </a>
          <div className={classes.my_margin}></div>
          <AIStyle />
        </div>
      </section>

      <section id="style_age" className={classes.popup}>
        <div className={classes.my_margin}>
          <a
            href="#"
            onClick={() => {
              setIsMain(true);
            }}
          >
            <button className={classes.btn}>
              <span>Back</span>
            </button>
          </a>
          <div className={classes.my_margin}></div>
          <StyleBarChart responseData={responseData.ageStyle} />
        </div>
      </section>

      <section id="style_gender" className={classes.popup}>
        <div className={classes.my_margin}>
          <a
            href="#"
            onClick={() => {
              setIsMain(true);
            }}
          >
            <button className={classes.btn}>
              <span>Back</span>
            </button>
          </a>
          <div className={classes.my_margin}></div>
          <StyleRaderChart
            maleData={responseData.maleStyle}
            femaleData={responseData.femaleStyle}
          />
        </div>
      </section>

      <section id="color_age" className={classes.popup}>
        <div className={classes.my_margin}>
          <a
            href="#"
            onClick={() => {
              setIsMain(true);
            }}
          >
            <button className={classes.btn}>
              <span>Back</span>
            </button>
          </a>
          <div className={classes.my_margin}></div>
          <ColorBarChart responseData={responseData.ageColor} />
        </div>
      </section>

      <section id="color_gender" className={classes.popup}>
        <div className={classes.my_margin}>
          <a
            href="#"
            onClick={() => {
              setIsMain(true);
            }}
          >
            <button className={classes.btn}>
              <span>Back</span>
            </button>
          </a>
          <div className={classes.my_margin}></div>
          <ColorRaderChart
            maleData={responseData.maleColor}
            femaleData={responseData.femaleColor}
          />
        </div>
      </section>
    </div>
  );
  // return (
  //   <div>
  //     <Navbar />
  //     <div className={classes.justify_center}>
  //       <AIStyle />

  //       <StyleBarChart responseData={responseData.ageStyle} />
  //       <StyleRaderChart
  //         maleData={responseData.maleStyle}
  //         femaleData={responseData.femaleStyle}
  //       />
  //     </div>
  //     <AnimationToggle />
  //   </div>
  // );
}

export default HomeSketcherAIPage;
