import * as React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { useState } from 'react';
import classes from './ModeChange.module.css';
// 사용 라이브러리 : https://nivo.rocks/
// 참고 블로그 : https://jforj.tistory.com/269

const StyleBarChart = ({ responseData, isLight }) => {
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
      country: 'Modern',
      '0-19': responseData[0]['Modern'],
      '20-29': responseData[20]['Modern'],
      '30-39': responseData[30]['Modern'],
      '40-49': responseData[40]['Modern'],
      '50-59': responseData[50]['Modern'],
      '60-69': responseData[60]['Modern'],
      '70-79': responseData[70]['Modern'],
      older: responseData['old']['Modern'],
    },
    {
      country: 'Natural',
      '0-19': responseData[0]['Natural'],
      '20-29': responseData[20]['Natural'],
      '30-39': responseData[30]['Natural'],
      '40-49': responseData[40]['Natural'],
      '50-59': responseData[50]['Natural'],
      '60-69': responseData[60]['Natural'],
      older: responseData['old']['Natural'],
    },
    {
      country: 'Minimal',
      '0-19': responseData[0]['Minimal'],
      '20-29': responseData[20]['Minimal'],
      '30-39': responseData[30]['Minimal'],
      '40-49': responseData[40]['Minimal'],
      '50-59': responseData[50]['Minimal'],
      '60-69': responseData[60]['Minimal'],
      '70-79': responseData[70]['Minimal'],
      older: responseData['old']['Minimal'],
    },
    {
      country: 'North European',
      '0-19': responseData[0]['North European'],
      '20-29': responseData[20]['North European'],
      '30-39': responseData[30]['North European'],
      '40-49': responseData[40]['North European'],
      '50-59': responseData[50]['North European'],
      '60-69': responseData[60]['North European'],
      '70-79': responseData[70]['North European'],
      older: responseData['old']['North European'],
    },
    {
      country: 'Vintage',
      '0-19': responseData[0]['Vintage'],
      '20-29': responseData[20]['Vintage'],
      '30-39': responseData[30]['Vintage'],
      '40-49': responseData[40]['Vintage'],
      '50-59': responseData[50]['Vintage'],
      '60-69': responseData[60]['Vintage'],
      '70-79': responseData[70]['Vintage'],
      older: responseData['old']['Vintage'],
    },
    {
      country: 'Antique',
      '0-19': responseData[0]['Antique'],
      '20-29': responseData[20]['Antique'],
      '30-39': responseData[30]['Antique'],
      '40-49': responseData[40]['Antique'],
      '50-59': responseData[50]['Antique'],
      '60-69': responseData[60]['Antique'],
      '70-79': responseData[70]['Antique'],
      older: responseData['old']['Antique'],
    },
    {
      country: 'Provence',
      '0-19': responseData[0]['Provence'],
      '20-29': responseData[20]['Provence'],
      '30-39': responseData[30]['Provence'],
      '40-49': responseData[40]['Provence'],
      '50-59': responseData[50]['Provence'],
      '60-69': responseData[60]['Provence'],
      '70-79': responseData[70]['Provence'],
      older: responseData['old']['Provence'],
    },
    {
      country: 'Mediterranean',
      '0-19': responseData[0]['Mediterranean'],
      '20-29': responseData[20]['Mediterranean'],
      '30-39': responseData[30]['Mediterranean'],
      '40-49': responseData[40]['Mediterranean'],
      '50-59': responseData[50]['Mediterranean'],
      '60-69': responseData[60]['Mediterranean'],
      '70-79': responseData[70]['Mediterranean'],
      older: responseData['old']['Mediterranean'],
    },
  ];

  React.useEffect(() => {}, []);

  return (
    // chart height이 100%이기 때문이 chart를 덮는 마크업 요소에 height 설정
    <div style={{ width: '80%', height: '25rem', margin: '0 auto' }}>
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
        }}
        enableLabel={!isGroup}
        labelSkipHeight={12}
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
            symbolSize: 12,
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
            ticks: {
              line: {
                stroke: '#777777',
                strokeWidth: 1,
              },
              text: {
                fontSize: 17,
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
              fontSize: 15,
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

export default StyleBarChart;
