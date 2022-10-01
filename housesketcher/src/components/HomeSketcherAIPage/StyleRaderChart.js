import * as React from 'react';
import { ResponsiveRadar } from '@nivo/radar';

// 사용 라이브러리 : https://nivo.rocks/
// 참고 블로그 : https://jforj.tistory.com/269

const StyleRaderChart = ({ maleData, femaleData }) => {
  // 3. 실시간 인기 스타일 차트 보여주기
  let data = [
    {
      taste: 'Modern',
      male: maleData['Modern'],
      female: femaleData['Modern'],
    },
    {
      taste: 'Natural',
      male: maleData['Natural'],
      female: femaleData['Natural'],
    },
    {
      taste: 'Minimal',
      male: maleData['Minimal'],
      female: femaleData['Minimal'],
    },
    {
      taste: 'North European',
      male: maleData['North European'],
      female: femaleData['North European'],
    },
    {
      taste: 'Vintage',
      male: maleData['Vintage'],
      female: femaleData['Vintage'],
    },
    {
      taste: 'Antique',
      male: maleData['Antique'],
      female: femaleData['Antique'],
    },
    {
      taste: 'Provence',
      male: maleData['Provence'],
      female: femaleData['Provence'],
    },
    {
      taste: 'Mediterranean',
      male: maleData['Mediterranean'],
      female: femaleData['Mediterranean'],
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

export default StyleRaderChart;
