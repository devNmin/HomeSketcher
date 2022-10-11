import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import Navbar from '../components/Navbar/Navbar';
import TasteCompOne from '../components/tastepage/TasteCompOne';
import { useHistory } from 'react-router-dom';
import axios from '../utils/axios';
import swal from 'sweetalert2';
import ClipLoader from 'react-spinners/ClipLoader';

function TasteAnalysisPage() {
  const [loading, setLoading] = useState(false);
  const [isMouseon, setIsMouseOnHandler] = useState(false);
  const [localStyle, setLocalStyle] = useState();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  let { user, BASE_URL, authTokens } = useContext(AuthContext);
  const [tastelist, setTasteList] = useState([]);
  const history = useHistory();

  const InitializeHandler = () => {
    setTasteList([]);
  };

  const SubmitTasteList = async () => {
    if (!tastelist.length) {
      new swal('Error!', `Please choose at least one interior image`, 'error');
    } else {
      await axios
        .post(
          BASE_URL + 'interests/user/',
          {
            img_list: tastelist,
          },
          {
            headers: {
              Authorization: `Bearer ${authTokens.access}`,
              'Content-Type': 'application/json',
            },
          }
        )
        .then((res) => {
          if (localStorage.getItem('userInfo')) {
            let info = JSON.parse(localStorage.getItem('userInfo'));
            info.user_style = res.data.style;
            info.user_color = res.data.color;
            localStorage.setItem('userInfo', JSON.stringify(info));
          }
          new swal(
            'Taste analysis complete',
            `Your style : ${res.data.style}, Your color : ${res.data.color} `,
            'success',
            {
              showCancelButton: true,
              cancelButtonText: 'cancel',
              reverseButtons: true,
            }
          );
          history.push('/loginmain');
          //   .then(() => window.scrollTo(0, 0)); ==>> 오류 떠서 지움!
          //error uncaught (in promise) typeerror cannot read property of undefined (reading 'then')
        });
    }
  };

  // const goToLoginMain = () => {

  // }
  const skipClickHandler = async (userid) => {
    await axios.get(BASE_URL + `interests/userRandom/${userid}`);
    history.push('/loginmain');
  };

  const AddTasteHandler = (newtaste) => {
    if (tastelist.includes(newtaste)) {
      setTasteList(tastelist.filter((taste) => taste !== newtaste));
    } else {
      setTasteList((prevtastelist) => [...prevtastelist, newtaste]);
    }
  };

  var style = [
    'padding : 30px 20px',
    'margin : 20px 0',
    'background : linear-gradient(#F3CD58, #FFE8F3)',
    'font-size : 25px',
    'font-weight : bold',
    'text-align : center',
    'color : #ffffff',
  ].join(';');
  console.log(
    '%c This is tasteanalysispage in this page, We will find your interior taste!',
    style
  );

  return (
    <div style={{ userSelect: 'none' }}>
      <Navbar />
      <br />
      {loading ? (
        <b>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <h3>Preparing for</h3>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <h3>Your images</h3>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ClipLoader color={'#F3CD58'} loading={loading} size={50} />
          </div>
        </b>
      ) : (
        <div>
          <b>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <h3>Select {user.user_nickname}'s</h3>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <h3>Interior Taste</h3>
            </div>
          </b>
          <button
            onMouseEnter={() => {
              setIsMouseOnHandler(true);
            }}
            onMouseLeave={() => {
              setIsMouseOnHandler(false);
            }}
            onClick={() => {
              skipClickHandler(user.id);
            }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginLeft: '60px',
              cursor: 'pointer',
              marginBottom: '0px',
              backgroundColor: isMouseon ? '#DFBC52' : null,
            }}
          >
            Skip
          </button>
          {isMouseon ? (
            <div style={{ display: 'flex', paddingLeft: '60px' }}>
              * if you skip this, your style and color taste will be automatically
              selected
            </div>
          ) : null}
        </div>
      )}
      <br />

      <div style={loading ? { display: 'none' } : null}>
        <TasteCompOne AddTaste={AddTasteHandler} tasteIdList={tastelist} />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button style={{ marginRight: '30px' }} onClick={InitializeHandler}>
            Initialize
          </button>
          <button style={{ marginLeft: '30px' }} onClick={SubmitTasteList}>
            Submit
          </button>
        </div>
      </div>
      <br />
    </div>
  );
}
export default TasteAnalysisPage;
