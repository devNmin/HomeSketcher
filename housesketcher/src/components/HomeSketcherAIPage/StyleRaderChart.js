import * as React from 'react';
import { ResponsiveRadar } from '@nivo/radar';

// 사용 라이브러리 : https://nivo.rocks/
// 참고 블로그 : https://jforj.tistory.com/269

const StyleRaderChart = ({ maleData, femaleData, isLight }) => {
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
    <div style={{ width: '60%', height: '30rem', margin: '0 auto' }}>
      <ResponsiveRadar
        data={data}
        keys={['female', 'male']}
        indexBy="taste"
        valueFormat=">-.2f"
        margin={{ top: 70, right: 80, bottom: 70, left: 80 }}
        borderColor={{ from: 'color' }}
        gridLabelOffset={36}
        dotSize={10}
        dotColor={{ theme: 'background' }}
        dotBorderWidth={2}
        colors={{ scheme: 'pastel1' }}
        fillOpacity={isLight ? 0.2 : 0.25}
        blendMode={isLight ? 'screen' : 'multiply'}
        motionConfig="wobbly"
        legends={[
          {
            anchor: 'top-left',
            direction: 'column',
            translateX: -10,
            translateY: -40,
            itemWidth: 20,
            itemHeight: 20,
            itemTextColor: isLight ? '#c7c7c7' : '#999',
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
        theme={{
          background: isLight ? '#202020' : '#ffffff',
          textColor: isLight ? '#ffffff' : '#333333',
          fontSize: 11,
          axis: {
            domain: {
              line: {
                stroke: isLight ? '#707070' : '#dddddd',
                strokeWidth: 1,
              },
            },
            legend: {
              text: {
                fontSize: 12,
                fill: '#333333',
              },
            },
            ticks: {
              line: {
                stroke: '#777777',
                strokeWidth: 1,
              },
              text: {
                fontSize: 15,
              },
            },
          },
          grid: {
            line: {
              stroke: isLight ? '#707070' : '#dddddd',
              strokeWidth: 1,
            },
          },
          legends: {
            text: {
              fontSize: 20,
            },
            ticks: {
              line: {},
              text: {
                fontSize: 10,
              },
            },
          },
          tooltip: {
            container: {
              background: '#ffffff',
              color: '#333333',
              fontSize: 16,
            },
          },
        }}
      />
    </div>
  );
};

export default StyleRaderChart;
