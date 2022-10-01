import * as React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { useState } from 'react';
import classes from './ModeChange.module.css';

// 사용 라이브러리 : https://nivo.rocks/
// 참고 블로그 : https://jforj.tistory.com/269

const ColorAgeChart = ({ responseData }) => {
  // 3. 실시간 인기 스타일 차트 보여주기
  const [isGroup, setIsGroup] = useState(false);
  function GroupModeHandelr() {
    if (isGroup) {
      setIsGroup(false);
    } else {
      setIsGroup(true);
    }
  }
  const data = [
    {
      country: 'Red',
      '0-19': responseData[0]['red'],
      '20-29': responseData[20]['red'],
      '30-39': responseData[30]['red'],
      '40-49': responseData[40]['red'],
      '50-59': responseData[50]['red'],
      '60-69': responseData[60]['red'],
      '70-79': responseData[70]['red'],
      older: responseData['old']['red'],
    },
    {
      country: 'Orange',
      '0-19': responseData[0]['orange'],
      '20-29': responseData[20]['orange'],
      '30-39': responseData[30]['orange'],
      '40-49': responseData[40]['orange'],
      '50-59': responseData[50]['orange'],
      '60-69': responseData[60]['orange'],
      '70-79': responseData[70]['orange'],
      older: responseData['old']['orange'],
    },
    {
      country: 'Yellow',
      '0-19': responseData[0]['yellow'],
      '20-29': responseData[20]['yellow'],
      '30-39': responseData[30]['yellow'],
      '40-49': responseData[40]['yellow'],
      '50-59': responseData[50]['yellow'],
      '60-69': responseData[60]['yellow'],
      '70-79': responseData[70]['yellow'],
      older: responseData['old']['yellow'],
    },
    {
      country: 'Green',
      '0-19': responseData[0]['green'],
      '20-29': responseData[20]['green'],
      '30-39': responseData[30]['green'],
      '40-49': responseData[40]['green'],
      '50-59': responseData[50]['green'],
      '60-69': responseData[60]['green'],
      '70-79': responseData[70]['green'],
      older: responseData['old']['green'],
    },
    {
      country: 'Blue',
      '0-19': responseData[0]['blue'],
      '20-29': responseData[20]['blue'],
      '30-39': responseData[30]['blue'],
      '40-49': responseData[40]['blue'],
      '50-59': responseData[50]['blue'],
      '60-69': responseData[60]['blue'],
      '70-79': responseData[70]['blue'],
      older: responseData['old']['blue'],
    },
    {
      country: 'Indigo',
      '0-19': responseData[0]['indigo'],
      '20-29': responseData[20]['indigo'],
      '30-39': responseData[30]['indigo'],
      '40-49': responseData[40]['indigo'],
      '50-59': responseData[50]['indigo'],
      '60-69': responseData[60]['indigo'],
      '70-79': responseData[70]['indigo'],
      older: responseData['old']['indigo'],
    },
    {
      country: 'Purple',
      '0-19': responseData[0]['purple'],
      '20-29': responseData[20]['purple'],
      '30-39': responseData[30]['purple'],
      '40-49': responseData[40]['purple'],
      '50-59': responseData[50]['purple'],
      '60-69': responseData[60]['purple'],
      '70-79': responseData[70]['purple'],
      older: responseData['old']['purple'],
    },
    {
      country: 'Brown',
      '0-19': responseData[0]['brown'],
      '20-29': responseData[20]['brown'],
      '30-39': responseData[30]['brown'],
      '40-49': responseData[40]['brown'],
      '50-59': responseData[50]['brown'],
      '60-69': responseData[60]['brown'],
      '70-79': responseData[70]['brown'],
      older: responseData['old']['brown'],
    },
    {
      country: 'Pink',
      '0-19': responseData[0]['pink'],
      '20-29': responseData[20]['pink'],
      '30-39': responseData[30]['pink'],
      '40-49': responseData[40]['pink'],
      '50-59': responseData[50]['pink'],
      '60-69': responseData[60]['pink'],
      '70-79': responseData[70]['pink'],
      older: responseData['old']['pink'],
    },
    {
      country: 'White',
      '0-19': responseData[0]['white'],
      '20-29': responseData[20]['white'],
      '30-39': responseData[30]['white'],
      '40-49': responseData[40]['white'],
      '50-59': responseData[50]['white'],
      '60-69': responseData[60]['white'],
      '70-79': responseData[70]['white'],
      older: responseData['old']['white'],
    },
    {
      country: 'Black',
      '0-19': responseData[0]['black'],
      '20-29': responseData[20]['black'],
      '30-39': responseData[30]['black'],
      '40-49': responseData[40]['black'],
      '50-59': responseData[50]['black'],
      '60-69': responseData[60]['black'],
      '70-79': responseData[70]['black'],
      older: responseData['old']['black'],
    },
    {
      country: 'Gray',
      '0-19': responseData[0]['gray'],
      '20-29': responseData[20]['gray'],
      '30-39': responseData[30]['gray'],
      '40-49': responseData[40]['gray'],
      '50-59': responseData[50]['gray'],
      '60-69': responseData[60]['gray'],
      '70-79': responseData[70]['gray'],
      older: responseData['old']['gray'],
    },
  ];

  React.useEffect(() => {}, []);

  return (
    // chart height이 100%이기 때문이 chart를 덮는 마크업 요소에 height 설정
    <div style={{ width: '80%', height: '20rem', margin: '0 auto' }}>
      <p
        className={classes.btn_12}
        onClick={() => {
          GroupModeHandelr();
        }}
      >
        <span>{isGroup ? 'Stack View' : 'Group View'}</span>
        <span>{isGroup ? 'Group View' : 'Stack View'}</span>
      </p>
      <ResponsiveBar
        data={data}
        keys={['0-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70-79', 'older']}
        indexBy="country"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        groupMode={isGroup ? 'grouped' : 'stacked'}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'yellow_orange_brown' }}
        defs={[
          {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: '#38bcb2',
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: '#eed312',
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        borderColor={{
          from: 'color',
          modifiers: [['darker', 1.6]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Color',
          legendPosition: 'middle',
          legendOffset: 32,
        }}
        enableLabel={!isGroup}
        labelSkipHeight={12}
        labelTextColor={{
          from: 'color',
          modifiers: [['darker', 1.6]],
        }}
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 10,
            effects: [
              {
                on: 'hover',
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={function (e) {
          return e.id + ': ' + e.formattedValue + ' in country: ' + e.indexValue;
        }}
      />
    </div>
  );
};

export default ColorAgeChart;
