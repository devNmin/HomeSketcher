import * as React from 'react';
import { ResponsiveBar } from '@nivo/bar';
// 사용 라이브러리 : https://nivo.rocks/
// 참고 블로그 : https://jforj.tistory.com/269

const DataChart = () => {
  // 3. 실시간 인기 스타일 차트 보여주기
  const data = [
    {
      country: 'AD',
      'hot dog': 199,
      'hot dogColor': 'hsl(19, 70%, 50%)',
      burger: 193,
      burgerColor: 'hsl(286, 70%, 50%)',
      sandwich: 139,
      sandwichColor: 'hsl(160, 70%, 50%)',
      kebab: 24,
      kebabColor: 'hsl(273, 70%, 50%)',
      fries: 45,
      friesColor: 'hsl(119, 70%, 50%)',
      donut: 86,
      donutColor: 'hsl(86, 70%, 50%)',
    },
    {
      country: 'AE',
      'hot dog': 141,
      'hot dogColor': 'hsl(72, 70%, 50%)',
      burger: 91,
      burgerColor: 'hsl(53, 70%, 50%)',
      sandwich: 196,
      sandwichColor: 'hsl(231, 70%, 50%)',
      kebab: 125,
      kebabColor: 'hsl(118, 70%, 50%)',
      fries: 117,
      friesColor: 'hsl(164, 70%, 50%)',
      donut: 68,
      donutColor: 'hsl(205, 70%, 50%)',
    },
    {
      country: 'AF',
      'hot dog': 75,
      'hot dogColor': 'hsl(101, 70%, 50%)',
      burger: 67,
      burgerColor: 'hsl(208, 70%, 50%)',
      sandwich: 180,
      sandwichColor: 'hsl(237, 70%, 50%)',
      kebab: 136,
      kebabColor: 'hsl(156, 70%, 50%)',
      fries: 57,
      friesColor: 'hsl(332, 70%, 50%)',
      donut: 84,
      donutColor: 'hsl(121, 70%, 50%)',
    },
    {
      country: 'AG',
      'hot dog': 26,
      'hot dogColor': 'hsl(340, 70%, 50%)',
      burger: 93,
      burgerColor: 'hsl(314, 70%, 50%)',
      sandwich: 137,
      sandwichColor: 'hsl(31, 70%, 50%)',
      kebab: 53,
      kebabColor: 'hsl(275, 70%, 50%)',
      fries: 80,
      friesColor: 'hsl(19, 70%, 50%)',
      donut: 156,
      donutColor: 'hsl(50, 70%, 50%)',
    },
    {
      country: 'AI',
      'hot dog': 129,
      'hot dogColor': 'hsl(56, 70%, 50%)',
      burger: 106,
      burgerColor: 'hsl(357, 70%, 50%)',
      sandwich: 113,
      sandwichColor: 'hsl(253, 70%, 50%)',
      kebab: 144,
      kebabColor: 'hsl(46, 70%, 50%)',
      fries: 165,
      friesColor: 'hsl(93, 70%, 50%)',
      donut: 102,
      donutColor: 'hsl(27, 70%, 50%)',
    },
    {
      country: 'AL',
      'hot dog': 83,
      'hot dogColor': 'hsl(265, 70%, 50%)',
      burger: 38,
      burgerColor: 'hsl(287, 70%, 50%)',
      sandwich: 159,
      sandwichColor: 'hsl(135, 70%, 50%)',
      kebab: 25,
      kebabColor: 'hsl(273, 70%, 50%)',
      fries: 42,
      friesColor: 'hsl(257, 70%, 50%)',
      donut: 70,
      donutColor: 'hsl(13, 70%, 50%)',
    },
    {
      country: 'AM',
      'hot dog': 156,
      'hot dogColor': 'hsl(205, 70%, 50%)',
      burger: 0,
      burgerColor: 'hsl(356, 70%, 50%)',
      sandwich: 6,
      sandwichColor: 'hsl(182, 70%, 50%)',
      kebab: 62,
      kebabColor: 'hsl(15, 70%, 50%)',
      fries: 68,
      friesColor: 'hsl(103, 70%, 50%)',
      donut: 75,
      donutColor: 'hsl(183, 70%, 50%)',
    },
  ];
  return (
    // chart height이 100%이기 때문이 chart를 덮는 마크업 요소에 height 설정
    <div style={{ width: '90%', height: '20rem', margin: '0 auto' }}>
      <ResponsiveBar
        data={data}
        keys={['hot dog', 'burger', 'sandwich', 'kebab', 'fries', 'donut']}
        indexBy="country"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
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
        fill={[
          {
            match: {
              id: 'fries',
            },
            id: 'dots',
          },
          {
            match: {
              id: 'sandwich',
            },
            id: 'lines',
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
          legend: 'country',
          legendPosition: 'middle',
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'food',
          legendPosition: 'middle',
          legendOffset: -40,
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
          return (
            e.id + ': ' + e.formattedValue + ' in country: ' + e.indexValue
          );
        }}
      />
    </div>
  );
};

export default DataChart;
