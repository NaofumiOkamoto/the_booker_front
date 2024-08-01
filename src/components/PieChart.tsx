import React from 'react'
import { View } from 'react-native'
// import { PieChart } from 'react-native-svg-charts'
// import { G, Line, Text as SVGText } from 'react-native-svg'

interface ChartData {
  key: string
  amount: number
  svg: {
    fill: string
  }
}

interface Props {
  numberOfReservationsYahoo: number
  numberOfReservationsEbay: number
  numberOfRest: number
}

const PieChartWithLabels = (props: Props): JSX.Element => {
  const data: ChartData[] = [
    { key: 'ヤフオク', amount: props.numberOfReservationsYahoo, svg: { fill: '#600080' } },
    { key: 'eBay', amount: props.numberOfReservationsEbay, svg: { fill: '#600080' } },
    { key: '残り', amount: props.numberOfRest, svg: { fill: '#9900cc' } }
  ]

  const Labels: React.FC<{ slices: any }> = ({ slices }) => {
    return slices.map((slice: any, index: number) => {
      const { labelCentroid, pieCentroid, data } = slice
      return (
        // <G key={index}>
        //   <Line
        //     x1={labelCentroid[0]}
        //     y1={labelCentroid[1]}
        //     x2={pieCentroid[0]}
        //     y2={pieCentroid[1]}
        //     stroke={'black'}
        //   />
        //   <SVGText
        //     x={labelCentroid[0]}
        //     y={labelCentroid[1]}
        //     fill={'white'}
        //     stroke={'white'}
        //     textAnchor={'middle'}
        //     alignmentBaseline={'middle'}
        //     fontSize={10}
        //     strokeWidth={0.2}
        //   >
        //     {data.key}
        //   </SVGText>
        // </G>
        <></>
      )
    })
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* <PieChart
        style={{ height: 200, width: 200 }}
        valueAccessor={({ item }) => item.amount}
        data={data}
        outerRadius={'95%'}
      >
        <Labels slices={undefined} />
      </PieChart> */}
    </View>
  )
}

export default PieChartWithLabels
