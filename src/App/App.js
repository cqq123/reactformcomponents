import React from 'react';
import style from './App.scss';
/* eslint-disable */
import InputTest from 'demo/InputTest';
import CheckboxTest from 'demo/CheckboxTest';
import RadioTest from 'demo/RadioTest';
import SelectTest from 'demo/SelectTest';
import DrawImg from 'components/DrawImg';
import SelectTestContainer from 'containers/SelectContainer';
import Carousel from 'components/Carousel';
import BarChart from 'components/BarChart';
import Chart, { AxisBottom, AxisLeft, Bar, Label, BarGroup, ToolTips, Line, Area, Pie } from 'components/Chart';
/* eslint-enable */
const App = () => (
  <div className={style.main}>
    <InputTest />
    <CheckboxTest />
    <RadioTest />
    <Carousel
      items={[
        { content: require('../img/img1.jpg'), value: 'img1' },
        { content: require('../img/img2.jpg'), value: 'img2' },
        { content: require('../img/img3.jpg'), value: 'img3' },
        { content: require('../img/img4.jpg'), value: 'img4' },
        { content: require('../img/img5.jpg'), value: 'img5' },
      ]}
      width={500}
      height={200}
      duration={200}
      type="img"
      autoplay
    />
    <SelectTestContainer />
    <BarChart />
    <Chart
      data={[
        { label: '1', value: 10, value2: 90, value3: 30 },
        { label: '2', value: 20, value2: 30, value3: 50 },
        { label: '3', value: 60, value2: 120, value3: 60 },
        { label: '4', value: 30, value2: 70, value3: 20 },
        { label: '5', value: 40, value2: 100, value3: 70 },
      ]}
      margin={{
        top: 30,
        right: 30,
        bottom: 30,
        left: 30,
      }}
    >
      <Pie
        dataKey="value"
        label="outer"
        outerRadius={60}
        colors={['#a1219a', '#24b3cd', '#c1d3ea', '#ad9e0f', '#7e4faa']}
      />
    </Chart>
  </div>
);

export default App;
// <Label
//   dataKey="value2"
//   className={style.label}
//   position="top"
// />
// <Bar
//   dataKey="value"
//   className={style.bar}
//   label
//   labelPosition="bottom"
//   color="#00d2d9"
// />
// <AxisLeft
//   className={style.axisLeft}
// />
// <AxisBottom
//   className={style.axisBottom}
// />
// <BarGroup
//   dataKeys={['value', 'value2', 'value3']}
//   paddingInner={0.1}
//   colors={['red', 'blue', 'green']}
//   label
//   className={style.group}
// />
// <Bar
//   dataKey="value"
//   className={style.bar}
//   label
//   labelPosition="bottom"
//   color="#00d2d9"
// />
// <Line
//   dataKey="value3"
//   className={style.line}
//   curve
// />
// <Line
//   dataKey="value2"
//   className={style.line2}
// />
// <Area
//   className={style.area}
//   dataKey="value"
//   curve
// />
// <ToolTips
//   className={style.toolTips}
// />
// <AxisLeft
//   className={style.axisLeft}
//   // dataKey="value"
// />
// <AxisBottom
//   className={style.axisBottom}
// />
// <Bar
//   className={style.bar}
//   dataKey="value"
//   color="#12a2e0"
//   label
// />