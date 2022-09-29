import Navbar from '../components/Navbar/Navbar';
import { useEffect } from 'react';
// import classes from './HomeSketcherAIPage.module.css';
import DataChart from '../components/HomeSketcherAIPage/DataChart';
import AIStyle from '../components/HomeSketcherAIPage/AIStyle';

function HomeSketcherAIPage() {
  useEffect(() => {}, []);

  // 1. 이미지 백으로 보내기
  // ==> 응답 기다리기
  // ==> 스타일별 설명 text 랜더링

  // 2. 스타일 저장하기 요청 보내기
  // ==> 성공메세지 알람

  // 3. 실시간 인기 스타일 차트 보여주기

  return (
    <>
      <Navbar />
      <AIStyle />
      <DataChart />
    </>
  );
}

export default HomeSketcherAIPage;
