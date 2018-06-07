import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import _ from 'lodash';
import style from './index.scss';

class Chart extends Component {
  get svgWidth() {
    const { width, margin } = this.props;
    return width - margin.left - margin.right;
  }
  get svgHeight() {
    const { height, margin } = this.props;
    return height - margin.top - margin.bottom;
  }
  get scaleX() {
    const { data, paddingInner, paddingOuter } = this.props;
    return d3.scaleBand()
      .domain(data.map(a => a.label))
      .rangeRound([0, this.svgWidth])
      .paddingInner(paddingInner)
      .paddingOuter(paddingOuter);
  }
  get max() {
    const { data } = this.props;
    return d3.max(data.map(a => d3.max(Object.values(_.omit(a, 'label')))));
  }
  get scaleY() {
    return d3.scaleLinear()
      .domain([0, this.max])
      .range([this.svgHeight, 0]);
  }
  // renderChildren() {
  //   const { children, data } = this.props;
  //   return React.Children.map(children, child => React.cloneElement(child, {
  //     svgHeight: this.svgHeight,
  //     x: this.scaleX,
  //     y: this.scaleY,
  //     data,
  //     max: this.max,
  //   }));
  // }
  renderChildren() {
    const { children, data } = this.props;
    return React.Children.map(children, (child) => {
      const name = child.type.displayName;
      // if (name === 'Bar') {
      //   return React.cloneElement(child, {
      //     svgHeight: this.svgHeight,
      //     x: this.scaleX,
      //     y: this.scaleY.domain([0, d3.max(data.map(a => a[child.props.dataKey]))]),
      //     data,
      //     max: this.max,
      //   });
      // }
      return React.cloneElement(child, {
        svgHeight: this.svgHeight,
        svgWidth: this.svgWidth,
        x: this.scaleX,
        y: this.scaleY,
        data,
        max: this.max,
      });
    });
  }
  render() {
    const { width, height, margin } = this.props;
    return (
      <svg
        width={width}
        height={height}
        ref={(svg) => { this.svg = svg; }}
        className={style.main}
      >
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {
            this.renderChildren()
          }
        </g>
      </svg>
    );
  }
}

Chart.defaultProps = {
  width: 500,
  height: 500,
  margin: {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10,
  },
  paddingInner: 0.2,
  paddingOuter: 0.1,
};
Chart.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  children: PropTypes.any.isRequired,
  data: PropTypes.array.isRequired,
  paddingInner: PropTypes.number,
  paddingOuter: PropTypes.number,
  margin: PropTypes.shape({
    top: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number,
  }),
};
export default Chart;

// 周二 Bar组件y函数有问题？ 跟 AxisLeft 组件不一致
// 周二下午 barGroup组件 text 有问题 和一个bar的text 行为不一致 修改……
// 周二下午tooltip 和 StackedBarChart , stackedBarChart都是用的库
// 周三 写 liner
// 周三 上午 liner Area 下午 update？ area chart 应该最好是 连续型x轴
// 周三下午 以上的组件 修改优化 + vehicle
// 周四 写 pie
// 周四上午 画pie图 写label 下午 封装成react组件 加入update 和hover
// 周五 写 radar

