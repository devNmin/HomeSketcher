import * as React from 'react';
import { ResponsiveBar } from '@nivo/bar';
// 사용 라이브러리 : https://nivo.rocks/
// 참고 블로그 : https://jforj.tistory.com/269

const DataChart = () => {
  // 3. 실시간 인기 스타일 차트 보여주기
  return (
    // chart height이 100%이기 때문이 chart를 덮는 마크업 요소에 height 설정
    <div style={{ width: '90%', height: '20rem', margin: '0 auto' }}>
      <ResponsiveBar
        data={[
          {
            country: 'Modern',
            'hot dog': 90,
            'hot dogColor': 'hsl(130, 70%, 50%)',
          },
          {
            country: 'Natural',
            'hot dog': 34,
            'hot dogColor': 'hsl(334, 70%, 50%)',
          },
          {
            country: 'Minimal',
            'hot dog': 99,
            'hot dogColor': 'hsl(244, 70%, 50%)',
          },
          {
            country: 'North European',
            'hot dog': 150,
            'hot dogColor': 'hsl(313, 70%, 50%)',
          },
          {
            country: 'Vintage',
            'hot dog': 135,
            'hot dogColor': 'hsl(59, 70%, 50%)',
          },
          {
            country: 'Antique',
            'hot dog': 61,
            'hot dogColor': 'hsl(129, 70%, 50%)',
          },
          {
            country: 'Provence',
            'hot dog': 43,
            'hot dogColor': 'hsl(310, 70%, 50%)',
          },
          {
            country: 'Mediterranean',
            'hot dog': 43,
            'hot dogColor': 'hsl(310, 70%, 50%)',
          },
        ]}
        keys={['hot dog']}
        indexBy="country"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        groupMode="grouped"
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
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
          tickSize: 1,
          tickPadding: 5,
          tickRotation: 15,
          // legend: 'style',
          // legendPosition: 'middle',
          // legendOffset: 40,
        }}
        labelSkipWidth={12}
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
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
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

export default DataChart;
