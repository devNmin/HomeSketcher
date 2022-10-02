import * as React from 'react';
import { ResponsiveRadar } from '@nivo/radar';

// 사용 라이브러리 : https://nivo.rocks/

const ColorRaderChart = ({ maleData, femaleData, isLight }) => {
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
    <div style={{ width: '60%', height: '35rem', margin: '0 auto' }}>
      <ResponsiveRadar
        data={data}
        keys={['male', 'female']}
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
            itemHeight: 30,
            itemTextColor: isLight ? '#c7c7c7' : '#999',
            symbolSize: 20,
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
                stroke: '#777777',
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

export default ColorRaderChart;
