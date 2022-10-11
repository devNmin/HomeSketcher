//1. 사각형 그리기
//2. 3D 2D 변환, 모델하우스 버튼
//3. 방 선택 -> 방별로 색, 가구 놓을 수 있음
//4. 색 변환
//5. 가구 위치 변환
//6. 카메라 시점 변환
//7. 캡쳐
//8. 좌측 세이브, 로드
//9. 토탈 가격
//10. 가구 입니다.?
import square from "../../assets/gif/square.gif"

export const stepsss = [
  {
    target: "[data-joyride=favourites]",
    content: (
      <div>
        <h2>Draw Your Room</h2>
        <br />
        <p>1.Click and move and click makes you a room</p>
        <p>2.You can move your room with drag&drop</p>
        <p>3.You can also stop drawing room with 'ESC'</p>
        
        <img src={square} alt="/" width="500" />
      </div>
    ),
    styles:{
      options:{
        width:600
      }
    },
    disableBeacon: true,
    showSkipButton: true,
  },
  //2. 3D 2D 변환, 모델하우스 버튼
  { 
    target: "[data-joyride=viewChange]",
    // content: "2D,3D, ModelHouse Button"
    placement:"left",
    content: (
      <div>
        <h4>You can change view or see ModelHouse</h4>
        <p>2D helps you drawing rooms, 3D makes your rooms to 3D</p>
        <p>We have some ModelHouse for you</p>
      </div>
    ),
    disableBeacon: true,
    showSkipButton: true,
  },
  //3. 방 선택 -> 방별로 색, 가구 놓을 수 있음
  {
    target: "[data-joyride=room]",
    content: (
      <div>
        <p>You can choose the color of the wall in the room.</p>
        <p>If you choose room, You can change room size or delete</p>
      </div>
    ),
    disableBeacon: true,
    showSkipButton: true,
    
  },
  //4. 좌측 세이브, 로드
  {
    target: "[data-joyride=save]",
    content: "Save your interior information",
    disableBeacon: true,
    showSkipButton: true,
  },
  {
    target: "[data-joyride=load]",
    content: "Load your interior information",
    disableBeacon: true,
    showSkipButton: true,
  },
  //5. 토탈 가격
  {
    target: "[data-joyride=totalPrice]",
    content: "Check total price",
    disableBeacon: true,
    showSkipButton: true,
  },
  //6. 색 변환
  {
    target: "[data-joyride=colorChange]",
    content: "Change Room Wall and Floor Color",
    disableBeacon: true,
    showSkipButton: true,
  },
  //7. 가구 위치 변환
  {
    target: "[data-joyride=furnitureControl]",
    content: "Move, Rotate furniture. Also change furniture scale",
    disableBeacon: true,
    showSkipButton: true,
  },
  //8. 카메라 시점 변환
  {
    target: "[data-joyride=cameraPosition]",
    content: "Change your camera position",
    disableBeacon: true,
    showSkipButton: true,
  },
  //9. 캡쳐
  {
    target: "[data-joyride=capture]",
    placement:"left",
    content: "Save your interior with picture",
    disableBeacon: true,
    showSkipButton: true,
  },
];
