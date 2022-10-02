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
  const isLight = window.localStorage.theme === 'light';
  const BtnClass = isLight ? classes.btn_dark : classes.btn;
  const PopupClass = isLight ? classes.popup_dark : classes.popup;

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
      <div className={isLight ? classes.main_dark : classes.main}>
        <a
          href="#ai_style"
          onClick={() => {
            setIsMain(false);
          }}
        >
          <button className={isMain ? BtnClass : classes.display_none}>
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

      <section id="ai_style" className={PopupClass}>
        <div className={classes.my_margin}>
          <a
            href="#"
            onClick={() => {
              setIsMain(true);
            }}
          >
            <button className={BtnClass}>
              <span>Back</span>
            </button>
          </a>
          <div className={classes.my_margin}></div>
          <AIStyle isLight={isLight} />
        </div>
      </section>

      <section id="style_age" className={PopupClass}>
        <div className={classes.my_margin}>
          <a
            href="#"
            onClick={() => {
              setIsMain(true);
            }}
          >
            <button className={BtnClass}>
              <span>Back</span>
            </button>
          </a>
          <div className={classes.my_margin}></div>
          <StyleBarChart responseData={responseData.ageStyle} isLight={isLight} />
        </div>
      </section>

      <section id="style_gender" className={PopupClass}>
        <div className={classes.my_margin}>
          <a
            href="#"
            onClick={() => {
              setIsMain(true);
            }}
          >
            <button className={BtnClass}>
              <span>Back</span>
            </button>
          </a>
          <div className={classes.my_margin}></div>
          <StyleRaderChart
            maleData={responseData.maleStyle}
            femaleData={responseData.femaleStyle}
            isLight={isLight}
          />
        </div>
      </section>

      <section id="color_age" className={PopupClass}>
        <div className={classes.my_margin}>
          <a
            href="#"
            onClick={() => {
              setIsMain(true);
            }}
          >
            <button className={BtnClass}>
              <span>Back</span>
            </button>
          </a>
          <div className={classes.my_margin}></div>
          <ColorBarChart responseData={responseData.ageColor} isLight={isLight} />
        </div>
      </section>

      <section id="color_gender" className={PopupClass}>
        <div className={classes.my_margin}>
          <a
            href="#"
            onClick={() => {
              setIsMain(true);
            }}
          >
            <button className={BtnClass}>
              <span>Back</span>
            </button>
          </a>
          <div className={classes.my_margin}></div>
          <ColorRaderChart
            maleData={responseData.maleColor}
            femaleData={responseData.femaleColor}
            isLight={isLight}
          />
        </div>
      </section>
    </div>
  );
}

export default HomeSketcherAIPage;
