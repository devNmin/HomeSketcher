import StageThreeFurniture from "./helpers/StageThreeFurniture"

function Staged(props) {
  // let { BASE_URL } = useContext(AuthContext);
  // const [furnitureList, setFurnitureList] = useState([])
  // let [authTokens, setAuthTokens] = useState(() =>
  //   localStorage.getItem('authTokens')
  //     ? JSON.parse(localStorage.getItem('authTokens'))
  //     : null
  // );
  let furnitureList = props.furnitures

  // // 좋아요한 가구들을 불러온다. 
  // const likedFurnitureHandler = async () => {
  //   await axios({
  //     method: 'get',
  //     url: BASE_URL + 'furnitures/like/',
  //     headers: {
  //       Authorization: `Bearer ${authTokens.access}`,
  //     },
  //   })
  //     .then((response) => {
  //       setFurnitureList(response.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  
  // 3D페이지에서 가구 모델 카드를 클릭했을시, 해당 가구 id로 보내고 obj을 받은 다음 리스트에 추가
  const onClickThreeFurn = async (furn_info) => {
    props.removeObj(furn_info)
  }

  // useEffect(() => {
  //   likedFurnitureHandler();
  // }, [])

  return (
    <div style={{display : 'flex', flexWrap: 'wrap', overflowY : 'scroll', maxHeight: '250px',  borderStyle : 'solid', borderColor : '#F3CD58'}}>
      {furnitureList.map((detail, index) => (        
          <StageThreeFurniture 
            key={index}
            furniture={detail}
          getFurnObj ={onClickThreeFurn}          
          ></StageThreeFurniture>        
      
      ))}
    </div>
  )
}

export default Staged;