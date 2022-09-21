import CardPanel from './CardPanel'
import axios from 'axios'
import AuthContext from '../../context/AuthContext'
// import { Link } from 'react-router-dom'
// import logo from '../../assets/Logo.png'
import { useEffect, useContext } from 'react'
import { useState } from 'react'
import LikeFurniture from '../Like/LikeFurniture'


function SubCarousel(props) {
  const [populars, setPopulars] = useState([])
  let {BASE_URL, authTokens} = useContext(AuthContext)

  const getPopulars = async () => {
    const response = await axios.get(BASE_URL + 'furnitures/label/rate/', {
      headers: {
        Authorization: `Bearer ${authTokens.access}`
      }
    })
    const data = await response.data;
    console.log(data.furnitures)
    setPopulars(data.furnitures);
  }

  useEffect(() => {
    getPopulars();
  }, [])
  // console.log(populars)
  return (
    <div style={{ maxWidth: 1500, marginLeft: 'auto', marginRight: 'auto', marginTop: 64 }}>
      <h1>popular</h1>
      <br />
      <CardPanel
        show={4}
        populars={populars}
      >
          {populars.map((popular) => (
            <LikeFurniture key= {popular.id} furniture = {popular}>              
            </LikeFurniture>
          ))}
        {/* <div>
          <div style={{ padding: 20 }}>
            <img src={logo} alt="placeholder" style={{ width: '100%' }} />
            <h1>블라블라</h1>
          </div>
        </div>
        <div>
          <div style={{ padding: 20 }}>
            <img src={logo} alt="placeholder" style={{ width: '100%' }} />
            <h1>블라블라</h1>
          </div>
        </div>
        <div>
          <div style={{ padding: 20 }}>
            <img src={logo} alt="placeholder" style={{ width: '100%' }} />
            <h1>블라블라</h1>
          </div>
        </div>
        <div>
          <div style={{ padding: 20 }}>
            <img src={logo} alt="placeholder" style={{ width: '100%' }} />
          </div>
        </div>
        <div>
          <div style={{ padding: 20 }}>
            <img src={logo} alt="placeholder" style={{ width: '100%' }} />
          </div>
        </div>
        <div>
          <div style={{ padding: 20 }}>
            <img src={logo} alt="placeholder" style={{ width: '100%' }} />
          </div>
        </div>
        <div>
          <div style={{ padding: 20 }}>
            <img src={logo} alt="placeholder" style={{ width: '100%' }} />
          </div>
        </div> */}
      </CardPanel>
    </div>
  )
}

export default SubCarousel