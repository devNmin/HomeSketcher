import React, {useRef,useState,useEffect } from 'react';
import * as THREE from 'three';

const Canvas2D = (props) =>{
    const canvasRef = useRef(null); //userRef 사용
    const contextRef = useRef(null); //캔버스의 드로잉 컨텍스트를 참조

    const[ctx,setCtx] = useState(); //캔버스의 들욍 컨텍스트

    const[lastX,setLastX] = useState();
    const[lastY,setLastY] = useState();

    let mouseList = props.mouseList
    let roomList = props.roomList
    let isRect = props.isRect
    
    
    let [roomCnt, setRoomCnt] = useState(0)
    let[mouseCheck,setMouseCheck] = useState(0);

    let threeInfo = props.threeInfo // 3d로 그려줄 방 데이터

    // 배경 이미지 그리기
    const ImageObj = new Image();
    ImageObj.src = "https://png.clipart.me/previews/035/grid-paper-seamless-photoshop-and-illustrator-pattern-30843.png"
       

    useEffect(()=>{
        console.log(mouseList);
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
        setTimeout(()=>{

            drawAll(context);
        },20)
    },[props.showResults]);



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
        setMouseCheck(mouseCheck+1);
        const {offsetX, offsetY} = nativeEvent;
        if(isRect && notAllowPointer(offsetX,offsetY)){
            setMouseCheck(0);
            removeLine()
            drawAll(ctx)
            alert("사각형 방 그리기는 방 내부에서 지원하지 않습니다.")
            return;    
        }
        ctx.arc(offsetX, offsetY, 8, 0, Math.PI * 2, true);
        ctx.stroke();
        
        console.log("mouseCheck", mouseCheck)
        console.log("lastX", lastX)
        console.log("lastY", lastY)
        console.log("offsetX", offsetX)
        console.log("offsetY", offsetY)
        setData(offsetX, offsetY)
        setLastX(offsetX)
        setLastY(offsetY)
        
    }

    const setData = (offsetX, offsetY)=>{
        const rate = 45;
        if(mouseCheck%2===1 && mouseCheck!==0){
            if(isRect){
                setRoomCnt(roomCnt+1);
                
                let data = {
                    num : roomCnt,
                    isRect : isRect,
                    fx : lastX,
                    fy : lastY,
                    nx : offsetX,
                    ny : offsetY,
                    centerX : (lastX+offsetX)/2,
                    centerY : (lastY+offsetY)/2
                }
                
                
                let leftX = lastX/rate
                let leftY = lastY/rate
                let rightX = offsetX/rate
                let rightY = offsetY/rate

                if (lastX > offsetX){
                    leftX = offsetX/rate
                    rightX = lastX/rate
                }
                if (leftY > offsetY){
                    leftY = offsetY/rate
                    rightY = lastY/rate
                }

                const width = Math.abs(leftX - rightX) 
                const height = Math.abs(leftY - rightY) 
                const threeOffsetX = 172 / rate
                const threeOffsetY = 195 / rate
                let threeData = {
                    id : 'room' + roomCnt,
                    height : 2,
                    coords : [
                        { x: leftX-threeOffsetX, y: leftY-threeOffsetY }, // sx sy 
                        { x: leftX+width-threeOffsetX, y: leftY-threeOffsetY }, // sx+width sy
                        { x: leftX+width-threeOffsetX, y: leftY+height-threeOffsetY }, // sx+width sy+height
                        { x: leftX-threeOffsetX, y: leftY+height-threeOffsetY},// sx sy+height
                    ]
                }
    
                console.log(data)
                roomList.push(data)
                threeInfo.push(threeData)
                // setRoomList((roomList)=>[data,...roomList])
                console.log(roomList)
            }
            
        }
        removeLine()
        drawAll(ctx)
    }

    const mouseMove = ({nativeEvent})=>{
        const {offsetX, offsetY} = nativeEvent;
        if(mouseCheck%2===1 && mouseCheck!==0){
            removeLine()
            drawAll(ctx)
            if(isRect){
                makeRect(offsetX,offsetY)
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
            console.log("asdlkfjasdlkj",leftX,rightX,topY,bottomY)
            console.log('offset',offsetX,offsetY)
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


    const makeRect = (offsetX,offsetY)=>{
        
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        // if(Math.abs(offsetX+lastX)/2)
        console.log(Math.abs(offsetX-lastX))
        let size = (Math.abs(offsetX-lastX)+Math.abs(offsetY-lastY))/30
        let textTotext = 20;
        
        if(Math.abs(offsetX-lastX)<250 || Math.abs(offsetY-lastY)<250){
            ctx.font = 16 +'px serif';
        }else{
            ctx.font = (Math.abs(offsetX-lastX)+Math.abs(offsetY-lastY))/30+'px serif';
            textTotext = size*1.5;
        }
        // ctx.font = font +'px serif';
        
        
        let textFirst = "가로: " + (Math.abs(offsetX-lastX)/45).toFixed(2)+"m";
        let textSecond = "세로: " + (Math.abs(offsetY-lastY)/45).toFixed(2)+"m";
        ctx.strokeText(textFirst, Math.abs(offsetX+lastX)/2-size*4, Math.abs(offsetY+lastY)/2);
        ctx.strokeText(textSecond, Math.abs(offsetX+lastX)/2-size*4, Math.abs(offsetY+lastY)/2+textTotext);
        // ctx.strokeText('Hello world', offsetX, Math.abs(offsetY+lastY)/2);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 8;
        ctx.rect(lastX,lastY,offsetX-lastX,offsetY-lastY);
        ctx.stroke();
    }


    const drawAll = (context)=>{
        const length = roomList.length;
        const rate = 45;
        for(let i = 0; i < length; i++){
            let data = roomList[i]; //그리는 방 정보
            if(data['isRect']){//직사각형이면
                console.log("ASDFASDFASDFSADF")
                console.log("roomList", roomList)
                console.log('threeInfothreeInfo',threeInfo)
                context.strokeStyle = "black";
                context.lineWidth = 1;
                console.log("ctx", context)
                let size = (Math.abs(data['nx']-data['fx'])+Math.abs(data['ny']-data['fy']))/30
                let textTotext = 20;
                if(Math.abs(data['nx']-data['fx'])<250 || Math.abs(data['ny']-data['fy'])<250){
                    context.font = 16 +'px serif';
                }else{
                    context.font = (Math.abs(data['nx']-data['fx'])+Math.abs(data['ny']-data['fy']))/30+'px serif';
                    textTotext = size*1.5;
                }
                let textFirst = "가로: " + (Math.abs(data['nx']-data['fx'])/rate).toFixed(2) +"m";
                let textSecond = "세로: " + (Math.abs(data['ny']-data['fy'])/rate,2).toFixed(2)+"m";
                context.strokeText(textFirst, Math.abs(data['nx']+data['fx'])/2-size*4, Math.abs(data['ny']+data['fy'])/2);
                context.strokeText(textSecond,Math.abs(data['nx']+data['fx'])/2-size*4, Math.abs(data['ny']+data['fy'])/2+textTotext);
                context.strokeStyle = "black";
                context.lineWidth = 8;
                context.rect(data['fx'],data['fy'],data['nx']-data['fx'],data['ny']-data['fy']);
                context.stroke();
            }
        }
    }

    

    return(
        <div className = "canvas_wrap">
            {/*useRef 사용*/}
            <canvas id = "myCanvas"
                width = "1000"
                height = "1000"
                ref = {canvasRef}
                // onMouseDown={startDrawing}
                // onMouseUp={finishDrawing}
                onMouseDown = {setXY}
                onMouseMove = {mouseMove}
                // onMouseMove={drawing}
                // onMouseLeave={finishDrawing}
                
                ></canvas>
        </div>
    );
};

export default Canvas2D;