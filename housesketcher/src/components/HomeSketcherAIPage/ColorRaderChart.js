import * as React from 'react';
import { ResponsiveRadar } from '@nivo/radar';

// 사용 라이브러리 : https://nivo.rocks/
// 참고 블로그 : https://jforj.tistory.com/269

const ColorRaderChart = ({ maleData, femaleData }) => {
  // 3. 실시간 인기 스타일 차트 보여주기
  let data = [
    {
      taste: 'Red',
      male: maleData['red'],
      female: femaleData['red'],
    },
    {
      taste: 'Orange',
      male: maleData['orange'],
      female: femaleData['orange'],
    },
    {
      taste: 'Yellow',
      male: maleData['yellow'],
      female: femaleData['yellow'],
    },
    {
      taste: 'Green',
      male: maleData['green'],
      female: femaleData['green'],
    },
    {
      taste: 'Blue',
      male: maleData['blue'],
      female: femaleData['blue'],
    },
    {
      taste: 'Indigo',
      male: maleData['indigo'],
      female: femaleData['indigo'],
    },
    {
      taste: 'Purple',
      male: maleData['purple'],
      female: femaleData['purple'],
    },
    {
      taste: 'Brown',
      male: maleData['brown'],
      female: femaleData['brown'],
    },
    {
      taste: 'Pink',
      male: maleData['pink'],
      female: femaleData['pink'],
    },
    {
      taste: 'White',
      male: maleData['white'],
      female: femaleData['white'],
    },
    {
      taste: 'Black',
      male: maleData['black'],
      female: femaleData['black'],
    },
    {
      taste: 'Gray',
      male: maleData['gray'],
      female: femaleData['gray'],
    },
  ];

  React.useEffect(() => {}, []);

  return (
    // chart height이 100%이기 때문이 chart를 덮는 마크업 요소에 height 설정
    <div style={{ width: '60%', height: '20rem', margin: '0 auto' }}>
      <ResponsiveRadar
        data={data}
        keys={['male', 'female']}
        indexBy="taste"
        valueFormat=">-.2f"
        margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
        borderColor={{ from: 'color' }}
        gridLabelOffset={36}
        dotSize={10}
        dotColor={{ theme: 'background' }}
        dotBorderWidth={2}
        colors={{ scheme: 'pastel1' }}
        blendMode="multiply"
        motionConfig="wobbly"
        legends={[
          {
            anchor: 'top-left',
            direction: 'column',
            translateX: -10,
            translateY: -40,
            itemWidth: 20,
            itemHeight: 20,
            itemTextColor: '#999',
            symbolSize: 14,
            symbolShape: 'circle',
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: '#000',
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default ColorRaderChart;
