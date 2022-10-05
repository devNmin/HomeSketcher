import React, {useRef,useState,useEffect,useContext } from 'react';
import * as THREE from 'three';
import ThreeJSContext from '../../../context/ThreeJSContext'

const Canvas2D = (props) =>{
    const canvasRef = useRef(null); //userRef 사용
    const contextRef = useRef(null); //캔버스의 드로잉 컨텍스트를 참조

    const[ctx,setCtx] = useState(); //캔버스의 들욍 컨텍스트

    const[lastX,setLastX] = useState();
    const[lastY,setLastY] = useState();

    const [cursor, setCursor] = useState('default'); //마우스 포인터 옵션
    const [rectClick, setRectClick] = useState(false); //방 클릭했을 때 옵션
    const [roomId, setRoomId] = useState();

    let roomList = props.roomList
    let isRect = props.isRect
    
    
    // let [roomCnt, setRoomCnt] = useState(0);
    const threeJsContext = useContext(ThreeJSContext);

    let[mouseCheck,setMouseCheck] = useState(0);

    let threeInfo = props.threeInfo // 3d로 그려줄 방 데이터

    // 방 드래그 드롭 충돌 시 직전 좌표 기억
    let[beforeFx,setBeforeFx] = useState();
    let[beforeFy,setBeforeFy] = useState(); //꼭짓점 1 기억
    let[beforeNx,setBeforeNx] = useState();
    let[beforeNy,setBeforeNy] = useState(); //꼭짓점 2 기억
    let[beforeCx,setBeforeCx] = useState(); //센터X 기억
    let[beforeCy,setBeforeCy] = useState(); //센터y 기억
    // 방 드래그 드롭 충돌 시 직전 좌표 기억


    // 배경 이미지 그리기
    const ImageObj = new Image();
    ImageObj.src = "https://png.clipart.me/previews/035/grid-paper-seamless-photoshop-and-illustrator-pattern-30843.png"
       

    useEffect(()=>{
        setMouseCheck(0);
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const context = canvas.getContext("2d");

        ImageObj.onload = function(){
            context.drawImage(ImageObj, 0, 0, 1500, 1500)
        }
        
        context.strokeStyle = "black"; //선의 색
        context.lineWidth = 8; //선의 굵기
        contextRef.current = context;
        context.scale(10, 5);
        setCtx(context);
        roomList = props.roomList;
        threeInfo = props.threeInfo;
        
        removeLine()
        setTimeout(()=>{

            drawAll(context);
        },20)

        window.addEventListener("keydown", downHandler);
        return () => {
            window.removeEventListener("keydown", downHandler);
        };
        

        
    },[props.valueChange]);

    function downHandler({ key }) {
        if(key === "Escape"){
            setMouseCheck(0);
            const canvas = canvasRef.current;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            
            const context = canvas.getContext("2d");

            ImageObj.onload = function(){
                context.drawImage(ImageObj, 0, 0, 1500, 1500)
            }
            
            context.strokeStyle = "black"; //선의 색
            context.lineWidth = 8; //선의 굵기
            contextRef.current = context;
            context.scale(10, 5);
            setCtx(context);
        
            removeLine()
            drawAll(context);
        }
    }

    const removeLine = ()=>{
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const context = canvas.getContext("2d");
        context.strokeStyle = "black"; //선의 색
        context.lineWidth = 8; //선의 굵기
        context.clearRect(0, 0, canvas.width, canvas.height); // clearRect 적용이 되는듯함 
        
        context.drawImage(ImageObj, 0, 0, 1500, 1500)
        
        
        setCtx(context);
    }



    const setXY = ({nativeEvent})=>{
        if(!rectClick){
            setMouseCheck(mouseCheck+1);
        }
        setRectClick(false);
        // setRoomId(null);
        const {offsetX, offsetY} = nativeEvent;
        if(isRect && notAllowPointer(offsetX,offsetY) && !rectClick){
            setCursor('default');
            setMouseCheck(0);
            removeLine()
            drawAll(ctx)
            alert("사각형 방 그리기는 방 내부에서 지원하지 않습니다.")
            return;    
        }
        
        ctx.arc(offsetX, offsetY, 8, 0, Math.PI * 2, true);
        ctx.stroke();
        
        setData(offsetX, offsetY)
        setLastX(offsetX)
        setLastY(offsetY)
        setCursor('default');
    }

    //클릭 시 해당 마우스 좌표값을 저장하는 함수
    const setData = (offsetX, offsetY)=>{
        const rate = 45;
        //두 번째 클릭인 경우 -> 방 생성을 해줌
        if(mouseCheck%2===1 && mouseCheck!==0){
            if(isRect){
                // setRoomCnt(roomCnt+1);
                threeJsContext.changeRoomCnt(threeJsContext.roomCnt+1);
                
                let data = {
                    num : threeJsContext.roomCnt,
                    isRect : isRect,
                    fx : lastX,
                    fy : lastY,
                    nx : offsetX,
                    ny : offsetY,
                    centerX : (lastX+offsetX)/2,
                    centerY : (lastY+offsetY)/2,
                }
                
                
                let leftX = lastX/rate
                let leftY = lastY/rate
                let rightX = offsetX/rate
                let rightY = offsetY/rate
                
                if (lastX > offsetX){
                    leftX = offsetX/rate
                    rightX = lastX/rate
                }
                if (lastY > offsetY){
                    leftY = offsetY/rate
                    rightY = lastY/rate
                }

                const width = Math.abs(leftX - rightX) 
                const height = Math.abs(leftY - rightY) 
                const threeOffsetX = 172 / rate
                const threeOffsetY = 195 / rate
                let threeData = {
                    id : 'room' + threeJsContext.roomCnt,
                    height : 2,
                    coords : [
                        { x: leftX-threeOffsetX, y: leftY-threeOffsetY }, // sx sy 
                        { x: leftX+width-threeOffsetX, y: leftY-threeOffsetY }, // sx+width sy
                        { x: leftX+width-threeOffsetX, y: leftY+height-threeOffsetY }, // sx+width sy+height
                        { x: leftX-threeOffsetX, y: leftY+height-threeOffsetY},// sx sy+height
                    ]
                }
    
                roomList.push(data)
                threeInfo.push(threeData)
            }
            
        }
        removeLine()
        drawAll(ctx)
    }

    //마우스가 움직일 때 실행되는 함수
    const mouseMove = ({nativeEvent})=>{
        const {offsetX, offsetY} = nativeEvent;
        setCursor('default')
        
        if(rectClick){
            removeLine();
            setMouseCheck(0)
            roomMove(offsetX,offsetY);
            drawAll(ctx);
        }
 
        if(ifPointerInRoom(offsetX,offsetY)){ //방 안에 포인터가 들어간다면
            setCursor('pointer')
        }else{// 방 밖에 포인터 있으면 그릴 수 있도록
            if(mouseCheck%2===1 && mouseCheck!==0){
                
                removeLine()
                drawAll(ctx)
                if(isRect){
                    makeRect(offsetX,offsetY)
                }
    
            }
        }
    }
    

    //방 충돌 확인(현재 움직이고 있는 좌표 값을 넣어줌)
    const roomCollison = (fx,fy,nx,ny,cx,cy,offsetX,offsetY)=>{ //cx,cy -> center 좌표값

        let leftX = Math.min(fx,nx);
        let topY = Math.min(fy,ny);
        let rightX = Math.max(fx,nx);
        let bottomY = Math.max(fy,ny);

        let halfX = Math.abs(fx-nx)/2; //x 절반 길이
        let halfY = Math.abs(fy-ny)/2; //y 절반 길이

        const length = roomList.length;
        for(let i = 0; i < length; i++){ //모든 방과 충돌하는지 비교
            let room = roomList[i];
            let leftRoomX = Math.min(room.fx,room.nx);
            let topRoomY = Math.min(room.fy,room.ny);
            let rightRoomX = Math.max(room.nx,room.fx);
            let bottomRoomY = Math.max(room.ny,room.fy); //비교하는 방의 꼭짓점 1,2 좌표들. 뭐가 큰지 모르니 큰거 작은거 정해서 그 범위에 꼭짓점 들어가면 안되도록 해줌
            let centerRoomX = room.centerX;
            let centerRoomY = room.centerY;
            let halfRoomX = Math.abs(leftRoomX - rightRoomX)/2; // 타겟 룸 가로 절반 길이
            let halfRoomY = Math.abs(topRoomY - bottomRoomY)/2; // 타겟 룸 세로 절반 길이


            

            if(//움직이는 방이 다른방 범위 침범한 경우
                (leftX>leftRoomX && leftX <rightRoomX && topY >topRoomY && topY <bottomRoomY )|| // 꼭짓점 1이 다른 방 범위 침범 좌상단 점
                (leftX>leftRoomX && leftX <rightRoomX && bottomY >topRoomY && bottomY < bottomRoomY) || //꼭짓점 2가 다른 방 범위 침범 좌하단 점
                (rightX>leftRoomX && rightX < rightRoomX && topY >topRoomY && topY <bottomRoomY) || //꼭짓점 3이 다른 방 범위 침범 우상단 점
                (rightX>leftRoomX && rightX < rightRoomX && bottomY >topRoomY && bottomY < bottomRoomY) //꼭짓점 4가 다른 방 범위 침범 우하단 점
            ){

                if(beforeCx<leftRoomX && (beforeCy <bottomY || beforeCy > topRoomY)){
                    if(roomList[roomId].fx > roomList[roomId].ny){
                        roomList[roomId].fx = centerRoomX-halfRoomX;
                        roomList[roomId].nx = centerRoomX-halfRoomX - halfX*2;
                    }else{
                        roomList[roomId].fx = centerRoomX-halfRoomX - halfX*2;
                        roomList[roomId].nx = centerRoomX-halfRoomX;
                    }
                    roomList[roomId].centerX = centerRoomX-halfRoomX-halfX;
                    roomList[roomId].centerY = offsetY;
                    roomList[roomId].fy += (offsetY-cy);
                    roomList[roomId].ny += (offsetY-cy); 

                    
                }else if(beforeCx>rightRoomX &&(beforeCy <bottomY || beforeCy > topRoomY) ){
                    
                    if(roomList[roomId].fx > roomList[roomId].nx){
                        roomList[roomId].fx = centerRoomX+halfRoomX + halfX*2;
                        roomList[roomId].nx = centerRoomX+halfRoomX;
                    }else{
                        roomList[roomId].fx = centerRoomX+halfRoomX;
                        roomList[roomId].nx = centerRoomX+halfRoomX + halfX*2;
                    }
                    roomList[roomId].centerX = centerRoomX+halfRoomX+halfX;
                    roomList[roomId].centerY = offsetY;
                    roomList[roomId].fy += (offsetY-cy);
                    roomList[roomId].ny += (offsetY-cy);
                    
                }else if(beforeCy < topRoomY && (beforeCx > leftRoomX || beforeCx < rightRoomX)){
                    
                    if(roomList[roomId].fy > roomList[roomId].ny){
                        roomList[roomId].fy = centerRoomY-halfRoomY;
                        roomList[roomId].ny = centerRoomY-halfRoomY-halfY*2;
                    }else{
                        roomList[roomId].fy = centerRoomY-halfRoomY-halfY*2;
                        roomList[roomId].ny = centerRoomY-halfRoomY;
                    }
                    roomList[roomId].centerX = offsetX;
                    roomList[roomId].centerY = centerRoomY-halfRoomY-halfY;
                    roomList[roomId].fx += (offsetX-cx);
                    roomList[roomId].nx += (offsetX-cx);
                       
                }else if(beforeCy > bottomRoomY && (beforeCx > leftRoomX || beforeCx < rightRoomX)){
                    if(roomList[roomId].fy > roomList[roomId].ny){
                        roomList[roomId].fy = centerRoomY+halfRoomY+halfY*2;
                        roomList[roomId].ny = centerRoomY+halfRoomY;
                    }else{
                        roomList[roomId].fy = centerRoomY+halfRoomY;
                        roomList[roomId].ny = centerRoomY+halfRoomY+halfY*2;
                    }
                    roomList[roomId].centerX = offsetX;
                    roomList[roomId].centerY = centerRoomY+halfRoomY+halfY;
                    roomList[roomId].fx += (offsetX-cx);
                    roomList[roomId].nx += (offsetX-cx);
                }

                
            
            }else if(
                (leftRoomX >leftX && leftRoomX < rightX && topRoomY >topY && topRoomY < bottomY) ||
                (leftRoomX >leftX && leftRoomX < rightX && bottomRoomY >topY && bottomRoomY <bottomY) ||
                (rightRoomX > leftX && rightRoomX < rightX && topRoomY > topY && topRoomY <bottomY ) ||
                (rightRoomX > leftX && rightRoomX < rightX && bottomRoomY > topY && bottomRoomY <bottomY)
            ){
                if(beforeCx<leftRoomX && (beforeCy <bottomY || beforeCy > topRoomY)){
                    if(roomList[roomId].fx > roomList[roomId].ny){
                        roomList[roomId].fx = centerRoomX-halfRoomX;
                        roomList[roomId].nx = centerRoomX-halfRoomX - halfX*2;
                    }else{
                        roomList[roomId].fx = centerRoomX-halfRoomX - halfX*2;
                        roomList[roomId].nx = centerRoomX-halfRoomX;
                    }
                    roomList[roomId].centerX = centerRoomX-halfRoomX-halfX;
                    roomList[roomId].centerY = offsetY;
                    roomList[roomId].fy += (offsetY-cy);
                    roomList[roomId].ny += (offsetY-cy); 

                    
                }else if(beforeCx>rightRoomX &&(beforeCy <bottomY || beforeCy > topRoomY) ){
                    
                    if(roomList[roomId].fx > roomList[roomId].nx){
                        roomList[roomId].fx = centerRoomX+halfRoomX + halfX*2;
                        roomList[roomId].nx = centerRoomX+halfRoomX;
                    }else{
                        roomList[roomId].fx = centerRoomX+halfRoomX;
                        roomList[roomId].nx = centerRoomX+halfRoomX + halfX*2;
                    }
                    roomList[roomId].centerX = centerRoomX+halfRoomX+halfX;
                    roomList[roomId].centerY = offsetY;
                    roomList[roomId].fy += (offsetY-cy);
                    roomList[roomId].ny += (offsetY-cy);
                    
                }else if(beforeCy < topRoomY && (beforeCx > leftRoomX || beforeCx < rightRoomX)){
                    
                    if(roomList[roomId].fy > roomList[roomId].ny){
                        roomList[roomId].fy = centerRoomY-halfRoomY;
                        roomList[roomId].ny = centerRoomY-halfRoomY-halfY*2;
                    }else{
                        roomList[roomId].fy = centerRoomY-halfRoomY-halfY*2;
                        roomList[roomId].ny = centerRoomY-halfRoomY;
                    }
                    roomList[roomId].centerX = offsetX;
                    roomList[roomId].centerY = centerRoomY-halfRoomY-halfY;
                    roomList[roomId].fx += (offsetX-cx);
                    roomList[roomId].nx += (offsetX-cx);
                       
                }else if(beforeCy > bottomRoomY && (beforeCx > leftRoomX || beforeCx < rightRoomX)){
                    if(roomList[roomId].fy > roomList[roomId].ny){
                        roomList[roomId].fy = centerRoomY+halfRoomY+halfY*2;
                        roomList[roomId].ny = centerRoomY+halfRoomY;
                    }else{
                        roomList[roomId].fy = centerRoomY+halfRoomY;
                        roomList[roomId].ny = centerRoomY+halfRoomY+halfY*2;
                    }
                    roomList[roomId].centerX = offsetX;
                    roomList[roomId].centerY = centerRoomY+halfRoomY+halfY;
                    roomList[roomId].fx += (offsetX-cx);
                    roomList[roomId].nx += (offsetX-cx);
                }
                
            }

            // 3D 좌표값 업데이트
            let rate = 45;
            let tleftX = roomList[roomId].fx/rate
            let tleftY = roomList[roomId].fy/rate
            let trightX = roomList[roomId].nx/rate
            let trightY = roomList[roomId].ny/rate
            
            if (tleftX > trightX){
                let xData = tleftX
                tleftX = trightX
                trightX = xData
            }
            if (tleftY > trightY){
                let yData = tleftY
                tleftY = trightY
                trightY = yData
            }
        
            const width = Math.abs(tleftX - trightX) 
            const height = Math.abs(tleftY - trightY) 
            const threeOffsetX = 172 / rate
            const threeOffsetY = 195 / rate
            
            let coords = [
                { x: tleftX-threeOffsetX, y: tleftY-threeOffsetY }, // sx sy 
                { x: tleftX+width-threeOffsetX, y: tleftY-threeOffsetY }, // sx+width sy
                { x: tleftX+width-threeOffsetX, y: tleftY+height-threeOffsetY }, // sx+width sy+height
                { x: tleftX-threeOffsetX, y: tleftY+height-threeOffsetY},// sx sy+height
            ]
            threeInfo[roomId].coords=coords;
        }

    }

    //드래그 드롭으로 방 움직일 때 좌표 설정 함수
    const roomMove = (offsetX,offsetY)=>{
        let roomX = roomList[roomId].centerX; //방의 중심좌표 X
        let roomY = roomList[roomId].centerY; //방의 중심좌표 X
        let moveX = offsetX-roomX; //이동해야할 거리 X
        let moveY = offsetY-roomY; //이동해야할 거리 Y


        // 4개의 꼭짓점 마지막 좌표 기억
        setBeforeFx(Math.min(roomList[roomId].fx,roomList[roomId].nx));
        setBeforeFy(Math.min(roomList[roomId].fy,roomList[roomId].ny));
        setBeforeNx(Math.max(roomList[roomId].nx,roomList[roomId].fx));
        setBeforeNy(Math.max(roomList[roomId].ny,roomList[roomId].fy));
        //센터 마지막 좌표 기억
        setBeforeCx(roomList[roomId].centerX);
        setBeforeCy(roomList[roomId].centerY);

        

        // 4개의 꼭짓점 좌표 변경
        roomList[roomId].fx += moveX;
        roomList[roomId].fy += moveY;
        roomList[roomId].nx += moveX;
        roomList[roomId].ny += moveY;
        roomList[roomId].centerX = offsetX;
        roomList[roomId].centerY = offsetY;

        // 3d 좌표 변경
        let rate = 45;
        threeInfo[roomId].coords[0].x += moveX/rate;
        threeInfo[roomId].coords[0].y += moveY/rate;
        
        threeInfo[roomId].coords[1].x += moveX/rate;
        threeInfo[roomId].coords[1].y += moveY/rate;
        
        threeInfo[roomId].coords[2].x += moveX/rate;
        threeInfo[roomId].coords[2].y += moveY/rate;
        
        threeInfo[roomId].coords[3].x += moveX/rate;
        threeInfo[roomId].coords[3].y += moveY/rate;

        roomCollison(roomList[roomId].fx,roomList[roomId].fy,roomList[roomId].nx,roomList[roomId].ny,roomList[roomId].centerX,roomList[roomId].centerY,offsetX,offsetY);
        
    }

    //방 클릭시 어떤 방인지 지정 -> 방안에 포인터가 있는지 확인
    const ifRoomClick = (offsetX,offsetY)=>{ 
        const length = roomList.length;
        for(let i = 0; i < length; i++){
            let data = roomList[i];
            let leftX = Math.min(data.fx,data.nx);
            let rightX = Math.max(data.fx,data.nx);
            let topY = Math.max(data.fy, data.ny);
            let bottomY = Math.min(data.fy, data.ny);

            if(offsetX > leftX && offsetX < rightX && offsetY < topY && offsetY > bottomY){
                setRectClick(true);
                setRoomId(i);
            }
        }
    }

    //포인터가 방 안에 있을 때 확인 여부 true면 안에 있는 것
    const ifPointerInRoom = (offsetX,offsetY)=>{
        const length = roomList.length;
        for(let i = 0; i < length; i++){
            let data = roomList[i];
            let leftX = Math.min(data.fx,data.nx);
            let rightX = Math.max(data.fx,data.nx);
            let topY = Math.max(data.fy, data.ny);
            let bottomY = Math.min(data.fy, data.ny);

            if(offsetX > leftX && offsetX < rightX && offsetY < topY && offsetY > bottomY){
                return true;
            }
        }
    }

    // 직사각형 그리기 할 때 방 안에 직사각형 만들기 금지
    const notAllowPointer = (offsetX,offsetY)=>{

        let nowLeftX = Math.min(offsetX,lastX);
        let nowrightX = Math.max(offsetX,lastX);
        let nowtopY = Math.max(offsetY, lastY);
        let nowBottomY = Math.min(offsetY, lastY);

        const length = roomList.length;
        for(let i = 0; i < length; i++){
            let data = roomList[i];
            let leftX = Math.min(data.fx,data.nx);
            let rightX = Math.max(data.fx,data.nx);
            let topY = Math.max(data.fy, data.ny);
            let bottomY = Math.min(data.fy, data.ny);
            
            if( // 사각형 충돌 시 true 반환
                mouseCheck%2===1 && mouseCheck!==0  && (
                    (offsetX > leftX && offsetX < rightX && offsetY < topY && offsetY > bottomY) || 
                    (offsetX > leftX && offsetX < rightX && lastY < topY && lastY > bottomY) ||
                    (lastX > leftX && lastX < rightX && offsetY < topY && offsetY > bottomY)|| 
                    (lastX > leftX && lastX < rightX && lastY < topY && lastY > bottomY)
                )
                ){
                return true;
            }else if( // 그리는 사각형 내부에 사각형이 존재하는 경우
                mouseCheck%2===1 && mouseCheck!==0  && 
                (
                    (leftX > nowLeftX && leftX < nowrightX &&  topY < nowtopY &&  topY> nowBottomY) || 
                    (leftX > nowLeftX && leftX < nowrightX && bottomY < nowtopY && bottomY > nowBottomY) || 
                    (rightX > nowLeftX && rightX  < nowrightX &&  topY < nowtopY &&  topY > nowBottomY) || 
                    (rightX > nowLeftX && rightX < nowrightX && bottomY < nowtopY && bottomY > nowtopY)
                )
            ){
                return true;
            }
            else if( // 겹치는 사각형이 있는 경우
                mouseCheck%2===1 && mouseCheck!==0  && (
                    (nowLeftX < leftX && nowrightX > rightX && nowtopY < topY && nowBottomY > bottomY) || // 현재 사각형이 가로
                    (nowLeftX > leftX && nowrightX < rightX && nowtopY > topY && nowBottomY < bottomY) // 현재 사각형이 세로
                )
            ){
                return true;
            }
        }
    }


    //사각형 생성. 드래그로 생성할 때 실행
    const makeRect = (offsetX,offsetY)=>{
        setCursor('crosshair')
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        
        let size = (Math.abs(offsetX-lastX)+Math.abs(offsetY-lastY))/30
        let textTotext = 20;
        
        if(Math.abs(offsetX-lastX)<250 || Math.abs(offsetY-lastY)<250){
            ctx.font = 16 +'px serif';
        }else{
            ctx.font = (Math.abs(offsetX-lastX)+Math.abs(offsetY-lastY))/30+'px serif';
            textTotext = size*1.5;
        }
        
        let width = (Math.abs(offsetX-lastX)/45).toFixed(2);
        let length = (Math.abs(offsetY-lastY)/45).toFixed(2);
        
        let textFirst = "Width: " + width+"m";
        let textSecond = "Height: " + length+"m";
        ctx.strokeText(textFirst, Math.abs(offsetX+lastX)/2-size*4, Math.abs(offsetY+lastY)/2);
        ctx.strokeText(textSecond, Math.abs(offsetX+lastX)/2-size*4, Math.abs(offsetY+lastY)/2+textTotext);
        
        ctx.strokeStyle = "black";
        ctx.lineWidth = 8;
        ctx.rect(lastX,lastY,offsetX-lastX,offsetY-lastY);
        ctx.stroke();


    }


    // 그림을 다시 모두 그려주는 함수. 여태까지 그렸던 것을 좌표를 기반으로 그려줌
    const drawAll = (context)=>{
        const length = roomList.length;
        const rate = 45;
        for(let i = 0; i < length; i++){
            let data = roomList[i]; //그리는 방 정보
            if(data['isRect']){//직사각형이면
                context.strokeStyle = "black";
                context.lineWidth = 1;
                
                let size = (Math.abs(data['nx']-data['fx'])+Math.abs(data['ny']-data['fy']))/30
                let textTotext = 20;
                if(Math.abs(data['nx']-data['fx'])<250 || Math.abs(data['ny']-data['fy'])<250){
                    context.font = 16 +'px serif';
                }else{
                    context.font = (Math.abs(data['nx']-data['fx'])+Math.abs(data['ny']-data['fy']))/30+'px serif';
                    textTotext = size*1.5;
                }

                let roomText = "Room #"+(data['num']+1);
                let textFirst = "Width: " + (Math.abs(data['nx']-data['fx'])/rate).toFixed(2) +"m";
                let textSecond = "Height: " + (Math.abs(data['ny']-data['fy'])/rate).toFixed(2)+"m";
                context.strokeText(roomText,Math.abs(data['nx']+data['fx'])/2-size*4, Math.abs(data['ny']+data['fy'])/2-textTotext);
                context.strokeText(textFirst, Math.abs(data['nx']+data['fx'])/2-size*4, Math.abs(data['ny']+data['fy'])/2);
                context.strokeText(textSecond,Math.abs(data['nx']+data['fx'])/2-size*4, Math.abs(data['ny']+data['fy'])/2+textTotext);
                context.strokeStyle = "black";
                context.lineWidth = 8;
                context.rect(data['fx'],data['fy'],data['nx']-data['fx'],data['ny']-data['fy']);
                context.stroke();
            }
        }
    }

    
    const clicked = ({nativeEvent})=>{
        const {offsetX,offsetY} = nativeEvent;
        ifRoomClick(offsetX,offsetY); //클릭했을 때 방 안이면 클릭됐다고 값 변경해줌
    }

    

    return(
        <div className = "canvas_wrap">
            {/*useRef 사용*/}
            <canvas id = "myCanvas"
                width = "2000"
                height = "1000"
                ref = {canvasRef}
                onMouseUp = {setXY}
                onMouseMove = {mouseMove}
                onMouseDown = {clicked}
                style={{ cursor: cursor }}
                ></canvas>
        </div>
    );
};

export default Canvas2D;